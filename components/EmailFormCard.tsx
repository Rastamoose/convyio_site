import { Ref } from 'react';
import { EmailForm } from './EmailForm';

interface EmailFormCardProps {
  location: 'hero' | 'closing' | 'modal';
  headingId?: string;
  onClose?: () => void;
  closeBtnRef?: Ref<HTMLButtonElement>;
  className?: string;
}

export function EmailFormCard({
  location,
  headingId,
  onClose,
  closeBtnRef,
  className,
}: EmailFormCardProps) {
  return (
    <div
      className={`w-full rounded-2xl border border-gruv-border bg-gruv-bg text-left text-gruv-fg ${className ?? ''}`}
    >
      <div className="flex items-start justify-between gap-4 border-b border-gruv-border px-5 py-4 sm:px-6">
        <div>
          <h2
            id={headingId}
            className="text-lg font-semibold tracking-[-0.01em] text-gruv-fg"
          >
            Get in touch
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-gruv-fg-body">
            Tell us a bit about your team and we&rsquo;ll get back to you.
          </p>
        </div>
        {onClose && (
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="-mr-1 -mt-1 rounded-full p-2 text-gruv-fg-muted transition-colors hover:bg-gruv-bg-hover hover:text-gruv-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-gruv-accent"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        )}
      </div>
      <EmailForm location={location} />
    </div>
  );
}
