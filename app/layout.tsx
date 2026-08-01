import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
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

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

const themeInitScript = `document.documentElement.classList.add('js');try{if(localStorage.theme==='dark'){document.documentElement.classList.add('dark')}}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-gruv-bg-hard font-sans text-gruv-fg antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <PostHogProvider>{children}</PostHogProvider>
        <ThemeToggle />
      </body>
    </html>
  );
}
