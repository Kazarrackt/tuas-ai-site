import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? 'https://tuas.ai'),
  title: 'Tuas AI Model API | Launching soon',
  description:
    'Tuas AI Model API is launching soon. One OpenAI-compatible API for frontier-level AI models, hosted in Singapore, at the same price as the model vendor.',
  applicationName: 'Tuas AI Model API',
  icons: { icon: '/assets/favicon.svg', shortcut: '/assets/favicon.svg' },
  openGraph: {
    type: 'website',
    siteName: 'Tuas AI Model API',
    title: 'Tuas AI Model API | Launching soon',
    description:
      'Tuas AI Model API is launching soon. One OpenAI-compatible API for frontier-level AI models, hosted in Singapore.',
    url: '/',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#9200BA',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
