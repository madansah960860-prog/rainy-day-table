/**
 * Static site generator for Rainy Day Table.
 *
 *   node _generator/build.mjs
 *
 * Writes 26 plain HTML files, robots.txt, sitemap.xml and favicon.svg, and
 * regenerates the catalogue block inside assets/js/main.js from the same product
 * data the pages are built from — so the cart can never quote a price the product
 * page does not.
 *
 * The generator is authoring tooling and is NOT part of the deployed site:
 * everything it produces is static HTML, CSS, JS and images that any web server
 * can serve with no build step, no framework and no runtime dependency.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { business } from './data/business.js';
import { products } from './data/products.js';
import { page } from './lib/site.js';
import { policies } from './lib/policies.js';
import {
  about,
  cart,
  checkout,
  contact,
  credits,
  faq,
  home,
  notFound,
  productPage,
  shop,
} from './lib/pages.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');

async function write(relative, contents) {
  const target = join(ROOT, relative);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, contents, 'utf8');
  return relative;
}

async function loadCredits() {
  const file = join(ROOT, 'image-credits.json');
  if (!existsSync(file)) {
    console.warn('  ! image-credits.json not found — run the image localizer first');
    return [];
  }
  return JSON.parse(await readFile(file, 'utf8'));
}

function policyPage(policy) {
  return {
    file: `policies/${policy.slug}.html`,
    path: `/policies/${policy.slug}.html`,
    current: '',
    title: policy.title,
    description: policy.description,
    body: `<section class="section"><div class="wrap--narrow policy">${policy.body}</div></section>`,
  };
}

/**
 * Rewrite the catalogue literal inside the runtime cart script.
 *
 * The cart needs prices in the browser without a second network request, which
 * means the catalogue exists twice. Generating one from the other removes the
 * only real risk in that arrangement: a price that drifts. The audit still
 * compares them, so a hand-edit is caught rather than silently shipped.
 */
async function syncCartCatalogue() {
  const file = join(ROOT, 'assets/js/main.js');
  const source = await readFile(file, 'utf8');

  const entries = products
    .map((p) => {
      const alt = p.alt.replace(/'/g, "\\'");
      const name = p.name.replace(/'/g, "\\'");
      return `    '${p.sku}': { name: '${name}', price: ${p.price.toFixed(2)}, ` +
        `slug: '${p.slug}', image: '${p.image.replace(/\.webp$/, '')}', alt: '${alt}' }`;
    })
    .join(',\n');

  const block =
    '  /* CATALOGUE:START — generated, do not edit by hand */\n' +
    '  var CATALOGUE = {\n' + entries + '\n  };\n' +
    '  /* CATALOGUE:END */';

  const rx = /[ \t]*\/\* CATALOGUE:START[\s\S]*?\/\* CATALOGUE:END \*\//;
  if (!rx.test(source)) {
    throw new Error('CATALOGUE markers not found in assets/js/main.js');
  }
  await writeFile(file, source.replace(rx, block), 'utf8');
  return products.length;
}

function robots() {
  return `# Rainy Day Table — everything is public and crawlable.
# No login wall, no geo-blocking, no paywall.

User-agent: *
Allow: /

# Google Ads' crawler ignores the wildcard group, so it needs its own.
# Without this, ads pointing at this site are disapproved as "destination not crawlable".
User-agent: AdsBot-Google
Allow: /

User-agent: AdsBot-Google-Mobile
Allow: /

User-agent: Googlebot
Allow: /

Sitemap: ${business.siteUrl}/sitemap.xml
`;
}

function sitemap(paths) {
  const today = '2026-09-23';
  const priority = (p) => {
    if (p === '/index.html') return ['1.0', 'weekly'];
    if (p === '/shop.html') return ['0.9', 'weekly'];
    if (p.startsWith('/products/')) return ['0.8', 'monthly'];
    if (p === '/contact.html' || p === '/faq.html') return ['0.6', 'monthly'];
    if (p === '/about.html') return ['0.5', 'yearly'];
    if (p.startsWith('/policies/')) return ['0.4', 'yearly'];
    return ['0.3', 'monthly'];
  };
  const urls = paths
    .filter((p) => p !== '/404.html')
    .map((p) => {
      const [prio, freq] = priority(p);
      return `  <url>
    <loc>${business.siteUrl}${p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${prio}</priority>
  </url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function favicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" aria-label="Rainy Day Table">
  <rect width="48" height="48" rx="8" fill="#1B2A4A"/>
  <rect x="7" y="7" width="15" height="15" rx="3" fill="#DFA324"/>
  <rect x="26" y="7" width="15" height="15" rx="3" fill="#FBF3E0"/>
  <rect x="7" y="26" width="15" height="15" rx="3" fill="#FBF3E0"/>
  <rect x="26" y="26" width="15" height="15" rx="3" fill="#B4503C"/>
</svg>
`;
}

async function main() {
  const creditRows = await loadCredits();

  const specs = [
    home(),
    shop(),
    ...products.map(productPage),
    cart(),
    checkout(),
    about(),
    contact(),
    faq(),
    credits(creditRows),
    notFound(),
    ...policies.map(policyPage),
  ];

  const written = [];
  for (const spec of specs) {
    written.push(await write(spec.file, page(spec)));
  }

  await write('robots.txt', robots());
  await write('sitemap.xml', sitemap(specs.map((s) => s.path)));
  await write('favicon.svg', favicon());
  const synced = await syncCartCatalogue();

  console.log(`Built ${written.length} pages:`);
  console.log(`  ${products.length} product pages`);
  console.log(`  ${policies.length} policy pages`);
  console.log(`  ${written.length - products.length - policies.length} other pages`);
  console.log('  + robots.txt, sitemap.xml, favicon.svg');
  console.log(`  + synced ${synced} SKUs into assets/js/main.js`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
