'use client';

import { useState, useRef, FormEvent } from 'react';
import { COPY } from '@/lib/copy';
import { ANALYTICS_EVENTS } from '@/lib/posthog';
import { cn } from '@/lib/utils';
import { capture } from '@/lib/analytics';

const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'https://formspree.io/f/meeywyjy';

interface EmailFormProps {
  location: 'hero' | 'closing';
  className?: string;
}

export function EmailForm({ location, className }: EmailFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const hasFiredFocus = useRef(false);

  function handleFocus() {
    if (hasFiredFocus.current) return;
    hasFiredFocus.current = true;
    capture(ANALYTICS_EVENTS.EMAIL_FORM_FOCUSED, { location });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || status === 'submitting') return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      const result = await response.json().catch(() => null);

      if (response.ok) {
        setStatus('success');
        setEmail('');
        capture(ANALYTICS_EVENTS.EMAIL_SUBMITTED, {
          location,
          success: true,
        });
      } else {
        setStatus('error');
        setErrorMessage(result?.error || COPY.form.error);
        capture(ANALYTICS_EVENTS.EMAIL_SUBMITTED, {
          location,
          success: false,
        });
      }
    } catch {
      setStatus('error');
      setErrorMessage(COPY.form.error);
      capture(ANALYTICS_EVENTS.EMAIL_SUBMITTED, {
        location,
        success: false,
      });
    }
  }

  if (status === 'success') {
    return (
      <div
        className={cn(
          'flex items-center justify-center gap-2 rounded-full border border-gruv-green/30 bg-gruv-green/10 px-4 py-3 text-sm text-gruv-green',
          className
        )}
        role="status"
        aria-live="polite"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
        {COPY.form.success}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)} noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`email-${location}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${location}`}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={COPY.form.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={handleFocus}
          className="input-inset w-full min-w-0 flex-1 px-5 py-2.5 text-sm text-gruv-fg placeholder:text-gruv-fg-muted sm:w-56"
          aria-invalid={status === 'error'}
          aria-describedby={status === 'error' ? `email-error-${location}` : undefined}
        />
        {/* Honeypot */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute h-0 w-0 opacity-0"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-3d whitespace-nowrap px-5 py-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gruv-accent/50"
        >
          {status === 'submitting' ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-gruv-bg-hard border-t-transparent" />
              Submitting…
            </span>
          ) : (
            COPY.form.button
          )}
        </button>
      </div>
      {status === 'error' && (
        <p
          id={`email-error-${location}`}
          className="mt-2 text-sm text-gruv-red"
          role="alert"
          aria-live="assertive"
        >
          {errorMessage}
        </p>
      )}
    </form>
  );
}
