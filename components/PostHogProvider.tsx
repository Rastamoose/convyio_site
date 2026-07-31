'use client';

import { ReactNode, useEffect } from 'react';
import { initPostHog, capturePageViewWithUtm } from '@/lib/analytics';

function PostHogPageView() {
  useEffect(() => {
    initPostHog().then(() => {
      capturePageViewWithUtm();
    });
  }, []);

  return null;
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const load = () => initPostHog();
    if (document.readyState === 'complete') {
      load();
    } else {
      window.addEventListener('load', load);
      return () => window.removeEventListener('load', load);
    }
  }, []);

  return (
    <>
      <PostHogPageView />
      {children}
    </>
  );
}
