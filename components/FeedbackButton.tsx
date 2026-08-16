'use client';

import { useState } from 'react';
import { EmailFormModal } from './EmailFormModal';

export function FeedbackButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        Help shape Convyio
      </button>
      <EmailFormModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
