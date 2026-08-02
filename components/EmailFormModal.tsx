'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { EmailFormCard } from './EmailFormCard';

interface EmailFormModalProps {
  open: boolean;
  onClose: () => void;
}

export function EmailFormModal({ open, onClose }: EmailFormModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    // Move focus into the dialog, lock background scroll
    triggerRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // Focus trap: cycle Tab within the dialog
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
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
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center overflow-y-auto bg-gruv-scrim/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-modal-heading"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="relative my-auto w-full max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <EmailFormCard
          location="modal"
          headingId="email-modal-heading"
          onClose={onClose}
          closeBtnRef={closeBtnRef}
        />
      </div>
    </div>,
    document.body
  );
}
