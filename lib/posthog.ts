export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || '';
export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || '';

export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'pageview',
  SCROLL_TO_DEMO: 'scroll_to_demo',
  DEMO_PLAYED: 'demo_played',
  DEMO_COMPLETED: 'demo_completed',
  EMAIL_SUBMITTED: 'email_submitted',
  EMAIL_FORM_FOCUSED: 'email_form_focused',
  CTA_CLICKED: 'cta_clicked',
} as const;


export function getReferrer(): string {
  if (typeof window === 'undefined') return '';
  return document.referrer || '';
}
