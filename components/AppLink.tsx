'use client';

import { APP_URL, SIGNUP_URL } from '@/lib/app';
import { ANALYTICS_EVENTS } from '@/lib/posthog';
import { capture } from '@/lib/analytics';

interface AppLinkProps {
  location: string;
  className?: string;
  children: React.ReactNode;
}

export function StartUsingLink({ location, className, children }: AppLinkProps) {
  return (
    <a
      href={SIGNUP_URL}
      onClick={() => capture(ANALYTICS_EVENTS.CTA_CLICKED, { location })}
      className={className}
    >
      {children}
    </a>
  );
}

export function SignInLink({ location, className, children }: AppLinkProps) {
  return (
    <a
      href={APP_URL}
      onClick={() => capture(ANALYTICS_EVENTS.CTA_CLICKED, { location: `${location}-signin` })}
      className={className}
    >
      {children}
    </a>
  );
}
