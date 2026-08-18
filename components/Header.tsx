'use client';

import { useEffect, useState } from 'react';
import { COPY } from '@/lib/copy';
import { SignInLink, StartUsingLink } from './AppLink';

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
            width={1635}
            height={588}
            className="h-12 w-auto dark:hidden sm:h-[60px]"
          />
          <img
            src="/logo-dark.png"
            alt=""
            aria-hidden="true"
            width={1635}
            height={588}
            className="hidden h-12 w-auto dark:block sm:h-[60px]"
          />
        </a>
        <nav className="flex items-center gap-1 sm:gap-4" aria-label="Product">
          <a
            href="/#how-it-works"
            className="hidden px-2 py-2 text-sm font-medium text-gruv-fg-body transition-colors hover:text-gruv-fg lg:block"
          >
            How it works
          </a>
          <a
            href="/#faq"
            className="hidden px-2 py-2 text-sm font-medium text-gruv-fg-body transition-colors hover:text-gruv-fg lg:block"
          >
            FAQ
          </a>
          <SignInLink
            location="header"
            className="hidden px-3 py-2 text-sm font-medium text-gruv-fg-body transition-colors hover:text-gruv-fg sm:block"
          >
            Sign in
          </SignInLink>
          <StartUsingLink location="header" className="btn-3d px-4 py-2.5 sm:px-5">
            {COPY.hero.cta}
          </StartUsingLink>
        </nav>
      </div>
    </header>
  );
}
