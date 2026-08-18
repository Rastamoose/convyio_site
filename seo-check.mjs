import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');
const getMeta = (html, name) =>
  html.match(new RegExp(`<meta name="${name}" content="([^"]+)"`))?.[1];
const getCanonical = (html) => html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
const getTitle = (html) => html.match(/<title>(.*?)<\/title>/)?.[1];

const [home, v2, about, privacy, terms, thankYou, notFound, robots, sitemap] =
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
  ]);

assert.match(home, /<title>AI Team Chat for People and Agents \| Convyio<\/title>/);
assert.match(home, /<meta name="description" content="Convyio is an AI team chat/);
assert.equal(getCanonical(home), 'https://convyio.com/');
assert.equal(getMeta(home, 'robots'), 'index, follow');
assert.equal((home.match(/<h1(?:\s|>)/g) || []).length, 1);
const h1 = home.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1].replace(/<[^>]+>/g, '');
assert.equal(h1, 'AI team chat where people and agents work together.');
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
    'https://convyio.com/about/',
    'https://convyio.com/privacy/',
    'https://convyio.com/terms/',
  ]
);
assert.doesNotMatch(sitemap, /\/(?:v2|thank-you)\//);

console.log('SEO checks passed');
