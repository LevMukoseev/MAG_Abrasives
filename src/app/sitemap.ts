import { MetadataRoute } from 'next';
import { SITE_URL, NON_PRODUCTION } from '@/lib/siteMetadata';

export default function sitemap(): MetadataRoute.Sitemap {
  if (NON_PRODUCTION) return [];
  return [
    {
      url: SITE_URL,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/privacy`,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];
}
