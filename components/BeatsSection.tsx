import { COPY } from '@/lib/copy';
import { ProductBeat } from './ProductBeat';
import { VisualChat } from './VisualChat';
import { VisualTrace } from './VisualTrace';
import { VisualBoard } from './VisualBoard';

const visuals = [<VisualChat key="chat" />, <VisualTrace key="trace" />, <VisualBoard key="board" />];

export function BeatsSection() {
  return (
    <section className="bg-gruv-border px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-24 sm:space-y-32">
        {COPY.beats.map((beat, index) => (
          <ProductBeat
            key={beat.heading}
            index={index}
            heading={beat.heading}
            sentence={beat.sentence}
            visual={visuals[index]}
            reversed={index % 2 === 1}
          />
        ))}
        <p className="mx-auto max-w-xl rounded-full border border-gruv-border/40 bg-gruv-bg/60 px-6 py-3 text-center text-sm leading-relaxed text-gruv-fg-muted">
          {COPY.reassurance}
        </p>
      </div>
    </section>
  );
}
