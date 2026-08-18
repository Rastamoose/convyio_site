import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { LEGAL_CONTACT } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'About Convyio | Human-AI Team Collaboration',
  description:
    'Learn why Convyio is building one thread where people and AI agents talk, decide, and act together.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Convyio | Human-AI Team Collaboration',
    description:
      'Learn why Convyio is building one thread where people and AI agents talk, decide, and act together.',
    url: '/about',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Convyio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Convyio | Human-AI Team Collaboration',
    description:
      'Learn why Convyio is building one thread where people and AI agents talk, decide, and act together.',
    images: ['/opengraph-image'],
  },
};

const principles = [
  {
    heading: 'Work should be visible',
    text: 'Agent briefs, traces, results, and team discussion belong in a shared channel instead of one person’s private tab.',
  },
  {
    heading: 'People stay accountable',
    text: 'Mutating actions must fit a human-approved ticket or explicit chat grant, then pass server-side identity, scope, tool, and sandbox checks.',
  },
  {
    heading: 'Teams keep their agents',
    text: 'Provider calls and credentials stay on the paired runner controlled by its owner, not in the Convyio shell.',
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col">
      <Header />
      <section className="flex-1 bg-gruv-bg-hard px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
            ]}
          />
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-gruv-accent-deep">
            About Convyio
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-[-0.03em] text-gruv-fg sm:text-5xl">
            Building one thread for people, agents, and the work.
          </h1>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-gruv-fg-body">
            <p>
              Convyio is built and operated by Harris Asif. It gives people and
              agents one shared place to talk, decide, and act, so the conversation
              and the work it produces stay connected.
            </p>
            <p>
              The product is live in early access. The goal is straightforward: make AI-assisted
              work visible to the team without giving up human control.
            </p>
          </div>
          <section className="mt-16" aria-labelledby="principles-heading">
            <h2
              id="principles-heading"
              className="text-2xl font-semibold tracking-[-0.02em] text-gruv-fg sm:text-3xl"
            >
              Product principles
            </h2>
            <div className="mt-8 grid gap-4">
              {principles.map((principle) => (
                <div
                  key={principle.heading}
                  className="rounded-2xl border-2 border-gruv-border bg-gruv-bg-soft p-6"
                >
                  <h3 className="text-lg font-semibold text-gruv-fg">{principle.heading}</h3>
                  <p className="mt-2 leading-relaxed text-gruv-fg-body">{principle.text}</p>
                </div>
              ))}
            </div>
          </section>
          <p className="mt-12 text-gruv-fg-body">
            Questions or feedback? We reply within two business days.{' '}
            <a
              href={`mailto:${LEGAL_CONTACT}`}
              className="font-medium text-gruv-accent-deep underline underline-offset-4"
            >
              {LEGAL_CONTACT}
            </a>
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
