import { CURRENT_ENVIRONMENT } from '@/config/endpoints';
import { BASE_URL } from '@/config/routes';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  if (CURRENT_ENVIRONMENT !== 'production') {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '*',
        },
      ],
    };
  }

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
