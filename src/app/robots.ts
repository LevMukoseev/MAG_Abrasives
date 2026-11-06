import { MetadataRoute } from 'next';
import { SITE_URL, NON_PRODUCTION } from '@/lib/siteMetadata';

export default function robots(): MetadataRoute.Robots {
  return {
    // Keep crawling possible so search engines can read the noindex response header.
    rules: {
      userAgent: '*',
      allow: '/',
    },
    ...(NON_PRODUCTION ? {} : { sitemap: `${SITE_URL}/sitemap.xml` }),
  };
}
