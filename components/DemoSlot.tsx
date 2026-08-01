'use client';

import { useState, useEffect, useRef } from 'react';
import { COPY } from '@/lib/copy';
import { ANALYTICS_EVENTS } from '@/lib/posthog';
import { capture } from '@/lib/analytics';
import { DemoChat } from './DemoChat';

export function DemoSlot() {
  const [open, setOpen] = useState(false);
  const [hasFiredScroll, setHasFiredScroll] = useState(false);
  const openTimeRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || hasFiredScroll) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            capture(ANALYTICS_EVENTS.SCROLL_TO_DEMO);
            setHasFiredScroll(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasFiredScroll]);

  useEffect(() => {
    if (!open) return;

    openTimeRef.current = Date.now();
    capture(ANALYTICS_EVENTS.DEMO_PLAYED);

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
    <section id="demo" ref={sectionRef} className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="dark relative overflow-hidden rounded-2xl border border-gruv-border/70 bg-gruv-bg shadow-frame">
          <DemoChat />

          {/* Play affordance */}
          <button
            onClick={() => setOpen(true)}
            className="group absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gruv-bg-hard/20 to-gruv-bg-hard/60 transition-colors hover:from-gruv-bg-hard/10 hover:to-gruv-bg-hard/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gruv-accent"
            aria-label={COPY.demo.playLabel}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gruv-accent text-gruv-bg-hard shadow-[0_3px_0_0_rgb(var(--gruv-accent-deep)),var(--shadow-glow)] transition-all group-hover:scale-105 group-active:translate-y-[3px] group-active:shadow-[0_0_0_0_rgb(var(--gruv-accent-deep)),var(--shadow-glow)]">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        </div>
        <p className="mt-4 text-center font-mono text-xs text-gruv-fg-muted">{COPY.demo.caption}</p>
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-gruv-scrim/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={COPY.demo.playLabel}
          onClick={handleClose}
        >
          <div
            ref={dialogRef}
            className="dark relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl border border-gruv-border/70 bg-gruv-bg p-4 shadow-frame"
            onClick={(e) => e.stopPropagation()}
          >
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
            <DemoChat animate />
          </div>
        </div>
      )}
    </section>
  );
}
