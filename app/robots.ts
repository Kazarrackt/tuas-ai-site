import type { MetadataRoute } from 'next';
import { siteUrl } from './company';

export default function robots(): MetadataRoute.Robots {
  // Search and AI answer-engine crawlers are all welcome; the site holds only public marketing and policy pages.
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/healthz'] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
