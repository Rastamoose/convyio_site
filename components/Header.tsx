'use client';

import { useEffect, useRef, useState } from 'react';
import { COPY } from '@/lib/copy';
import { GUIDES } from '@/lib/guides';
import { SignInLink, StartUsingLink } from './AppLink';

const navLinkClass =
  'px-2 py-2 text-sm font-medium text-gruv-fg-body transition-colors hover:text-gruv-fg';

const menuGroupLabelClass =
  'px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-gruv-fg-muted';

function MenuLink({
  href,
  label,
  hint,
  onNavigate,
}: {
  href: string;
  label: string;
  hint?: string;
  onNavigate: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      className="group/item block rounded-lg px-3 py-2.5 transition-colors hover:bg-gruv-bg"
    >
      <span className="block text-sm font-semibold text-gruv-fg transition-colors group-hover/item:text-gruv-accent-deep">
        {label}
      </span>
      {hint && (
        <span className="mt-0.5 block text-xs leading-snug text-gruv-fg-muted">{hint}</span>
      )}
    </a>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const guidesRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mechanismGuides = GUIDES.filter((guide) => guide.slug !== 'changelog');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!guidesOpen && !menuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (guidesOpen && !guidesRef.current?.contains(event.target as Node)) setGuidesOpen(false);
      if (menuOpen && !menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setGuidesOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [guidesOpen, menuOpen]);

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        ref={menuRef}
        className={`mx-auto transition-[max-width] duration-700 ease-out ${
          scrolled ? 'max-w-6xl' : 'max-w-7xl'
        }`}
      >
        <div className="flex h-14 items-center justify-between rounded-xl border-2 border-gruv-border bg-gruv-bg px-4 shadow-[0_4px_0_0_rgb(var(--gruv-border))] sm:px-5">
          <a href="/" className="block shrink-0" onClick={() => setMenuOpen(false)}>
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
            <div ref={guidesRef} className="group relative hidden lg:block">
              <button
                type="button"
                aria-expanded={guidesOpen}
                aria-haspopup="true"
                onClick={() => setGuidesOpen((open) => !open)}
                className={`flex items-center gap-1.5 ${navLinkClass}`}
              >
                How it works
                <svg
                  aria-hidden="true"
                  viewBox="0 0 12 12"
                  className={`h-3 w-3 transition-transform duration-200 motion-reduce:transition-none ${
                    guidesOpen ? 'rotate-180' : ''
                  }`}
                >
                  <path
                    d="M2 4l4 4 4-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div
                className={`absolute left-0 top-full w-80 pt-2 group-hover:block group-focus-within:block ${
                  guidesOpen ? 'block' : 'hidden'
                }`}
              >
                <div className="rounded-xl bg-gruv-bg-soft p-2">
                  <p className={`${menuGroupLabelClass} pt-2`}>How it works</p>
                  <MenuLink
                    href="/#how-it-works"
                    label="Overview"
                    hint="The three beats, on the homepage"
                    onNavigate={() => setGuidesOpen(false)}
                  />
                  {mechanismGuides.map((guide) => (
                    <MenuLink
                      key={guide.slug}
                      href={`/${guide.slug}`}
                      label={guide.label}
                      hint={guide.navHint}
                      onNavigate={() => setGuidesOpen(false)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <a href="/changelog" className={`hidden lg:block ${navLinkClass}`}>
              Changelog
            </a>
            <a href="/#faq" className={`hidden lg:block ${navLinkClass}`}>
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
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border-2 border-gruv-border bg-gruv-bg-soft text-gruv-fg shadow-[0_2px_0_0_rgb(var(--gruv-border))] transition-colors hover:border-gruv-fg-dark lg:hidden"
            >
              <span
                aria-hidden="true"
                className={`absolute h-0.5 w-4 rounded bg-current transition-transform duration-200 motion-reduce:transition-none ${
                  menuOpen ? 'rotate-45' : '-translate-y-1.5'
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-0.5 w-4 rounded bg-current transition-opacity duration-200 motion-reduce:transition-none ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-0.5 w-4 rounded bg-current transition-transform duration-200 motion-reduce:transition-none ${
                  menuOpen ? '-rotate-45' : 'translate-y-1.5'
                }`}
              />
            </button>
          </nav>
        </div>
        {menuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="mt-2 animate-fade-in rounded-xl bg-gruv-bg-soft p-2 lg:hidden"
          >
            <p className={menuGroupLabelClass}>How it works</p>
            <MenuLink
              href="/#how-it-works"
              label="Overview"
              hint="The three beats, on the homepage"
              onNavigate={() => setMenuOpen(false)}
            />
            {mechanismGuides.map((guide) => (
              <MenuLink
                key={guide.slug}
                href={`/${guide.slug}`}
                label={guide.label}
                hint={guide.navHint}
                onNavigate={() => setMenuOpen(false)}
              />
            ))}
            <div className="mt-2">
              <p className={menuGroupLabelClass}>Site</p>
              <MenuLink href="/changelog" label="Changelog" onNavigate={() => setMenuOpen(false)} />
              <MenuLink href="/#faq" label="FAQ" onNavigate={() => setMenuOpen(false)} />
              <MenuLink href="/about" label="About" onNavigate={() => setMenuOpen(false)} />
              <SignInLink
                location="header-mobile"
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-gruv-fg transition-colors hover:bg-gruv-bg sm:hidden"
              >
                Sign in
              </SignInLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
