import { COPY } from '@/lib/copy';
import { Reveal } from './Reveal';

const lineTones = ['text-gruv-fg-muted', 'text-gruv-fg-body', 'text-gruv-fg'];

export function ProblemLines() {
  return (
    <section className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-gruv-border/60 to-transparent"
      />
      <div className="mx-auto max-w-3xl">
        <div className="space-y-3 text-xl font-medium leading-relaxed tracking-[-0.01em] sm:text-2xl">
          {COPY.problem.map((line, index) => (
            <Reveal key={index} delay={index * 120}>
              <p className={lineTones[index] ?? 'text-gruv-fg'}>{line}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
