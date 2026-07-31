import { COPY } from '@/lib/copy';

export function Footer() {
  return (
    <footer className="border-t border-gruv-border px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="text-sm font-medium text-gruv-accent">{COPY.productName}</span>
        <p className="text-sm text-gruv-fg-muted">{COPY.footer}</p>
      </div>
    </footer>
  );
}
