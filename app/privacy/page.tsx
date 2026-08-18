import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LegalDoc } from '@/components/LegalDoc';
import { PRIVACY } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Privacy Policy — convyio',
  description:
    'What convyio collects, why, who else sees it — including the AI providers behind the agents in your channels — and what you can ask us to do about it.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy — convyio',
    description:
      'What convyio collects, why, who else sees it — including the AI providers behind the agents in your channels — and what you can ask us to do about it.',
    url: '/privacy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — convyio',
    description:
      'What convyio collects, why, who else sees it — including the AI providers behind the agents in your channels — and what you can ask us to do about it.',
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      <Header />
      <LegalDoc doc={PRIVACY} />
      <Footer />
    </main>
  );
}
