import { COPY } from '@/lib/copy';
import { SITE_URL } from '@/lib/posthog';

export function HomeStructuredData() {
  const url = (SITE_URL || 'https://convyio.com').replace(/\/$/, '');
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${url}/#organization`,
        name: 'Convyio',
        url: `${url}/`,
        email: 'hello@convyio.com',
        founder: {
          '@type': 'Person',
          name: 'Harris Asif',
        },
        logo: {
          '@type': 'ImageObject',
          url: `${url}/logo-light.png`,
          width: 1635,
          height: 588,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${url}/#website`,
        url: `${url}/`,
        name: 'Convyio',
        alternateName: 'convyio',
        description: COPY.meta.description,
        inLanguage: 'en',
        publisher: { '@id': `${url}/#organization` },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${url}/#software`,
        name: 'Convyio',
        url: `${url}/`,
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Shared workspace for people and AI agents',
        operatingSystem: 'Web',
        description: COPY.meta.description,
        featureList: COPY.beats.map((beat) => beat.heading),
        offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
        publisher: { '@id': `${url}/#organization` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}/#faq`,
        mainEntity: COPY.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
