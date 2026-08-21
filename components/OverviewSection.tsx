import { COPY } from '@/lib/copy';

export function OverviewSection() {
  return (
    <section
      className="border-y border-gruv-border bg-gruv-bg px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36"
      aria-labelledby="overview-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24">
          <div>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-gruv-fg-muted">
              Why Convyio
            </p>
            <h2
              id="overview-heading"
              className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-gruv-fg sm:text-5xl lg:text-6xl"
            >
              {COPY.overview.heading}
            </h2>
          </div>
          <div className="lg:pt-10">
            <p className="max-w-2xl text-xl leading-relaxed text-gruv-fg-body sm:text-2xl">
              {COPY.overview.description}
            </p>
            <div className="mt-12 border-t border-gruv-border">
              {COPY.overview.points.map((point, index) => (
                <div
                  key={point.heading}
                  className="grid gap-3 border-b border-gruv-border py-7 sm:grid-cols-[2.5rem_10rem_1fr] sm:gap-5"
                >
                  <span className="text-xs font-semibold tabular-nums text-gruv-fg-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-semibold text-gruv-fg">{point.heading}</h3>
                  <p className="leading-relaxed text-gruv-fg-body">{point.sentence}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
