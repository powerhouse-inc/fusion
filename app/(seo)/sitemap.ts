import { featureFlags } from 'feature-flags/feature-flags';
import { notFound } from 'next/navigation';
import { CURRENT_ENVIRONMENT } from '@/config/endpoints';
import SitemapBuilder from '@/core/utils/sitemap';
import type { MetadataRoute } from 'next';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const flags = featureFlags[CURRENT_ENVIRONMENT];
  if (!flags.FEATURE_SITEMAP) {
    return notFound();
  }

  const builder = new SitemapBuilder();
  return await builder.build();
};

export default sitemap;
