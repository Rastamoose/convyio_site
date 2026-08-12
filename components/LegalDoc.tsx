import type { Block, LegalDocument } from '@/lib/legal';

function Notice({ tone, label, text }: { tone: 'warn' | 'note'; label: string; text: string }) {
  const accent = tone === 'warn' ? 'border-l-gruv-red' : 'border-l-gruv-blue';
  const labelColor = tone === 'warn' ? 'text-gruv-red' : 'text-gruv-blue';

  return (
    <aside
      className={`my-6 border-2 border-l-8 border-gruv-border bg-gruv-bg px-5 py-4 ${accent}`}
    >
      <p
        className={`font-mono text-[11px] font-semibold uppercase tracking-[0.12em] ${labelColor}`}
      >
        {label}
      </p>
      <p className="mt-2 text-[15px] leading-relaxed text-gruv-fg-body">{text}</p>
    </aside>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border-2 border-gruv-border">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-gruv-bg-soft">
          <tr>
            {head.map((cell) => (
              <th
                key={cell}
                scope="col"
                className="whitespace-nowrap px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-gruv-fg"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-t border-gruv-border align-top">
              {row.map((cell, i) => (
                <td
                  key={i}
                  className={
                    i === 0
                      ? 'px-4 py-3 font-medium text-gruv-fg'
                      : 'px-4 py-3 text-gruv-fg-body'
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case 'text':
      return <p className="my-4 text-[15px] leading-[1.75] text-gruv-fg-body">{block.text}</p>;
    case 'lead':
      return (
        <h3 className="mb-3 mt-8 text-base font-semibold tracking-tight text-gruv-fg">
          {block.text}
        </h3>
      );
    case 'list':
      return (
        <ul className="my-4 space-y-2.5">
          {block.items.map((item) => (
            <li
              key={item}
              className="relative pl-5 text-[15px] leading-[1.7] text-gruv-fg-body before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-gruv-accent"
            >
              {item}
            </li>
          ))}
        </ul>
      );
    case 'terms':
      return (
        <dl className="my-5 divide-y divide-gruv-border border-y border-gruv-border">
          {block.items.map((item) => (
            <div key={item.term} className="grid gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
              <dt className="font-mono text-xs uppercase tracking-[0.08em] text-gruv-fg-muted">
                {item.term}
              </dt>
              <dd className="text-[15px] leading-relaxed text-gruv-fg-body">{item.text}</dd>
            </div>
          ))}
        </dl>
      );
    case 'notice':
      return <Notice tone={block.tone} label={block.label} text={block.text} />;
    case 'table':
      return <Table head={block.head} rows={block.rows} />;
  }
}

export function LegalDoc({ doc }: { doc: LegalDocument }) {
  return (
    <article className="px-4 pb-20 pt-10 sm:px-6 sm:pt-14 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="border-b-2 border-gruv-border pb-8">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-gruv-fg-muted">
            convyio · legal
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-gruv-fg sm:text-4xl">
            {doc.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gruv-fg-body">
            {doc.standfirst}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-gruv-fg-muted">
            <span>Last revised {doc.revised}</span>
            <a
              href={doc.counterpart.href}
              className="font-medium text-gruv-accent-deep underline decoration-gruv-border decoration-2 underline-offset-4 hover:decoration-gruv-accent"
            >
              {doc.counterpart.label} →
            </a>
          </div>
        </header>

        <div className="gap-12 pt-10 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
          <nav aria-label="On this page" className="mb-10 lg:mb-0">
            <div className="lg:sticky lg:top-28">
              <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-gruv-fg-muted">
                On this page
              </p>
              <ol className="space-y-1.5">
                {doc.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block text-[13px] leading-snug text-gruv-fg-body hover:text-gruv-accent-deep"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="min-w-0 max-w-2xl">
            {doc.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28 pb-10">
                <h2 className="mb-4 border-b border-gruv-border pb-2 text-xl font-semibold tracking-tight text-gruv-fg">
                  {section.heading}
                </h2>
                {section.blocks.map((block, i) => (
                  <BlockView key={i} block={block} />
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
