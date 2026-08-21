import type { Guide, GuideBlock } from '@/lib/guides';
import { GUIDES } from '@/lib/guides';
import { LEGAL_CONTACT } from '@/lib/legal';
import { Breadcrumbs } from './Breadcrumbs';
import { GuideNav } from './GuideNav';
import { StartUsingLink } from './AppLink';

const sectionAccents = ['text-gruv-accent-deep', 'text-gruv-aqua', 'text-gruv-purple'];

function renderH1(text: string, phrase: string) {
  const i = text.indexOf(phrase);
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className="relative inline-block">
        <span
          aria-hidden="true"
          className="absolute -inset-x-1 bottom-[0.04em] h-[0.38em] -rotate-1 rounded-sm bg-gruv-accent"
        />
        <span className="relative">{phrase}</span>
      </span>
      {text.slice(i + phrase.length)}
    </>
  );
}

function Notice({ tone, label, text }: { tone: 'warn' | 'note'; label: string; text: string }) {
  const dot = tone === 'warn' ? 'bg-gruv-red' : 'bg-gruv-blue';
  const labelColor = tone === 'warn' ? 'text-gruv-red' : 'text-gruv-blue';

  return (
    <aside className="my-6 rounded-xl bg-gruv-bg px-5 py-4">
      <p
        className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] ${labelColor}`}
      >
        <span aria-hidden="true" className={`h-2 w-2 rounded-sm ${dot}`} />
        {label}
      </p>
      <p className="mt-2 text-base leading-relaxed text-gruv-fg-body">{text}</p>
    </aside>
  );
}

function BlockView({ block }: { block: GuideBlock }) {
  switch (block.kind) {
    case 'text':
      return (
        <p className="my-5 text-base leading-[1.8] text-gruv-fg-body sm:text-lg">{block.text}</p>
      );
    case 'lead':
      return (
        <h3 className="mb-4 mt-10 text-lg font-semibold tracking-tight text-gruv-fg sm:text-xl">
          {block.text}
        </h3>
      );
    case 'list':
      return (
        <ul className="my-5 space-y-3">
          {block.items.map((item) => (
            <li
              key={item}
              className="relative pl-6 text-base leading-[1.75] text-gruv-fg-body before:absolute before:left-0 before:top-[0.6em] before:h-2 before:w-2 before:rounded-full before:bg-gruv-accent sm:text-lg"
            >
              {item}
            </li>
          ))}
        </ul>
      );
    case 'steps':
      return (
        <ol className="my-6 space-y-4">
          {block.items.map((item, index) => (
            <li key={item} className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gruv-accent text-sm font-bold tabular-nums text-gruv-bg-hard"
              >
                {index + 1}
              </span>
              <span className="text-base leading-[1.75] text-gruv-fg-body sm:text-lg">{item}</span>
            </li>
          ))}
        </ol>
      );
    case 'notice':
      return <Notice tone={block.tone} label={block.label} text={block.text} />;
  }
}

export function GuideDoc({ guide }: { guide: Guide }) {
  const others = GUIDES.filter((other) => other.slug !== guide.slug);

  return (
    <article className="px-4 pb-20 pt-10 sm:px-6 sm:pt-14 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: guide.label, href: `/${guide.slug}` },
          ]}
        />
        <header className="border-b border-gruv-border pb-10">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.14em] text-gruv-fg-muted">
            convyio · guides
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-gruv-fg sm:text-5xl lg:text-6xl">
            {renderH1(guide.title, guide.highlight)}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gruv-fg-body sm:text-xl">
            {guide.standfirst}
          </p>
          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.14em] text-gruv-fg-muted">
            Last revised {guide.revised}
          </p>
        </header>

        <div className="gap-12 pt-12 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
          <GuideNav sections={guide.sections} />

          <div className="min-w-0 max-w-2xl">
            {guide.sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-28 pb-14">
                <div className="mb-6 flex items-baseline gap-3">
                  <span
                    aria-hidden="true"
                    className={`text-sm font-semibold tabular-nums ${
                      sectionAccents[index % sectionAccents.length]
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-2xl font-semibold tracking-[-0.02em] text-gruv-fg sm:text-3xl">
                    {section.heading}
                  </h2>
                </div>
                {section.blocks.map((block, i) => (
                  <BlockView key={i} block={block} />
                ))}
              </section>
            ))}

            <section aria-labelledby="keep-reading-heading" className="mt-2 pt-12">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-gruv-fg-muted">
                Keep reading
              </p>
              <h2
                id="keep-reading-heading"
                className="text-2xl font-semibold tracking-[-0.02em] text-gruv-fg sm:text-3xl"
              >
                The rest of the mechanics
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {others.map((other, index) => (
                  <a
                    key={other.slug}
                    href={`/${other.slug}`}
                    className="group rounded-xl bg-gruv-bg p-5 transition-colors hover:bg-gruv-bg-soft"
                  >
                    <span
                      aria-hidden="true"
                      className={`text-sm font-semibold tabular-nums ${
                        sectionAccents[index % sectionAccents.length]
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-gruv-fg transition-colors group-hover:text-gruv-accent-deep">
                      {other.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gruv-fg-body">{other.teaser}</p>
                    <p className="mt-4 text-sm font-semibold text-gruv-accent-deep">
                      Read{' '}
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </p>
                  </a>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="guide-cta-heading"
              className="dark mt-12 rounded-2xl bg-gruv-bg-soft p-8 text-center sm:p-10"
            >
              <h2
                id="guide-cta-heading"
                className="text-2xl font-semibold leading-[1.15] tracking-[-0.02em] text-gruv-fg sm:text-3xl"
              >
                Try it with your team
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gruv-fg-body sm:text-lg">
                Convyio is live in early access. Start a workspace, pair a runner, and ask your
                agent where the team already talks.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <StartUsingLink location={`guide-${guide.slug}`} className="btn-3d px-6 py-3">
                  Start using Convyio
                </StartUsingLink>
                <a
                  href={`mailto:${LEGAL_CONTACT}`}
                  className="text-sm font-medium text-gruv-accent underline decoration-transparent underline-offset-4 transition-colors hover:decoration-gruv-accent"
                >
                  {LEGAL_CONTACT}
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}
