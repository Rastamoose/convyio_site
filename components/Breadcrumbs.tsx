import { SITE_URL } from '@/lib/posthog';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const baseUrl = (SITE_URL || 'https://convyio.com').replace(/\/$/, '');
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${baseUrl}${item.href === '/' ? '/' : `${item.href}/`}`,
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-xs text-gruv-fg-muted">
          {items.map((item, index) => {
            const current = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">/</span>}
                {current ? (
                  <span aria-current="page" className="font-medium text-gruv-fg-body">
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    className="underline decoration-transparent underline-offset-4 transition-colors hover:text-gruv-fg hover:decoration-gruv-border"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
      />
    </>
  );
}
