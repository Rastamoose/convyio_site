import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

interface ProductBeatProps {
  index: number;
  heading: string;
  sentence: string;
  visual: ReactNode;
  reversed?: boolean;
}

export function ProductBeat({ index, heading, sentence, visual, reversed }: ProductBeatProps) {
  return (
    <Reveal>
      <div
        className={cn(
          'grid items-center gap-8 lg:grid-cols-2 lg:gap-16',
          reversed ? 'lg:grid-flow-col-dense' : ''
        )}
      >
        <div className={cn('space-y-4', reversed ? 'lg:col-start-2' : '')}>
          <span className="text-sm font-medium tabular-nums text-gruv-accent">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-gruv-fg sm:text-3xl">
            {heading}
          </h2>
          <p className="max-w-md text-base leading-relaxed text-gruv-fg-body sm:text-lg">
            {sentence}
          </p>
        </div>
        <div
          className={cn(
            'relative aspect-[16/10] overflow-hidden rounded-2xl border border-gruv-border/70 bg-gruv-bg shadow-frame transition-colors duration-300 hover:border-gruv-border',
            reversed ? 'lg:col-start-1' : ''
          )}
        >
          {visual}
        </div>
      </div>
    </Reveal>
  );
}
