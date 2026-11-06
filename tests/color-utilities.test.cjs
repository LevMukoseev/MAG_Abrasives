const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const postcss = require('postcss');
const tailwind = require('tailwindcss');
const { loadTypeScript } = require('./load-typescript.cjs');

function readSources(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) return readSources(filename);
    return /\.(tsx?|css)$/.test(filename) ? [fs.readFileSync(filename, 'utf8')] : [];
  });
}

test('every referenced color-opacity utility produces CSS in the actual Tailwind configuration', async () => {
  const source = readSources(path.resolve(__dirname, '../src')).join('\n');
  const tokens = new Set(Array.from(source.matchAll(/\b(?:[\w-]+:)*(?:text|bg|border|from|via|to|ring|shadow|divide|fill|stroke)-[a-z][a-z\d-]*\/(?:\d{1,3}|\[(?:0?\.\d+|1)\])/g), (match) => match[0]));
  const { default: config } = loadTypeScript('tailwind.config.ts');
  const result = await postcss([tailwind({ ...config, content: [{ raw: source, extension: 'tsx' }] })])
    .process('@tailwind utilities;', { from: undefined });
  const selectors = [];
  result.root.walkRules((rule) => selectors.push(rule.selector));
  assert.ok(tokens.size > 0);
  for (const token of tokens) {
    const cssClass = '.' + token.replace(/[^a-zA-Z\d_-]/g, '\\$&');
    const escaped = cssClass.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(escaped + '(?![\\w-])');
    assert.ok(selectors.some((selector) => pattern.test(selector)), `Missing generated CSS: ${token}`);
  }
});
