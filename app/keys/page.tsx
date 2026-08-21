import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GuideDoc } from '@/components/GuideDoc';
import { KEYS } from '@/lib/guides';

export const metadata: Metadata = {
  title: KEYS.metaTitle,
  description: KEYS.metaDescription,
  alternates: { canonical: '/keys' },
  openGraph: {
    title: KEYS.metaTitle,
    description: KEYS.metaDescription,
    url: '/keys',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Convyio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: KEYS.metaTitle,
    description: KEYS.metaDescription,
    images: ['/opengraph-image'],
  },
};

export default function KeysPage() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      <Header />
      <GuideDoc guide={KEYS} />
      <Footer />
    </main>
  );
}
