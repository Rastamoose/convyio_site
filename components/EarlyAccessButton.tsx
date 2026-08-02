'use client';

import { useState } from 'react';
import { ANALYTICS_EVENTS } from '@/lib/posthog';
import { capture } from '@/lib/analytics';
import { EmailFormModal } from './EmailFormModal';

interface EarlyAccessButtonProps {
  location: string;
  className?: string;
  children: React.ReactNode;
}

export function EarlyAccessButton({
  location,
  className,
  children,
}: EarlyAccessButtonProps) {
  const [open, setOpen] = useState(false);

  function handleClick() {
    capture(ANALYTICS_EVENTS.CTA_CLICKED, { location });
    setOpen(true);
  }

  return (
    <>
      <button type="button" onClick={handleClick} className={className}>
        {children}
      </button>
      <EmailFormModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
