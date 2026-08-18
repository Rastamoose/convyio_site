'use client';

import { useId, useState } from 'react';
import { COPY } from '@/lib/copy';
import { LEGAL_CONTACT } from '@/lib/legal';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const id = useId();
  const midpoint = Math.ceil(COPY.faq.length / 2);
  const columns = [COPY.faq.slice(0, midpoint), COPY.faq.slice(midpoint)];

  return (
    <section
      id="faq"
      className="scroll-mt-24 bg-gruv-bg-hover px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(14rem,0.55fr)_minmax(0,1.45fr)] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="mb-4 inline-flex -rotate-1 items-center gap-2 rounded-lg border-2 border-gruv-border bg-gruv-bg px-3 py-2 shadow-[0_3px_0_0_rgb(var(--gruv-border))]">
            <span
              aria-hidden="true"
              className="flex h-6 w-6 items-center justify-center rounded-md bg-gruv-accent font-mono text-sm font-bold text-gruv-bg-hard"
            >
              ?
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-gruv-fg-body">
              Questions, answered
            </span>
          </div>
          <h2
            id="faq-heading"
            className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-gruv-fg sm:text-6xl"
          >
            FAQ.
          </h2>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-gruv-fg-body">
            Still looking for something?{' '}
            <a
              href={`mailto:${LEGAL_CONTACT}`}
              className="font-semibold text-gruv-accent-deep underline decoration-gruv-accent-deep underline-offset-4"
            >
              Talk to us.
            </a>
          </p>
        </div>

        <div className="grid items-start gap-3 md:grid-cols-2 md:gap-4">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-3 md:space-y-4">
              {column.map((item, itemIndex) => {
                const index = columnIndex * midpoint + itemIndex;
                const open = openIndex === index;
                const buttonId = `${id}-button-${index}`;
                const panelId = `${id}-panel-${index}`;

                return (
                  <div
                    key={item.question}
                    className={`rounded-xl border-2 bg-gruv-bg shadow-[0_4px_0_0_rgb(var(--gruv-border))] transition-[transform,box-shadow,border-color] duration-200 ${
                      open
                        ? 'border-gruv-fg-dark shadow-[0_5px_0_0_rgb(var(--gruv-fg-dark))]'
                        : 'border-gruv-border hover:-translate-y-0.5 hover:border-gruv-fg-dark hover:shadow-[0_5px_0_0_rgb(var(--gruv-fg-dark))]'
                    }`}
                  >
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="group flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left focus:outline-none sm:py-4"
                    >
                      <span className="min-w-0 flex-1 text-sm font-semibold leading-snug tracking-[-0.01em] text-gruv-fg sm:text-base">
                        {item.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`relative h-8 w-8 shrink-0 rounded-lg border-2 shadow-[0_2px_0_0_rgb(var(--gruv-border))] transition-[transform,background-color,color,border-color] duration-200 ${
                          open
                            ? 'translate-y-0.5 border-gruv-accent-deep bg-gruv-accent text-gruv-bg-hard shadow-none'
                            : 'border-gruv-border bg-gruv-bg-soft text-gruv-fg group-hover:bg-gruv-accent group-hover:text-gruv-bg-hard'
                        }`}
                      >
                        <span className="absolute left-1/2 top-1/2 h-0.5 w-3 -translate-x-1/2 -translate-y-1/2 rounded bg-current" />
                        <span
                          className={`absolute left-1/2 top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded bg-current transition-transform duration-300 ease-out motion-reduce:transition-none ${
                            open ? 'rotate-90' : 'rotate-0'
                          }`}
                        />
                      </span>
                    </button>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      aria-hidden={!open}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="mx-4 border-t border-gruv-border">
                          <p className="pb-5 pt-4 text-sm leading-relaxed text-gruv-fg-body">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
