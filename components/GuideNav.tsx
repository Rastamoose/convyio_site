'use client';

import { useEffect, useState } from 'react';

const sectionAccents = ['text-gruv-accent-deep', 'text-gruv-aqua', 'text-gruv-purple'];

interface GuideNavProps {
  sections: { id: string; heading: string }[];
}

export function GuideNav({ sections }: GuideNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const first = sections.find((section) => visible.has(section.id));
        if (first) setActiveId(first.id);
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="On this page" className="mb-10 lg:mb-0">
      <div className="rounded-xl bg-gruv-bg p-3 lg:sticky lg:top-28">
        <p className="px-2 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-gruv-fg-muted">
          On this page
        </p>
        <ol className="space-y-0.5">
          {sections.map((section, index) => {
            const active = section.id === activeId;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={active ? 'location' : undefined}
                  className={`group flex items-baseline gap-2.5 rounded-lg px-2 py-2 transition-colors ${
                    active ? 'bg-gruv-bg-soft' : 'hover:bg-gruv-bg-soft'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`text-xs font-semibold tabular-nums ${
                      sectionAccents[index % sectionAccents.length]
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`text-sm leading-snug transition-colors ${
                      active
                        ? 'font-semibold text-gruv-fg'
                        : 'font-medium text-gruv-fg-body group-hover:text-gruv-fg'
                    }`}
                  >
                    {section.heading}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
