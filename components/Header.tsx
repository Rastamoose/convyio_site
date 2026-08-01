'use client';

import { useEffect, useState } from 'react';
import { COPY } from '@/lib/copy';
import { ANALYTICS_EVENTS } from '@/lib/posthog';
import { capture } from '@/lib/analytics';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleCtaClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    capture(ANALYTICS_EVENTS.CTA_CLICKED, { location: 'header' });
    // Target the hero form; if it's gone (already submitted), fall back to the closing form
    const input =
      document.getElementById('email-hero') ?? document.getElementById('email-closing');
    const target = input ?? document.getElementById('closing');
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => {
      input?.focus({ preventScroll: true });
    }, 400);
  }

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={`mx-auto flex items-center justify-between rounded-xl border-2 border-gruv-border bg-gruv-bg px-4 py-3 shadow-[0_4px_0_0_rgb(var(--gruv-border))] transition-[max-width] duration-700 ease-out sm:px-5 ${
          scrolled ? 'max-w-6xl' : 'max-w-7xl'
        }`}
      >
        <a
          href="/"
          className="font-mono text-base font-bold tracking-tight text-gruv-fg"
        >
          {COPY.productName}
          <span className="text-gruv-accent">.</span>
        </a>
        <a href="#email-hero" onClick={handleCtaClick} className="btn-3d px-5 py-2.5">
          Get early access
        </a>
      </div>
    </header>
  );
}
