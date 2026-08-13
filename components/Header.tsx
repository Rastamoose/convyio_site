'use client';

import { useEffect, useState } from 'react';
import { COPY } from '@/lib/copy';
import { EarlyAccessButton } from './EarlyAccessButton';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={`mx-auto flex h-14 items-center justify-between rounded-xl border-2 border-gruv-border bg-gruv-bg px-4 shadow-[0_4px_0_0_rgb(var(--gruv-border))] transition-[max-width] duration-700 ease-out sm:px-5 ${
          scrolled ? 'max-w-6xl' : 'max-w-7xl'
        }`}
      >
        <a href="/" className="block shrink-0">
          <img
            src="/logo-light.png"
            alt={COPY.productName}
            className="h-12 w-auto dark:hidden sm:h-[60px]"
          />
          <img
            src="/logo-dark.png"
            alt={COPY.productName}
            className="hidden h-12 w-auto dark:block sm:h-[60px]"
          />
        </a>
        <EarlyAccessButton location="header" className="btn-3d px-5 py-2.5">
          {COPY.hero.cta}
        </EarlyAccessButton>
      </div>
    </header>
  );
}
