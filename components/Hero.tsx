'use client';

import { useState, useEffect } from 'react';
import { COPY } from '@/lib/copy';
import { EmailForm } from './EmailForm';
import { HeroVisual } from './HeroVisual';

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
    <section className="relative px-4 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <p className="mb-6 text-sm font-medium tracking-wide text-gruv-accent uppercase sm:text-base">
            {COPY.productName}
          </p>
          <h1 className="mb-6 text-5xl font-semibold leading-[1.1] tracking-tight text-gruv-fg sm:text-6xl lg:text-7xl">
            {h1}
          </h1>
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-gruv-fg-muted sm:text-xl">
            {COPY.hero.sub}
          </p>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="w-full max-w-sm">
              <EmailForm location="hero" />
            </div>
            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-lg border border-gruv-border px-5 py-3 text-sm font-medium text-gruv-fg transition-colors hover:bg-gruv-bg-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-gruv-accent"
            >
              See how it works
            </a>
          </div>
        </div>
        <div id="hero-visual" className="mt-16 lg:mt-24">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
