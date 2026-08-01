'use client';

import { useState, useEffect } from 'react';
import { COPY } from '@/lib/copy';
import { EmailForm } from './EmailForm';
import { HeroVisual } from './HeroVisual';
import { Reveal } from './Reveal';

export function Hero() {
  const [h1, setH1] = useState<string>(COPY.hero.h1);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('v') === '2') {
      setH1(COPY.hero.h1Variant);
    }
  }, []);

  return (
    <section className="relative px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <Reveal>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gruv-border/60 bg-gruv-bg px-3 py-1 text-xs font-medium tracking-wide text-gruv-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-gruv-accent" aria-hidden="true" />
              {COPY.productName}
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mb-6 text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-gruv-fg sm:text-5xl lg:text-6xl">
              {h1}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-gruv-fg-body">
              {COPY.hero.sub}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <div className="w-full sm:max-w-md sm:flex-1">
                <EmailForm location="hero" />
              </div>
              <a
                href="#demo"
                className="btn-raised group gap-1.5 whitespace-nowrap px-5 py-2.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gruv-accent"
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
          </Reveal>
          <Reveal delay={320}>
            <p className="mt-6 text-[13px] text-gruv-fg-muted">
              Works with the agents you already run —{' '}
              <span className="text-gruv-fg-body">Claude Code</span> ·{' '}
              <span className="text-gruv-fg-body">Codex</span> ·{' '}
              <span className="text-gruv-fg-body">Kimi</span>
            </p>
          </Reveal>
        </div>
        <Reveal delay={400}>
          <div id="hero-visual" className="relative mt-12 lg:mt-14">
            <div
              aria-hidden="true"
              className="absolute -inset-x-8 -top-12 bottom-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(250,189,47,0.12),transparent_70%)] blur-2xl"
            />
            <HeroVisual />
            {/* Floating board card */}
            <div
              aria-hidden="true"
              className="absolute -right-3 -top-8 hidden w-52 rounded-xl border border-gruv-border/70 bg-gruv-bg-soft p-3 shadow-frame sm:block lg:-right-8"
            >
              <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-gruv-fg-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-gruv-green" />
                Approved
              </div>
              <p className="mt-1.5 text-[13px] text-gruv-fg">Q3 roadmap v1</p>
              <p className="mt-0.5 text-[11px] text-gruv-green">approved by james</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
