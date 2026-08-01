'use client';

import { useEffect } from 'react';
import { registerSuperProperties } from '@/lib/analytics';

export function VariantTag({ variant }: { variant: string }) {
  useEffect(() => {
    registerSuperProperties({ headline_variant: variant });
  }, [variant]);

  return null;
}
