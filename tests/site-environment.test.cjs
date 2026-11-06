const assert = require('node:assert/strict');
const test = require('node:test');
const { isNonProduction } = require('../site-environment.cjs');

test('preprod stays non-indexable even as a Vercel Production deployment', () => {
  assert.equal(isNonProduction({ VERCEL_ENV: 'production', VERCEL_GIT_COMMIT_REF: 'preprod' }), true);
  assert.equal(isNonProduction({ VERCEL_ENV: 'production', VERCEL_PROJECT_ID: 'prj_XqUhsMn8SbQN5aD91XyAxytKTFRY' }), true);
  assert.equal(isNonProduction({ VERCEL_PROJECT_PRODUCTION_URL: 'mag-abrasives-1.vercel.app' }), true);
  assert.equal(isNonProduction({ SITE_ENVIRONMENT: 'preprod' }), true);
});

test('production main stays indexable and previews stay out of search', () => {
  assert.equal(isNonProduction({ VERCEL_ENV: 'production', VERCEL_GIT_COMMIT_REF: 'main' }), false);
  assert.equal(isNonProduction({ VERCEL_ENV: 'preview', VERCEL_GIT_COMMIT_REF: 'feature' }), true);
  assert.equal(isNonProduction({}), false);
});
