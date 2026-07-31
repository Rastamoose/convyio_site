import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ProductBeatProps {
  heading: string;
  sentence: string;
  visual: ReactNode;
  reversed?: boolean;
}

export function ProductBeat({ heading, sentence, visual, reversed }: ProductBeatProps) {
  return (
    <div
      className={cn(
        'grid items-center gap-8 lg:grid-cols-2 lg:gap-16',
        reversed ? 'lg:grid-flow-col-dense' : ''
      )}
    >
      <div className={cn('space-y-4', reversed ? 'lg:col-start-2' : '')}>
        <h2 className="text-2xl font-semibold tracking-tight text-gruv-fg sm:text-3xl">
          {heading}
        </h2>
        <p className="text-base leading-relaxed text-gruv-fg-muted sm:text-lg">
          {sentence}
        </p>
      </div>
      <div
        className={cn(
          'relative aspect-[16/10] overflow-hidden rounded-xl border border-gruv-border bg-gruv-bg-soft shadow-lg',
          reversed ? 'lg:col-start-1' : ''
        )}
      >
        {visual}
      </div>
    </div>
  );
}
