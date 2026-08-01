import { COPY } from '@/lib/copy';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gruv-border/40 bg-gruv-bg-hard/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="/" className="text-lg font-semibold tracking-tight text-gruv-fg">
          {COPY.productName}
          <span className="text-gruv-accent">.</span>
        </a>
        <a href="#closing" className="btn-3d px-4 py-1.5 text-sm">
          Get early access
        </a>
      </div>
    </header>
  );
}
