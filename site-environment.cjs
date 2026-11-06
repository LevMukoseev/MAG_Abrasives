/** Shared by Next config and server metadata; staging is a Production target in Vercel. */
function isNonProduction(env = process.env) {
  return env.SITE_ENVIRONMENT === 'preprod'
    || env.VERCEL_GIT_COMMIT_REF === 'preprod'
    || env.VERCEL_ENV === 'preview'
    || env.VERCEL_PROJECT_ID === 'prj_XqUhsMn8SbQN5aD91XyAxytKTFRY'
    || env.VERCEL_PROJECT_PRODUCTION_URL === 'mag-abrasives-1.vercel.app';
}

module.exports = { isNonProduction };
