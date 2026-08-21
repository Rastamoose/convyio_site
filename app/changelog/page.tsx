import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GuideDoc } from '@/components/GuideDoc';
import { CHANGELOG } from '@/lib/guides';

export const metadata: Metadata = {
  title: CHANGELOG.metaTitle,
  description: CHANGELOG.metaDescription,
  alternates: { canonical: '/changelog' },
  openGraph: {
    title: CHANGELOG.metaTitle,
    description: CHANGELOG.metaDescription,
    url: '/changelog',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Convyio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: CHANGELOG.metaTitle,
    description: CHANGELOG.metaDescription,
    images: ['/opengraph-image'],
  },
};

export default function ChangelogPage() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      <Header />
      <GuideDoc guide={CHANGELOG} />
      <Footer />
    </main>
  );
}
