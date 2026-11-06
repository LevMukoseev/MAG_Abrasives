const { isNonProduction } = require('./site-environment.cjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return isNonProduction()
      ? [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }]
      : [];
  },
  images: {
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;
