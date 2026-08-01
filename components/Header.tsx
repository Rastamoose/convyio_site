'use client';

import { COPY } from '@/lib/copy';
import { ANALYTICS_EVENTS } from '@/lib/posthog';
import { capture } from '@/lib/analytics';

export function Header() {
  function handleCtaClick() {
    capture(ANALYTICS_EVENTS.CTA_CLICKED, { location: 'header' });
    // Focus the hero form once the anchor scroll settles
    window.setTimeout(() => {
      document.getElementById('email-hero')?.focus({ preventScroll: true });
    }, 400);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gruv-border/40 bg-gruv-bg-hard/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="/" className="text-lg font-semibold tracking-tight text-gruv-fg">
          {COPY.productName}
          <span className="text-gruv-accent">.</span>
        </a>
        <a href="#email-hero" onClick={handleCtaClick} className="btn-3d px-4 py-2">
          Get early access
        </a>
      </div>
    </header>
  );
}
