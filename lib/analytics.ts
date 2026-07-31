import { ANALYTICS_EVENTS, POSTHOG_KEY, POSTHOG_HOST } from './posthog';

let posthogInstance: typeof import('posthog-js').default | null = null;
let queue: Array<{ event: string; props?: Record<string, unknown> }> = [];
let initPromise: Promise<void> | null = null;

export async function initPostHog(): Promise<void> {
  if (typeof window === 'undefined' || !POSTHOG_KEY) return;
  if (posthogInstance) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const posthog = (await import('posthog-js')).default;
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: false,
      loaded: (ph) => {
        if (process.env.NODE_ENV === 'development') ph.opt_out_capturing();
      },
    });
    posthogInstance = posthog;

    queue.forEach((item) => posthog.capture(item.event, item.props));
    queue = [];
  })();

  return initPromise;
}

export function capture(event: string, props?: Record<string, unknown>): void {
  if (posthogInstance) {
    posthogInstance.capture(event, props);
    return;
  }

  queue.push({ event, props });
  initPostHog().catch(() => {
    // Silently fail if PostHog cannot load
  });
}

export function capturePageView(): void {
  if (typeof window === 'undefined') return;
  capture(ANALYTICS_EVENTS.PAGE_VIEW, {
    $current_url: window.location.href,
    $pathname: window.location.pathname,
    referrer: document.referrer || '',
  });
}

export function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
    const value = params.get(key);
    if (value) utm[key] = value;
  });
  return utm;
}

export function capturePageViewWithUtm(): void {
  if (typeof window === 'undefined') return;
  capture(ANALYTICS_EVENTS.PAGE_VIEW, {
    $current_url: window.location.href,
    $pathname: window.location.pathname,
    referrer: document.referrer || '',
    ...getUtmParams(),
  });
}
