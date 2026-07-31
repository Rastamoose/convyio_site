import { COPY } from '@/lib/copy';
import { ProductBeat } from './ProductBeat';
import { VisualChat } from './VisualChat';
import { VisualTrace } from './VisualTrace';
import { VisualBoard } from './VisualBoard';

const visuals = [<VisualChat key="chat" />, <VisualTrace key="trace" />, <VisualBoard key="board" />];

export function BeatsSection() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-20 sm:space-y-28">
        {COPY.beats.map((beat, index) => (
          <ProductBeat
            key={beat.heading}
            heading={beat.heading}
            sentence={beat.sentence}
            visual={visuals[index]}
            reversed={index % 2 === 1}
          />
        ))}
        <p className="mx-auto max-w-2xl text-center text-sm text-gruv-fg-muted sm:text-base">
          {COPY.reassurance}
        </p>
      </div>
    </section>
  );
}
