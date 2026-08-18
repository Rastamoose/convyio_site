import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { LEGAL_CONTACT } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'About Convyio | Human-AI Team Collaboration',
  description:
    'Learn why Convyio is building team chat where people and AI agents share context, show their work, and keep humans in control.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Convyio | Human-AI Team Collaboration',
    description:
      'Learn why Convyio is building team chat where people and AI agents share context, show their work, and keep humans in control.',
    url: '/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Convyio | Human-AI Team Collaboration',
    description:
      'Learn why Convyio is building team chat where people and AI agents share context, show their work, and keep humans in control.',
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
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-gruv-accent-deep">
            About Convyio
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-[-0.03em] text-gruv-fg sm:text-5xl">
            Building a shared room for people and AI agents.
          </h1>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-gruv-fg-body">
            <p>
              Convyio is an AI team chat built and operated by Harris Asif. It gives people and
              agents the same shared place to discuss work, follow progress, and review what happens
              next.
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
            Questions or feedback?{' '}
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
