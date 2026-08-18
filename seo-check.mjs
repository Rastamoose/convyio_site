import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');
const getMeta = (html, name) =>
  html.match(new RegExp(`<meta name="${name}" content="([^"]+)"`))?.[1];
const getCanonical = (html) => html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];

const [home, v2, about, privacy, terms, robots, sitemap] = await Promise.all([
  read('./dist/index.html'),
  read('./dist/v2/index.html'),
  read('./dist/about/index.html'),
  read('./dist/privacy/index.html'),
  read('./dist/terms/index.html'),
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
assert.match(home, /id="how-it-works"/);
assert.match(home, /id="faq"/);

const jsonLdMatch = home.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
assert.ok(jsonLdMatch, 'Homepage JSON-LD is missing');
const jsonLd = JSON.parse(jsonLdMatch[1]);
const schemaTypes = jsonLd['@graph'].map((item) => item['@type']);
assert.deepEqual(schemaTypes, ['Organization', 'WebSite', 'SoftwareApplication', 'FAQPage']);
assert.equal(jsonLd['@graph'][3].mainEntity.length, 6);

assert.equal(getCanonical(v2), 'https://convyio.com/');
assert.equal(getMeta(v2, 'robots'), 'noindex, follow');
assert.equal(getCanonical(about), 'https://convyio.com/about/');
assert.match(about, /<title>About Convyio \| Human-AI Team Collaboration<\/title>/);
assert.equal(getCanonical(privacy), 'https://convyio.com/privacy/');
assert.equal(getCanonical(terms), 'https://convyio.com/terms/');
assert.match(privacy, /<meta property="og:title" content="Privacy Policy — convyio"/);
assert.match(terms, /<meta property="og:title" content="Terms of Service — convyio"/);

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
assert.doesNotMatch(sitemap, /\/v2\//);

console.log('SEO checks passed');
