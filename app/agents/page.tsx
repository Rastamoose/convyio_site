import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GuideDoc } from '@/components/GuideDoc';
import { AGENTS } from '@/lib/guides';

export const metadata: Metadata = {
  title: AGENTS.metaTitle,
  description: AGENTS.metaDescription,
  alternates: { canonical: '/agents' },
  openGraph: {
    title: AGENTS.metaTitle,
    description: AGENTS.metaDescription,
    url: '/agents',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Convyio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: AGENTS.metaTitle,
    description: AGENTS.metaDescription,
    images: ['/opengraph-image'],
  },
};

export default function AgentsPage() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      <Header />
      <GuideDoc guide={AGENTS} />
      <Footer />
    </main>
  );
}
