import { BASE_URL } from '@/config/routes';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: '/auth/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
