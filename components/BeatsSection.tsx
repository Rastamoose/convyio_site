import { COPY } from '@/lib/copy';
import { ProductBeat } from './ProductBeat';
import { VisualChat } from './VisualChat';
import { VisualTrace } from './VisualTrace';
import { VisualBoard } from './VisualBoard';

const visuals = [<VisualChat key="chat" />, <VisualTrace key="trace" />, <VisualBoard key="board" />];

export function BeatsSection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-gruv-border px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 max-w-2xl sm:mb-24">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-gruv-accent-deep">
            How Convyio works
          </p>
          <h2
            id="how-it-works-heading"
            className="text-3xl font-semibold tracking-[-0.02em] text-gruv-fg sm:text-4xl"
          >
            From channel brief to human-approved work.
          </h2>
        </div>
        <div className="space-y-24 sm:space-y-32">
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
        </div>
      </div>
    </section>
  );
}
