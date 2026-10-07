import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { company, siteUrl } from './company';
import './globals.css';

const title = 'Tuas AI Model API | Launching soon';
const description =
  'Tuas AI Model API is launching soon. One OpenAI-compatible API for frontier-level AI models, hosted in Singapore, at the same price as the model vendor.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: '%s | Tuas AI' },
  description,
  applicationName: 'Tuas AI Model API',
  keywords: [
    'Singapore AI API',
    'Singapore-hosted LLM',
    'sovereign AI Singapore',
    'OpenAI-compatible API',
    'DeepSeek API Singapore',
    'GLM-5.3 API',
    'onshore inference',
    'PDPA AI',
    'data residency AI',
    'LLM API no data retention',
  ],
  authors: [{ name: company.name, url: siteUrl }],
  creator: company.name,
  publisher: company.name,
  category: 'technology',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
  icons: { icon: '/assets/favicon.svg', shortcut: '/assets/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'en_SG',
    siteName: 'Tuas AI Model API',
    title,
    description,
    url: '/',
  },
  twitter: { card: 'summary_large_image', title, description },
  formatDetection: { telephone: false, address: false, email: false },
  other: { 'geo.region': 'SG', 'geo.placename': 'Singapore' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#9200BA',
};

// Structured data for search engines and answer engines. Every claim here is also stated on the visible pages.
const organizationId = `${siteUrl}/#organization`;
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: company.name,
      url: siteUrl,
      logo: `${siteUrl}/assets/tuas-ai-logo.svg`,
      email: company.privacyEmail,
      identifier: { '@type': 'PropertyValue', propertyID: 'UEN', value: company.uen },
      address: {
        '@type': 'PostalAddress',
        streetAddress: company.address.street,
        addressLocality: company.address.locality,
        postalCode: company.address.postalCode,
        addressCountry: company.address.country,
      },
      contactPoint: [
        { '@type': 'ContactPoint', contactType: 'privacy', email: company.privacyEmail },
        { '@type': 'ContactPoint', contactType: 'abuse reports', email: company.abuseEmail },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Tuas AI Model API',
      inLanguage: 'en-SG',
      publisher: { '@id': organizationId },
    },
    {
      '@type': 'Service',
      '@id': `${siteUrl}/#model-api`,
      name: 'Tuas AI Model API',
      serviceType: 'AI model inference API',
      description:
        'OpenAI-compatible API for frontier-level AI models, hosted in Singapore on GPUs owned and operated by Tuas AI. Prompts and outputs are not retained after the session and never used for training.',
      provider: { '@id': organizationId },
      areaServed: { '@type': 'Country', name: 'Singapore' },
      offers: [
        { name: 'DeepSeek V4.1 Flash', input: '0.30', output: '1.20' },
        { name: 'GLM-5.3', input: '1.40', output: '4.40' },
      ].map((model) => ({
        '@type': 'Offer',
        name: model.name,
        priceCurrency: 'USD',
        priceSpecification: [
          { '@type': 'UnitPriceSpecification', name: 'Input', price: model.input, priceCurrency: 'USD', referenceQuantity: { '@type': 'QuantitativeValue', value: 1000000, unitText: 'tokens' } },
          { '@type': 'UnitPriceSpecification', name: 'Output', price: model.output, priceCurrency: 'USD', referenceQuantity: { '@type': 'QuantitativeValue', value: 1000000, unitText: 'tokens' } },
        ],
      })),
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-SG">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
