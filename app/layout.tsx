import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? 'https://tuas.ai'),
  title: 'Tuas AI Model API | Frontier-level AI models hosted in Singapore',
  description:
    'One OpenAI-compatible API for frontier-level AI models, hosted in Singapore. Same price as the model vendor, with prompts, outputs and inference kept onshore.',
  applicationName: 'Tuas AI Model API',
  icons: { icon: '/assets/favicon.svg', shortcut: '/assets/favicon.svg' },
  openGraph: {
    type: 'website',
    siteName: 'Tuas AI Model API',
    title: 'Tuas AI Model API | Frontier-level AI models hosted in Singapore',
    description:
      'One OpenAI-compatible API for frontier-level AI models, hosted in Singapore.',
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
      <body>{children}</body>
    </html>
  );
}
