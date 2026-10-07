import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { company, companyAddress, legalEffectiveDate } from './company';
import { siteFooter, siteHeader } from './page-content';

export function LegalPage({ title, summary, children }: { title: string; summary: string; children: ReactNode }) {
  return (
    <>
      <div className="site-chrome" dangerouslySetInnerHTML={{ __html: siteHeader }} />
      <main id="top">
        <section>
          <article className="wrap legal">
            <span className="strip">Legal</span>
            <h1>{title}</h1>
            <p className="legal-lede">{summary}</p>
            <p className="legal-meta">Effective {legalEffectiveDate}</p>
            {children}
            <h2>Who we are</h2>
            <p>
              {company.name} (UEN {company.uen}) is a company registered in Singapore. Registered address: {companyAddress}.
              Email <a href={`mailto:${company.privacyEmail}`}>{company.privacyEmail}</a> for privacy and data protection
              matters, or <a href={`mailto:${company.abuseEmail}`}>{company.abuseEmail}</a> to report misuse. We do not offer
              support by phone.
            </p>
          </article>
        </section>
      </main>
      <div className="site-chrome" dangerouslySetInnerHTML={{ __html: siteFooter }} />
    </>
  );
}

// Setting openGraph here replaces the root one, so the share image from app/opengraph-image.tsx is restated.
const shareImage = { url: '/opengraph-image', width: 1200, height: 630, alt: 'Tuas AI Model API, hosted in Singapore' };

export function legalMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      locale: 'en_SG',
      siteName: 'Tuas AI Model API',
      title: `${title} | Tuas AI`,
      description,
      url: path,
      images: [shareImage],
    },
    twitter: { card: 'summary_large_image', title: `${title} | Tuas AI`, description, images: [shareImage] },
  };
}
