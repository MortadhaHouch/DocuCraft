import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const title = 'Google Docs Clone';
const description = 'A collaborative document editor built with Next.js';
const keywords = ['google docs', 'collaborative editor', 'next.js', 'real-time editing'];

export const defaultMetadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${title}`
  },
  description,
  keywords,
  metadataBase: new URL(baseUrl),
  openGraph: {
    title,
    description,
    url: baseUrl,
    siteName: title,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@yourtwitter',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export const getPageMetadata = (metadata: Metadata = {}): Metadata => {
  return {
    ...defaultMetadata,
    ...metadata,
  };
};
