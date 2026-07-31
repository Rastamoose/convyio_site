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

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
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
        <div className="relative overflow-hidden rounded-xl border border-gruv-border bg-gruv-bg-soft shadow-2xl">
          <DemoChat />

          {/* Play affordance */}
          <button
            onClick={() => setOpen(true)}
            className="absolute inset-0 flex items-center justify-center bg-gruv-bg/30 transition-colors hover:bg-gruv-bg/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gruv-accent"
            aria-label={COPY.demo.playLabel}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gruv-accent text-gruv-bg shadow-lg transition-transform hover:scale-105">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-gruv-fg-muted">{COPY.demo.caption}</p>
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gruv-bg/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={COPY.demo.playLabel}
          onClick={handleClose}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-xl border border-gruv-border bg-gruv-bg-soft p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute right-3 top-3 rounded p-2 text-gruv-fg-muted hover:bg-gruv-bg-hover hover:text-gruv-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-gruv-accent"
              aria-label="Close demo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
            <DemoChat />
          </div>
        </div>
      )}
    </section>
  );
}
