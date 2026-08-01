import { COPY } from '@/lib/copy';

const lineTones = ['text-gruv-fg-muted', 'text-gruv-fg-body', 'text-gruv-fg'];

export function ProblemLines() {
  return (
    <section className="bg-gruv-bg-hover px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="space-y-5 text-2xl font-medium leading-snug tracking-[-0.01em] sm:text-3xl">
          {COPY.problem.map((line, index) => (
            <p key={index} className={lineTones[index] ?? 'text-gruv-fg'}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
