import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'Page Not Found | Convyio',
  description: 'The requested Convyio page could not be found.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      <Header />
      <section className="flex flex-1 items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gruv-accent-deep">404</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] text-gruv-fg sm:text-5xl">
              This channel doesn’t exist.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-gruv-fg-body">
              The page may have moved, or the link may be wrong. Head back to the shared room and
              pick up from there.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/" className="btn-3d px-6 py-3">
                Back to Convyio
              </a>
              <a href="/#faq" className="btn-raised px-5 py-3">
                Read the FAQ
              </a>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="dark mx-auto flex aspect-square w-full max-w-sm rotate-2 items-center justify-center rounded-3xl border-2 border-gruv-border bg-gruv-bg shadow-[8px_8px_0_0_rgb(var(--gruv-border))]"
          >
            <div className="-rotate-2 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gruv-accent text-5xl font-semibold text-gruv-bg-hard">
                ?
              </div>
              <p className="mt-6 text-sm font-medium text-gruv-fg-muted">#unknown-channel</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
