const assert = require('node:assert/strict');
const test = require('node:test');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { loadTypeScript } = require('./load-typescript.cjs');
const { default: Reveal } = loadTypeScript('src/components/Reveal.tsx');
const { default: StatCounter } = loadTypeScript('src/components/StatCounter.tsx');
const { default: AbrasiveForm } = loadTypeScript('src/components/AbrasiveForm.tsx');
const { InquiryProvider } = loadTypeScript('src/components/InquiryContext.tsx');

test('essential content and final statistics are readable without JavaScript', () => {
  const html = renderToStaticMarkup(React.createElement(Reveal, null,
    React.createElement('p', null, 'Catalogue content'),
    React.createElement(StatCounter, { value: 2000, prefix: 'До ', suffix: ' мм' })));
  assert.ok(html.includes('Catalogue content'));
  assert.ok(html.includes('2000'));
  assert.ok(!/opacity-0|visibility:\s*hidden/.test(html));
});

test('a new inquiry does not silently request roll grinding', () => {
  const html = renderToStaticMarkup(React.createElement(InquiryProvider, null, React.createElement(AbrasiveForm)));
  const operation = html.match(/<select id="operation"[\s\S]*?<\/select>/)?.[0];
  assert.ok(operation);
  assert.match(operation, /<option value="" selected="">/);
  assert.ok(!/<option value="grinding_rolls" selected/.test(operation));
  assert.match(html, /name="consent"[^>]*required/);
});
