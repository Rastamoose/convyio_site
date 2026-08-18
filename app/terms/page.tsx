import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LegalDoc } from '@/components/LegalDoc';
import { TERMS } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Terms of Service — convyio',
  description:
    'The agreement between you and convyio, including what AI agents in your channels can do and where our approval model does not hold.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service — convyio',
    description:
      'The agreement between you and convyio, including what AI agents in your channels can do and where our approval model does not hold.',
    url: '/terms',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service — convyio',
    description:
      'The agreement between you and convyio, including what AI agents in your channels can do and where our approval model does not hold.',
  },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      <Header />
      <LegalDoc doc={TERMS} />
      <Footer />
    </main>
  );
}
