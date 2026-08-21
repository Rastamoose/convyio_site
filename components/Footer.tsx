import { COPY } from '@/lib/copy';
import { GUIDES } from '@/lib/guides';
import { LEGAL_CONTACT } from '@/lib/legal';
import { APP_URL } from '@/lib/app';
import { FeedbackButton } from './FeedbackButton';

const GROUPS = [
  {
    label: 'Product',
    links: [
      ...GUIDES.map((guide) => ({ href: `/${guide.slug}`, label: guide.label })),
      { href: APP_URL, label: 'Sign in' },
    ],
  },
  {
    label: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: `mailto:${LEGAL_CONTACT}`, label: 'Contact' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
    ],
  },
];

const linkClass =
  'text-gruv-fg-muted underline decoration-transparent decoration-from-font underline-offset-4 transition-colors hover:text-gruv-fg hover:decoration-gruv-fg-dark';

export function Footer() {
  return (
    <footer className="dark border-t border-gruv-border bg-gruv-bg-soft px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <a href="/" className="text-[13px] font-medium tracking-tight text-gruv-fg">
            {COPY.productName}
            <span className="text-gruv-accent">.</span>
          </a>
          <p className="text-xs text-gruv-fg-muted">{COPY.footer}</p>
          <FeedbackButton className={`mt-2 ${linkClass} text-xs`} />
        </div>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-xs sm:justify-end">
          {GROUPS.map((group) => (
            <div key={group.label}>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gruv-fg-muted">
                {group.label}
              </p>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}
