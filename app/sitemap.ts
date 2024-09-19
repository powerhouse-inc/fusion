import SitemapBuilder from '@/core/utils/sitemap';
import type { MetadataRoute } from 'next';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const builder = new SitemapBuilder();
  return await builder.build();
};

export default sitemap;
