import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');
const getMeta = (html, name) =>
  html.match(new RegExp(`<meta name="${name}" content="([^"]+)"`))?.[1];
const getCanonical = (html) => html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
const getTitle = (html) => html.match(/<title>(.*?)<\/title>/)?.[1];

const [home, v2, about, privacy, terms, thankYou, notFound, robots, sitemap, ...guidePages] =
  await Promise.all([
    read('./dist/index.html'),
    read('./dist/v2/index.html'),
    read('./dist/about/index.html'),
    read('./dist/privacy/index.html'),
    read('./dist/terms/index.html'),
    read('./dist/thank-you/index.html'),
    read('./dist/404.html'),
    read('./dist/robots.txt'),
    read('./dist/sitemap.xml'),
    read('./dist/agents/index.html'),
    read('./dist/keys/index.html'),
    read('./dist/approvals/index.html'),
    read('./dist/changelog/index.html'),
  ]);

assert.match(home, /<link rel="icon" href="\/favicon\.ico" sizes="any"/);
assert.match(home, /<link rel="icon" href="\/favicon-48x48\.png" type="image\/png" sizes="48x48"/);
assert.match(
  home,
  /<title>Convyio — One Conversation for Your Team, Its Agents, and the Work<\/title>/
);
assert.match(home, /<meta name="description" content="Convyio puts your team/);
assert.equal(getCanonical(home), 'https://convyio.com/');
assert.equal(getMeta(home, 'robots'), 'index, follow');
assert.equal((home.match(/<h1(?:\s|>)/g) || []).length, 1);
const h1 = home.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1].replace(/<[^>]+>/g, '');
assert.equal(h1, 'Your agent only works with you. Why isn’t it on the team too?');
assert.match(home, /<header class="sticky/);
assert.match(home, /href="https:\/\/app\.convyio\.com\/\?signup" class="btn-3d/);
assert.match(home, /href="\/#how-it-works"/);
assert.match(home, /href="\/#faq"/);
assert.match(home, /href="\/about"/);
assert.match(home, /id="how-it-works"/);
assert.match(home, /id="faq"/);

const imageTags = home.match(/<img\b[^>]*>/g) || [];
assert.ok(imageTags.length > 0, 'Homepage should contain at least one image');
for (const tag of imageTags) assert.match(tag, /\balt="[^"]*"/);

const jsonLdMatch = home.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
assert.ok(jsonLdMatch, 'Homepage JSON-LD is missing');
const jsonLd = JSON.parse(jsonLdMatch[1]);
const schemaTypes = jsonLd['@graph'].map((item) => item['@type']);
assert.deepEqual(schemaTypes, ['Organization', 'WebSite', 'SoftwareApplication', 'FAQPage']);
assert.equal(jsonLd['@graph'][3].mainEntity.length, 6);
assert.ok(!schemaTypes.includes('LocalBusiness'), 'Online-only businesses must not claim local schema');

assert.equal(getCanonical(v2), 'https://convyio.com/');
assert.equal(getMeta(v2, 'robots'), 'noindex, follow');
assert.equal(getCanonical(about), 'https://convyio.com/about/');
assert.equal(getCanonical(privacy), 'https://convyio.com/privacy/');
assert.equal(getCanonical(terms), 'https://convyio.com/terms/');
assert.equal(new Set([home, about, privacy, terms].map(getTitle)).size, 4);
for (const page of [home, about, privacy, terms]) {
  assert.ok(getMeta(page, 'description'), 'Every indexable page needs a meta description');
  assert.match(page, /<meta property="og:image"/);
  assert.match(page, /<meta name="twitter:image"/);
}
for (const page of [about, privacy, terms]) assert.match(page, /"@type":"BreadcrumbList"/);
assert.match(about, /reply within two business days/);

const guides = [
  { slug: 'agents', title: 'Agents as team members | Convyio', h1: 'An agent on the team, not in a tab.' },
  { slug: 'keys', title: 'Your agents, your keys | Convyio', h1: 'Provider keys never leave your runner.' },
  {
    slug: 'approvals',
    title: 'Human approval for agent actions | Convyio',
    h1: 'Nothing mutates until a human says so.',
  },
  {
    slug: 'changelog',
    title: 'Changelog | Convyio',
    h1: 'What’s live, what’s rough, who it’s for.',
  },
];

guidePages.forEach((page, i) => {
  const { slug, title, h1: guideH1 } = guides[i];
  assert.equal(getTitle(page), title);
  assert.equal(getCanonical(page), `https://convyio.com/${slug}/`);
  assert.equal(getMeta(page, 'robots'), 'index, follow');
  assert.ok(getMeta(page, 'description'), `Guide /${slug} needs a meta description`);
  assert.match(page, /<meta property="og:image"/);
  assert.match(page, /<meta name="twitter:image"/);
  assert.equal((page.match(/<h1(?:\s|>)/g) || []).length, 1, `Guide /${slug} needs exactly one h1`);
  const pageH1 = page.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1].replace(/<[^>]+>/g, '');
  assert.equal(pageH1, guideH1);
  assert.match(page, /"@type":"BreadcrumbList"/);
  for (const other of guides.filter((g) => g.slug !== slug)) {
    assert.ok(
      page.includes(`href="/${other.slug}"`),
      `Guide /${slug} should link to /${other.slug}`
    );
  }
});
for (const { slug } of guides) {
  assert.ok(home.includes(`href="/${slug}"`), `Homepage should link to /${slug}`);
  assert.ok(about.includes(`href="/${slug}"`), `About should link to /${slug}`);
}

assert.equal(getTitle(thankYou), 'Thank You | Convyio');
assert.equal(getMeta(thankYou, 'robots'), 'noindex, follow');
assert.equal(getCanonical(thankYou), 'https://convyio.com/thank-you/');
assert.match(thankYou, /"@type":"BreadcrumbList"/);
assert.match(thankYou, /reply within two business days/);
assert.match(thankYou, /<meta property="og:image"/);

assert.equal(getTitle(notFound), 'Page Not Found | Convyio');
assert.match(notFound, /This channel doesn’t exist/);
assert.match(notFound, /Back to Convyio/);
assert.match(notFound, /<meta name="robots" content="noindex/);

assert.match(robots, /^User-agent: \*\nAllow: \/$/m);
assert.match(robots, /Sitemap: https:\/\/convyio\.com\/sitemap\.xml/);
assert.deepEqual(
  [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]),
  [
    'https://convyio.com/',
    'https://convyio.com/agents/',
    'https://convyio.com/keys/',
    'https://convyio.com/approvals/',
    'https://convyio.com/changelog/',
    'https://convyio.com/about/',
    'https://convyio.com/privacy/',
    'https://convyio.com/terms/',
  ]
);
assert.doesNotMatch(sitemap, /\/(?:v2|thank-you)\//);

console.log('SEO checks passed');
