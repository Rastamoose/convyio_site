'use client';

import { useState, useEffect, useRef } from 'react';
import { COPY } from '@/lib/copy';
import { ANALYTICS_EVENTS } from '@/lib/posthog';
import { capture } from '@/lib/analytics';
import { DemoChat, useDemoPlayback } from './DemoChat';

export function DemoSlot() {
  const [open, setOpen] = useState(false);
  const [hasFiredScroll, setHasFiredScroll] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const { visibleCount, playing, done, restart } = useDemoPlayback(autoPlay);
  const openTimeRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || (hasFiredScroll && autoPlay)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.intersectionRatio >= 0.2 && !autoPlay) {
            setAutoPlay(true);
            capture(ANALYTICS_EVENTS.DEMO_PLAYED, { source: 'inline' });
          }
          if (entry.intersectionRatio >= 0.5 && !hasFiredScroll) {
            capture(ANALYTICS_EVENTS.SCROLL_TO_DEMO);
            setHasFiredScroll(true);
          }
        });
      },
      { threshold: [0.2, 0.5] }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasFiredScroll, autoPlay]);

  useEffect(() => {
    if (!open) return;

    openTimeRef.current = Date.now();
    capture(ANALYTICS_EVENTS.DEMO_PLAYED, { source: 'expand' });

    // Move focus into the dialog, lock background scroll
    triggerRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      // Focus trap: cycle Tab within the dialog
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [open]);

  function handleClose() {
    const duration = openTimeRef.current ? Date.now() - openTimeRef.current : 0;
    if (duration >= 5000) {
      capture(ANALYTICS_EVENTS.DEMO_COMPLETED, { duration_ms: duration });
    }
    setOpen(false);
    openTimeRef.current = null;
  }

  return (
    <section
      id="demo"
      ref={sectionRef}
      className="bg-gruv-bg-soft px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="dark group relative block h-[480px] w-full overflow-hidden rounded-2xl border border-gruv-border bg-gruv-bg text-left shadow-frame focus:outline-none focus-visible:ring-2 focus-visible:ring-gruv-accent sm:h-[560px]"
          aria-label={COPY.demo.playLabel}
        >
          <DemoChat visibleCount={visibleCount} playing={playing} />

          {/* Expand affordance: invisible until the frame is hovered/focused */}
          <span
            aria-hidden="true"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center text-gruv-fg opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
            </svg>
          </span>
        </button>
        <p className="mt-4 text-center text-xs text-gruv-fg-muted">{COPY.demo.caption}</p>
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-gruv-scrim/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Demo conversation"
          onClick={handleClose}
        >
          <div
            ref={dialogRef}
            className="dark relative h-[70vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-gruv-border bg-gruv-bg shadow-frame"
            onClick={(e) => e.stopPropagation()}
          >
            {done && (
              <button
                onClick={restart}
                className="absolute right-12 top-3 rounded-full p-2 text-gruv-fg-muted transition-colors hover:bg-gruv-bg-hover hover:text-gruv-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-gruv-accent"
                aria-label="Replay demo"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8S7.58 20 12 20c3.73 0 6.84-2.55 7.73-6h-2.08a5.99 5.99 0 0 1-5.65 4c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                </svg>
              </button>
            )}
            <button
              ref={closeBtnRef}
              onClick={handleClose}
              className="absolute right-3 top-3 rounded-full p-2 text-gruv-fg-muted transition-colors hover:bg-gruv-bg-hover hover:text-gruv-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-gruv-accent"
              aria-label="Close demo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
            <DemoChat visibleCount={visibleCount} playing={playing} />
          </div>
        </div>
      )}
    </section>
  );
}
