import { COPY } from '@/lib/copy';
import { EmailForm } from './EmailForm';
import { Reveal } from './Reveal';

export function ClosingBlock() {
  return (
    <section id="closing" className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-gruv-border/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-64 bg-[radial-gradient(ellipse_50%_100%_at_50%_100%,rgba(250,189,47,0.07),transparent_70%)]"
      />
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="mb-4 text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-gruv-fg sm:text-4xl lg:text-5xl">
            {COPY.closing.lead}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mb-10 text-lg leading-relaxed text-gruv-fg-body sm:text-xl">
            {COPY.closing.support}
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mx-auto max-w-md">
            <EmailForm location="closing" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
