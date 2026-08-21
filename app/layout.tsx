import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';
import { COPY } from '@/lib/copy';
import { PostHogProvider } from '@/components/PostHogProvider';
import { SITE_URL } from '@/lib/posthog';
import { ThemeToggle } from '@/components/ThemeToggle';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL || 'https://convyio.com'),
  title: COPY.meta.title,
  description: COPY.meta.description,
  applicationName: 'Convyio',
  alternates: { canonical: '/' },
  category: 'technology',
  openGraph: {
    title: COPY.meta.title,
    description: COPY.meta.description,
    url: '/',
    siteName: 'Convyio',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: COPY.meta.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: COPY.meta.title,
    description: COPY.meta.description,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicon-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9f5d7' },
    { media: '(prefers-color-scheme: dark)', color: '#1d2021' },
  ],
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const themeInitScript = `document.documentElement.classList.add('js');try{if(localStorage.theme==='dark'){document.documentElement.classList.add('dark')}}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-gruv-bg-hard font-sans text-gruv-fg antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-gruv-accent focus:px-4 focus:py-2 focus:font-medium focus:text-gruv-bg-hard"
        >
          Skip to main content
        </a>
        <PostHogProvider>{children}</PostHogProvider>
        <ThemeToggle />
      </body>
    </html>
  );
}
