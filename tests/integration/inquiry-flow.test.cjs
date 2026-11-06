const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const net = require('node:net');
const { spawn } = require('node:child_process');
const { once } = require('node:events');
const { test, before, after } = require('node:test');
const { loadTypeScript } = require('../load-typescript.cjs');
const { catalogCategories } = loadTypeScript('src/lib/catalogCategories.ts');

// This SMTP sink binds exclusively to loopback. It cannot deliver external mail.
const messages = [];
let rejectDelivery = false;
const sockets = new Set();
const smtp = net.createServer((socket) => {
  sockets.add(socket);
  socket.on('close', () => sockets.delete(socket));
  socket.on('error', () => {});
  socket.setEncoding('utf8');
  socket.write('220 localhost test SMTP\r\n');
  let buffer = '';
  let receiving = false;
  let data = '';
  let authStep = 0;
  socket.on('data', (chunk) => {
    buffer += chunk;
    let end;
    while ((end = buffer.indexOf('\r\n')) !== -1) {
      const line = buffer.slice(0, end);
      buffer = buffer.slice(end + 2);
      if (receiving) {
        if (line === '.') {
          receiving = false;
          if (rejectDelivery) socket.write('550 Test rejection\r\n');
          else { messages.push(data); socket.write('250 Message accepted\r\n'); }
          data = '';
        } else data += line + '\r\n';
      } else if (authStep) {
        if (authStep === 1) { authStep = 2; socket.write('334 UGFzc3dvcmQ6\r\n'); }
        else { authStep = 0; socket.write('235 Authenticated\r\n'); }
      } else if (/^EHLO|^HELO/i.test(line)) socket.write('250-localhost\r\n250 AUTH PLAIN LOGIN\r\n');
      else if (/^AUTH LOGIN/i.test(line)) { authStep = 1; socket.write('334 VXNlcm5hbWU6\r\n'); }
      else if (/^AUTH PLAIN/i.test(line)) socket.write('235 Authenticated\r\n');
      else if (/^DATA/i.test(line)) { receiving = true; socket.write('354 End with dot\r\n'); }
      else if (/^QUIT/i.test(line)) socket.end('221 Bye\r\n');
      else socket.write('250 OK\r\n');
    }
  });
});

let server;
let base;
let ipCounter = 1;
let startupLog = '';
const payload = { name: 'Test client', email: 'client@example.test', phone: '+79122855111', consent: true, comments: 'Local test only' };

async function submit(body, { ip = `198.51.100.${ipCounter++}`, type = 'application/json', raw = false } = {}) {
  return fetch(`${base}/api/submit-form`, {
    method: 'POST', headers: { 'Content-Type': type, 'X-Forwarded-For': ip },
    body: raw ? body : JSON.stringify(body), signal: AbortSignal.timeout(15000),
  });
}

function decodeMail(raw) {
  const [headers, ...parts] = raw.split('\r\n\r\n');
  const content = parts.join('\r\n\r\n');
  if (/Content-Transfer-Encoding: base64/i.test(headers)) return Buffer.from(content.replace(/\s/g, ''), 'base64').toString('utf8');
  if (/Content-Transfer-Encoding: quoted-printable/i.test(headers)) {
    return Buffer.from(content.replace(/=\r\n/g, '').replace(/=([\dA-F]{2})/gi, (_, value) => String.fromCharCode(parseInt(value, 16))), 'binary').toString('utf8');
  }
  return content;
}

before(async () => {
  assert.ok(fs.existsSync(path.resolve('.next/BUILD_ID')), 'Run a preprod npm run build before integration tests');
  smtp.listen(0, '127.0.0.1');
  await once(smtp, 'listening');
  const probe = net.createServer();
  probe.listen(0, '127.0.0.1');
  await once(probe, 'listening');
  const port = probe.address().port;
  await new Promise((resolve) => probe.close(resolve));
  base = `http://127.0.0.1:${port}`;
  server = spawn(process.execPath, ['--no-experimental-webstorage', 'node_modules/next/dist/bin/next', 'start', '-H', '127.0.0.1', '-p', String(port)], {
    cwd: path.resolve('.'),
    env: { ...process.env, SITE_ENVIRONMENT: 'preprod', SMTP_HOST: '127.0.0.1', SMTP_PORT: String(smtp.address().port), SMTP_USER: 'sender@example.test', SMTP_PASS: 'local-test-only', MAIL_TO: 'sink@example.test' },
    stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
  });
  server.stdout.on('data', (chunk) => { startupLog += chunk; });
  server.stderr.on('data', (chunk) => { startupLog += chunk; });
  for (let attempt = 0; attempt < 150; attempt++) {
    if (server.exitCode !== null) throw new Error(`Next exited: ${startupLog}`);
    try { if ((await fetch(base)).ok) return; } catch { /* Wait for the local server. */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Next failed to start: ${startupLog}`);
});

after(async () => {
  if (server && server.exitCode === null) { server.kill(); await once(server, 'exit'); }
  sockets.forEach((socket) => socket.destroy());
  await new Promise((resolve) => smtp.close(resolve));
});

test('HTTP inquiry preserves category and product and sets Reply-To', async () => {
  const category = catalogCategories.find((entry) => entry.gallery.length);
  const product = category.gallery[0];
  const count = messages.length;
  const response = await submit({ ...payload, category: category.slug, product: product.src, source: 'catalog' });
  assert.equal(response.status, 201);
  assert.equal(messages.length, count + 1);
  assert.match(messages.at(-1), /Reply-To: client@example.test/);
  const body = decodeMail(messages.at(-1));
  assert.ok(body.includes(category.title));
  assert.ok(body.includes(product.caption));
  assert.ok(body.includes(product.src));
});

test('legacy payload is accepted without category and invalid requests never send mail', async () => {
  assert.equal((await submit({ ...payload, operation: 'grinding_rolls' })).status, 201);
  const count = messages.length;
  for (const body of [[], null, {}, { ...payload, consent: false }, { ...payload, phone: 'bad' }, { ...payload, name: 'x'.repeat(101) }, { ...payload, category: 'forged' }]) {
    assert.equal((await submit(body)).status, 400);
  }
  assert.equal((await submit('{broken', { raw: true })).status, 400);
  assert.equal((await submit(payload, { type: 'text/plain' })).status, 415);
  assert.equal((await submit(' '.repeat(17000), { raw: true })).status, 413);
  assert.equal((await submit({ website: 'bot.example' })).status, 201);
  assert.equal(messages.length, count);
});

test('fixed-window limiter returns Retry-After without forwarding excess mail', async () => {
  const count = messages.length;
  for (let index = 0; index < 3; index++) assert.equal((await submit(payload, { ip: '203.0.113.10' })).status, 201);
  const limited = await submit(payload, { ip: '203.0.113.10' });
  assert.equal(limited.status, 429);
  assert.ok(Number(limited.headers.get('retry-after')) > 0);
  assert.equal(messages.length, count + 3);
});

test('SMTP rejection cannot become a success response', async () => {
  const count = messages.length;
  rejectDelivery = true;
  try { assert.equal((await submit(payload)).status, 500); }
  finally { rejectDelivery = false; }
  assert.equal(messages.length, count);
});

test('staging is noindex on main, privacy, robots, and PDF responses', async () => {
  for (const route of ['/', '/privacy', '/robots.txt', '/sitemap.xml', '/Лифлет по кругам GD-Abrasives 2026.pdf']) {
    const response = await fetch(base + encodeURI(route));
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get('x-robots-tag') || '', /noindex/, route);
    if (route === '/' || route === '/privacy') {
      const html = await response.text();
      assert.match(html, /name="robots" content="noindex, nofollow"/);
      if (route === '/privacy') {
        assert.match(html, /rel="canonical" href="https:\/\/gd-abrasives.ru\/privacy"/);
        assert.ok(html.includes('href="/#catalog"'));
      }
    }
    if (route === '/robots.txt') assert.ok(!(await response.text()).includes('Sitemap:'));
    if (route === '/sitemap.xml') assert.ok(!(await response.text()).includes('<loc>'));
  }
});

test('SSR has visible catalogue content and all local image/PDF references exist', async () => {
  const html = await (await fetch(base)).text();
  assert.ok(!html.includes('opacity-0 translate-y-6'));
  for (const category of catalogCategories) {
    assert.ok(html.includes(category.title), category.slug);
    for (const image of [...category.gallery, ...(category.cover ? [{ src: category.cover }] : [])]) {
      assert.ok(fs.existsSync(path.join('public', image.src)), image.src);
    }
  }
  const ids = new Set(Array.from(html.matchAll(/\bid="([^"]+)"/g), (match) => match[1]));
  const anchors = Array.from(html.matchAll(/href="(?:\/)?#([^"]+)"/g), (match) => match[1]);
  for (const anchor of anchors) assert.ok(ids.has(anchor), `Missing anchor #${anchor}`);
});
