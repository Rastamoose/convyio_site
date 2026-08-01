import { COPY } from '@/lib/copy';

export function Footer() {
  return (
    <footer className="dark border-t border-gruv-border bg-gruv-bg-soft px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="text-[13px] font-medium tracking-tight text-gruv-fg">
          {COPY.productName}
          <span className="text-gruv-accent">.</span>
        </span>
        <p className="font-mono text-xs text-gruv-fg-muted">{COPY.footer}</p>
      </div>
    </footer>
  );
}
