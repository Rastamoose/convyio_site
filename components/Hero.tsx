'use client';

import { useState, useEffect } from 'react';
import { COPY } from '@/lib/copy';
import { EmailForm } from './EmailForm';
import { HeroVisual } from './HeroVisual';
import { registerSuperProperties } from '@/lib/analytics';

export function Hero() {
  const [h1, setH1] = useState<string>(COPY.hero.h1);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const variant = params.get('v') === '2' ? 'solution-aware' : 'problem-aware';
    if (variant === 'solution-aware') {
      setH1(COPY.hero.h1Variant);
    }
    registerSuperProperties({ headline_variant: variant });
  }, []);

  return (
    <section className="relative px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full border border-gruv-border/60 bg-gruv-bg px-3 py-1 font-mono text-xs font-medium uppercase tracking-wider text-gruv-accent-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-gruv-accent" aria-hidden="true" />
            {COPY.productName}
          </span>
          <h1 className="mb-6 text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-gruv-fg sm:text-5xl lg:text-6xl">
            {h1}
          </h1>
          <p className="mb-8 max-w-xl animate-fade-up text-lg leading-relaxed text-gruv-fg-body [animation-delay:80ms]">
            {COPY.hero.sub}
          </p>
          <div className="w-full animate-fade-up [animation-delay:120ms]">
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <div className="w-full max-w-sm sm:w-auto sm:max-w-none">
                <EmailForm location="hero" />
              </div>
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
        <div className="animate-fade-up [animation-delay:200ms]">
          <div id="hero-visual" className="relative mt-12 lg:mt-14">
            <div
              aria-hidden="true"
              className="absolute -inset-x-8 -top-12 bottom-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgb(var(--gruv-accent)/0.14),transparent_70%)] blur-2xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-8 -left-16 -z-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgb(var(--gruv-aqua)/0.12),transparent_70%)] blur-2xl"
            />
            <div
              aria-hidden="true"
              className="absolute -right-16 top-1/3 -z-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgb(var(--gruv-purple)/0.1),transparent_70%)] blur-2xl"
            />
            <HeroVisual />
            {/* Floating board card */}
            <div
              aria-hidden="true"
              className="dark absolute -right-3 -top-8 hidden w-52 rounded-xl border border-gruv-border/70 bg-gruv-bg-soft p-3 shadow-frame sm:block lg:-right-8"
            >
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-gruv-fg-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-gruv-green" />
                Approved
              </div>
              <p className="mt-1.5 text-[13px] text-gruv-fg">Q3 roadmap v1</p>
              <p className="mt-0.5 text-[11px] text-gruv-green">approved by james</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
