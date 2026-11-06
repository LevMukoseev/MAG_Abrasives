const assert = require('node:assert/strict');
const test = require('node:test');
const { loadTypeScript } = require('./load-typescript.cjs');
const { getSmtpConfig } = loadTypeScript('src/lib/smtpConfig.ts');
const credentials = { SMTP_HOST: 'localhost', SMTP_USER: 'sender@example.test', SMTP_PASS: 'local-test-only', MAIL_TO: 'sink@example.test' };

test('missing, empty and whitespace SMTP_PORT retain the legacy default 465', () => {
  for (const value of [undefined, '', '  ', '465']) assert.equal(getSmtpConfig({ ...credentials, SMTP_PORT: value }).port, 465);
  assert.equal(getSmtpConfig({ ...credentials, SMTP_PORT: ' 587 ' }).port, 587);
});

test('invalid SMTP configuration is rejected before contacting any server', () => {
  assert.equal(getSmtpConfig({}), null);
  for (const port of ['0', '-1', '65536', 'abc', '4.65']) assert.equal(getSmtpConfig({ ...credentials, SMTP_PORT: port }), null);
  assert.equal(getSmtpConfig({ ...credentials, SMTP_HOST: 'host\r\ninvalid' }), null);
});
