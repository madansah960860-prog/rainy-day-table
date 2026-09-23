/**
 * Page shell and components for Rainy Day Table.
 *
 * Design language, and why each choice is here:
 *   header  — one chunky navy row. The wordmark sits in a mustard tile and every
 *             nav item is a tile too, so the header reads as a row of game pieces.
 *   hero    — a solid navy panel with the headline on the left and a 2×2 "board"
 *             of tiles on the right: three product thumbs and one call to action.
 *   card    — a square game tile: 3px navy border, a hard 5px offset shadow, a
 *             rotated sticker badge, and the price in a mustard block.
 *   footer  — three columns on cream under a navy dotted rule, centred bottom bar.
 *   button  — a hard-shadow rectangle that presses down 3px on :active. Instant,
 *             no bounce: the tactile idea from the design research, executed in a
 *             way that respects "no flashy animation".
 */

import { business, terms } from '../data/business.js';
import { categories } from '../data/products.js';

export const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export const money = (n) => `${terms.currencySymbol}${Number(n).toFixed(2)}`;

const NAV = [
  { href: '/index.html', label: 'Home' },
  { href: '/shop.html', label: 'Shop' },
  { href: '/about.html', label: 'About' },
  { href: '/faq.html', label: 'FAQ' },
  { href: '/contact.html', label: 'Contact' },
];

export const POLICY_LINKS = [
  { href: '/policies/shipping.html', label: 'Shipping Policy' },
  { href: '/policies/refund-returns.html', label: 'Refund &amp; Return Policy' },
  { href: '/policies/privacy.html', label: 'Privacy Policy' },
  { href: '/policies/terms.html', label: 'Terms of Service' },
  { href: '/policies/accessibility.html', label: 'Accessibility Statement' },
];

function head({ title, description, path, ogImage = '/assets/images/hero.webp' }) {
  const fullTitle = title.includes(business.shortName)
    ? title
    : `${title} — ${business.brandName}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${business.siteUrl}${path}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(business.brandName)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${business.siteUrl}${path}">
<meta property="og:image" content="${business.siteUrl}${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="theme-color" content="#1B2A4A">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style"
  href="https://fonts.googleapis.com/css2?family=Alegreya:wght@500;700&family=Atkinson+Hyperlegible:wght@400;700&display=swap"
  onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Alegreya:wght@500;700&family=Atkinson+Hyperlegible:wght@400;700&display=swap"></noscript>
<link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to main content</a>`;
}

function header(current) {
  const tile = (n) =>
    `<li><a class="rd-nav__tile${current === n.href ? ' is-current' : ''}"${
      current === n.href ? ' aria-current="page"' : ''
    } href="${n.href}">${n.label}</a></li>`;

  return `<header class="rd-head">
  <div class="rd-head__strip">
    <div class="wrap rd-head__strip-inner">
      <p>Free standard shipping on US orders over ${terms.freeShippingOver} · ${terms.returnWindow} returns</p>
      <p>Questions? <a href="${business.phoneHref}">${business.phone}</a> · ${business.hours}</p>
    </div>
  </div>

  <div class="wrap rd-head__inner">
    <a class="rd-logo" href="/index.html">
      <span class="rd-logo__tile" aria-hidden="true">RD</span>
      <span class="rd-logo__text">Rainy Day<span>Table</span></span>
    </a>

    <button class="rd-menu" type="button" aria-expanded="false" aria-controls="sitenav">
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" fill="none"/></svg>
      <span class="rd-menu__label">Menu</span>
    </button>

    <nav class="rd-nav" id="sitenav" aria-label="Main">
      <ul class="rd-nav__list">${NAV.map(tile).join('')}
        <li><a class="rd-nav__tile rd-nav__tile--cart" href="/cart.html">Cart
          <span data-cart-count aria-live="polite">0</span></a></li>
      </ul>
    </nav>
  </div>
</header>`;
}

function footer() {
  const shopLinks = categories
    .map((c) => `<li><a href="/shop.html?category=${c.id}">${esc(c.name)}</a></li>`)
    .join('');

  return `<footer class="rd-footer">
  <div class="wrap rd-footer__cols">
    <div>
      <p class="rd-footer__name">${esc(business.brandName)}</p>
      <p>${esc(business.tagline)}</p>
      <address>
        <strong>${esc(business.legalName)}</strong><br>
        ${esc(business.address.line1)}<br>
        ${esc(business.address.city)}, ${business.address.state} ${business.address.zip}<br>
        <a href="mailto:${business.email}">${business.email}</a><br>
        <a href="${business.phoneHref}">${business.phone}</a><br>
        ${esc(business.hours)}
      </address>
    </div>

    <div>
      <h2>Shop</h2>
      <ul>
        <li><a href="/shop.html">All products</a></li>
        ${shopLinks}
        <li><a href="/cart.html">Your cart</a></li>
      </ul>
      <h2>Help</h2>
      <ul>
        <li><a href="/contact.html">Contact us</a></li>
        <li><a href="/faq.html">Frequently asked questions</a></li>
        <li><a href="/about.html">About Rainy Day Table</a></li>
      </ul>
    </div>

    <div>
      <h2>Legal</h2>
      <ul>
        ${POLICY_LINKS.map((p) => `<li><a href="${p.href}">${p.label}</a></li>`).join('')}
        <li><a href="/policies/privacy.html#do-not-sell">Do Not Sell or Share My Personal Information</a></li>
        <li><a href="/credits.html">Photo credits</a></li>
      </ul>
    </div>
  </div>

  <div class="rd-footer__bar">
    <div class="wrap">
      <p>© 2026 ${esc(business.legalName)}. Prices in US dollars. We ship within the United States only.
         Policies effective ${esc(business.effectiveDate)}.
         Product photographs are used under Creative Commons licences —
         <a href="/credits.html">see the photo credits</a>.</p>
    </div>
  </div>
</footer>`;
}

function cookieNotice() {
  return `<div class="rd-cookie" role="region" aria-label="Cookie notice" data-cookie hidden>
  <p>We use a small number of cookies to keep your cart and to count visits. We do not use advertising
     cookies and we do not sell or share personal information. Read the
     <a href="/policies/privacy.html">Privacy Policy</a>.</p>
  <button class="rd-btn rd-btn--small" type="button" data-cookie-dismiss>Got it</button>
</div>`;
}

export function page({ title, description, path, body, current = '', ogImage, jsonLd }) {
  return `${head({ title, description, path, ogImage })}
${header(current)}
<main id="main">
${body}
</main>
${footer()}
${cookieNotice()}
${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
<script src="/assets/js/main.js" defer></script>
</body>
</html>
`;
}

export function breadcrumb(trail) {
  const items = trail
    .map((t, i) =>
      i === trail.length - 1
        ? `<li aria-current="page">${esc(t.label)}</li>`
        : `<li><a href="${t.href}">${esc(t.label)}</a></li>`,
    )
    .join('');
  return `<div class="wrap"><nav class="rd-crumb" aria-label="Breadcrumb"><ol>${items}</ol></nav></div>`;
}

/* --------------------------------------------------------------- components */

export function productImage(file, alt, { sizes, eager = false, className = '' } = {}) {
  const base = file.replace(/\.webp$/, '');
  return `<img${className ? ` class="${className}"` : ''}
  src="/assets/images/${base}.webp"
  srcset="/assets/images/${base}-600.webp 600w, /assets/images/${base}.webp 1200w"
  sizes="${sizes}"
  alt="${esc(alt)}" width="1200" height="900"
  loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''}>`;
}

/** Square game tile with a hard offset shadow and a rotated sticker badge. */
export function card(product, { eager = false } = {}) {
  const cat = categories.find((c) => c.id === product.category);
  return `<li class="rd-card">
  <div class="rd-card__top">
    <a href="/products/${product.slug}.html" tabindex="-1" aria-hidden="true">
      ${productImage(product.image, product.alt, {
        sizes: '(max-width: 620px) 92vw, (max-width: 1020px) 46vw, 268px',
        eager,
      })}
    </a>
    <span class="rd-sticker">${esc(cat.name)}</span>
  </div>
  <div class="rd-card__body">
    <h3 class="rd-card__name"><a href="/products/${product.slug}.html">${esc(product.name)}</a></h3>
    <p class="rd-card__summary">${esc(product.summary)}</p>
    <p class="rd-card__foot">
      <span class="rd-price">${money(product.price)}</span>
      <span class="rd-stock">In stock</span>
    </p>
    <button class="rd-btn rd-btn--block" type="button" data-add="${product.sku}">
      Add to cart<span class="visually-hidden">: ${esc(product.name)}</span>
    </button>
  </div>
</li>`;
}

export function cardGrid(products, { eagerCount = 0 } = {}) {
  return `<ul class="rd-grid">${products
    .map((p, i) => card(p, { eager: i < eagerCount }))
    .join('\n')}</ul>`;
}

/** The four honest reasons, repeated verbatim from the policies. */
export function promises() {
  const items = [
    [`Shipped in ${terms.processing}`, `Standard shipping is ${terms.standardShipping} and free over ${terms.freeShippingOver}. It arrives in ${terms.standardDelivery} after it ships.`],
    [`${terms.returnWindow} to send it back`, `Unused and in its packaging, return it within ${terms.returnWindow} of delivery. Refunds land in ${terms.refundTime} after we inspect it.`],
    ['A phone number that works', `${business.phone}, ${business.hours}. If you would rather order by phone than online, that is fine with us.`],
    ['Printed big on purpose', 'Every book in this shop states its type size in points. If it does not say, it is not large print, and we would not stock it.'],
  ];
  return `<ul class="rd-promises">${items
    .map(
      ([t, b], i) => `<li><span class="rd-promises__num" aria-hidden="true">${i + 1}</span>
    <h3>${esc(t)}</h3><p>${esc(b)}</p></li>`,
    )
    .join('')}</ul>`;
}

/**
 * Newsletter signup. CAN-SPAM shapes it: the consent text names the sender, the
 * content, the frequency and the unsubscribe route before anything is typed; email
 * is the only field; nothing is pre-ticked. No mailing provider is connected, and
 * the form says so rather than pretending a subscription happened.
 */
export function newsletter() {
  return `<section class="rd-news" aria-labelledby="news-h">
  <div class="wrap rd-news__inner">
    <h2 id="news-h">The Rainy Day letter</h2>
    <p>One email a month: what has come in, which jigsaw we are halfway through, and the
       occasional printable puzzle. Nothing else.</p>
    <form class="rd-news__form" data-newsletter novalidate>
      <div class="rd-field">
        <label for="news-email">Your email address</label>
        <input id="news-email" name="email" type="email" autocomplete="email"
               aria-describedby="news-consent" required>
      </div>
      <button class="rd-btn rd-btn--mustard" type="submit">Sign up</button>
      <p class="rd-consent">
        <label>
          <input type="checkbox" name="consent" data-consent>
          <span id="news-consent">Yes, ${esc(business.legalName)} may email me its monthly newsletter
          about products and shop news. I can unsubscribe from the link in any message or by emailing
          ${business.email}, and my address will not be sold or shared. See the
          <a href="/policies/privacy.html">Privacy Policy</a>.</span>
        </label>
      </p>
      <p class="rd-formnote" data-newsletter-note role="status"></p>
    </form>
  </div>
</section>`;
}
