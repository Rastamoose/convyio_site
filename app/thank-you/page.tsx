import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { StartUsingLink } from '@/components/AppLink';

export const metadata: Metadata = {
  title: 'Thank You | Convyio',
  description: 'Thanks for sharing feedback with Convyio. We will reply within two business days.',
  alternates: { canonical: '/thank-you' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Thank You | Convyio',
    description: 'Thanks for sharing feedback with Convyio.',
    url: '/thank-you',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Convyio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thank You | Convyio',
    description: 'Thanks for sharing feedback with Convyio.',
    images: ['/opengraph-image'],
  },
};

export default function ThankYouPage() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      <Header />
      <section className="flex-1 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Thank you', href: '/thank-you' },
            ]}
          />
          <div className="rounded-3xl border-2 border-gruv-border bg-gruv-bg p-8 text-center shadow-[0_6px_0_0_rgb(var(--gruv-border))] sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gruv-green text-2xl font-semibold text-gruv-bg-hard">
              ✓
            </div>
            <h1 className="mt-6 text-3xl font-semibold tracking-[-0.03em] text-gruv-fg sm:text-4xl">
              Thanks for helping shape Convyio.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-gruv-fg-body">
              Your message is in. We’ll read it and reply within two business days.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <StartUsingLink location="thank-you" className="btn-3d px-6 py-3">
                Start using Convyio
              </StartUsingLink>
              <a href="/" className="btn-raised px-5 py-3">
                Back to the homepage
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
