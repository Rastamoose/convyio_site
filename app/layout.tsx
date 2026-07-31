import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import { COPY } from '@/lib/copy';
import { PostHogProvider } from '@/components/PostHogProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://plurall.example.com'),
  title: COPY.meta.title,
  description: COPY.meta.description,
  openGraph: {
    title: COPY.meta.title,
    description: COPY.meta.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: COPY.meta.title,
    description: COPY.meta.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: '/icon',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gruv-bg text-gruv-fg antialiased">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
