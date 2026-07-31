import { COPY } from '@/lib/copy';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gruv-border bg-gruv-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" className="text-lg font-semibold tracking-tight text-gruv-accent">
          {COPY.productName}
        </a>
        <a
          href="#closing"
          className="rounded-md px-3 py-2 text-sm font-medium text-gruv-fg transition-colors hover:bg-gruv-bg-soft"
        >
          Get early access
        </a>
      </div>
    </header>
  );
}
