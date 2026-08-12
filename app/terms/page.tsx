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
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <LegalDoc doc={TERMS} />
      <Footer />
    </main>
  );
}
