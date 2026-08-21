import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GuideDoc } from '@/components/GuideDoc';
import { APPROVALS } from '@/lib/guides';

export const metadata: Metadata = {
  title: APPROVALS.metaTitle,
  description: APPROVALS.metaDescription,
  alternates: { canonical: '/approvals' },
  openGraph: {
    title: APPROVALS.metaTitle,
    description: APPROVALS.metaDescription,
    url: '/approvals',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Convyio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: APPROVALS.metaTitle,
    description: APPROVALS.metaDescription,
    images: ['/opengraph-image'],
  },
};

export default function ApprovalsPage() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      <Header />
      <GuideDoc guide={APPROVALS} />
      <Footer />
    </main>
  );
}
