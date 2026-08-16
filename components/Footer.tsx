import { COPY } from '@/lib/copy';
import { LEGAL_CONTACT } from '@/lib/legal';

const LINKS = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: `mailto:${LEGAL_CONTACT}`, label: 'Contact' },
];

export function Footer() {
  return (
    <footer className="dark border-t border-gruv-border bg-gruv-bg-soft px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <a href="/" className="text-[13px] font-medium tracking-tight text-gruv-fg">
            {COPY.productName}
            <span className="text-gruv-accent">.</span>
          </a>
          <p className="text-xs text-gruv-fg-muted">{COPY.footer}</p>
        </div>
        <nav aria-label="Legal" className="flex items-center gap-3 text-xs">
          {LINKS.map((link, i) => (
            <span key={link.href} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden="true" className="text-gruv-fg-dark">
                  ·
                </span>
              )}
              <a
                href={link.href}
                className="text-gruv-fg-muted underline decoration-transparent decoration-from-font underline-offset-4 transition-colors hover:text-gruv-fg hover:decoration-gruv-fg-dark"
              >
                {link.label}
              </a>
            </span>
          ))}
        </nav>
      </div>
    </footer>
  );
}
