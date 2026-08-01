import { COPY } from '@/lib/copy';
import { VariantTag } from './VariantTag';

interface HeroProps {
  variant?: 'problem-aware' | 'solution-aware';
}

function renderH1(text: string, phrase: string) {
  const i = text.indexOf(phrase);
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className="relative inline-block">
        <span
          aria-hidden="true"
          className="absolute -inset-x-1 bottom-[0.04em] h-[0.38em] -rotate-1 rounded-sm bg-gruv-accent/40"
        />
        <span className="relative">{phrase}</span>
      </span>
      {text.slice(i + phrase.length)}
    </>
  );
}

export function Hero({ variant = 'problem-aware' }: HeroProps) {
  const solutionAware = variant === 'solution-aware';
  const h1 = solutionAware ? COPY.hero.h1Variant : COPY.hero.h1;
  const highlight = solutionAware ? COPY.hero.h1VariantHighlight : COPY.hero.h1Highlight;

  return (
    <section className="relative px-4 pb-10 pt-12 sm:px-6 sm:pb-12 sm:pt-16 lg:px-8 lg:pt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-16 right-0 h-[24rem] w-[28rem] opacity-90 [mask-image:radial-gradient(120%_120%_at_100%_0%,black,transparent_70%)] sm:h-[30rem] sm:w-[44rem]"
          style={{
            backgroundImage: 'radial-gradient(rgb(var(--gruv-fg-dark)) 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>
      <VariantTag variant={variant} />
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full border border-gruv-border/60 bg-gruv-bg px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-gruv-accent-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-gruv-accent" aria-hidden="true" />
            {COPY.productName}
          </span>
          <h1 className="mb-6 text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-gruv-fg sm:text-5xl lg:text-6xl">
            {renderH1(h1, highlight)}
          </h1>
          <p className="mb-8 max-w-xl animate-fade-up text-lg leading-relaxed text-gruv-fg-body [animation-delay:80ms]">
            {COPY.hero.sub}
          </p>
          <div className="w-full animate-fade-up [animation-delay:120ms]">
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-start">
              <a href="#closing" className="btn-3d whitespace-nowrap px-6 py-2.5">
                {COPY.hero.cta}
              </a>
              <a
                href="#demo"
                className="btn-raised group gap-1.5 whitespace-nowrap px-5 py-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gruv-accent"
              >
                See how it works
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            </div>
          </div>
          <p className="mt-6 animate-fade-up font-mono text-sm tracking-wide text-gruv-fg-body [animation-delay:160ms]">
            works with the agents you already run —{' '}
            <span className="font-medium text-gruv-accent-deep">Claude Code</span> ·{' '}
            <span className="font-medium text-gruv-green">Codex</span> ·{' '}
            <span className="font-medium text-gruv-blue">Kimi</span>
          </p>
        </div>
      </div>
    </section>
  );
}
