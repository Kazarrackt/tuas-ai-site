import type { MetadataRoute } from 'next';
import { legalPages, siteUrl } from './company';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: 'weekly', priority: 1 },
    ...legalPages.map((page) => ({ url: `${siteUrl}${page.path}`, changeFrequency: 'yearly' as const, priority: 0.3 })),
  ];
}
