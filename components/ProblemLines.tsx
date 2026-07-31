import { COPY } from '@/lib/copy';

export function ProblemLines() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="space-y-2 text-xl leading-relaxed text-gruv-fg sm:text-2xl">
          {COPY.problem.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
