/**
 * The nine non-policy pages for Rainy Day Table.
 *
 * The composition is deliberately unlike the other stores: the home page leads
 * with a tile board rather than a photograph, the shop groups by "what you do
 * with it", and the product page puts the numbers (piece count, type size, board
 * size) above the prose, because those are the figures that decide the purchase.
 */

import { business, terms, shippingMethods, shippingSummary, returnSummary } from '../data/business.js';
import { categories, products, featuredSkus } from '../data/products.js';
import { breadcrumb, card, cardGrid, esc, money, newsletter, productImage, promises } from './site.js';

const B = business;
const T = terms;
const featured = featuredSkus.map((sku) => products.find((p) => p.sku === sku));

/* ------------------------------------------------------------------- home */

export function home() {
  const boardTiles = featured
    .slice(0, 3)
    .map(
      (p, i) => `<a class="rd-board__tile" href="/products/${p.slug}.html">
    ${productImage(p.image, p.alt, { sizes: '(max-width: 900px) 45vw, 200px', eager: i === 0 })}
    <span class="rd-board__label">${esc(p.name)}</span>
  </a>`,
    )
    .join('');

  return {
    file: 'index.html',
    path: '/index.html',
    current: '/index.html',
    title: `${B.brandName} — puzzles, games and hobbies`,
    description: `Large-piece jigsaws, large-print puzzle books, weighted dominoes and a cribbage board you can actually peg. Free US shipping over ${T.freeShippingOver}, ${T.returnWindow} returns.`,
    body: `
<section class="rd-hero">
  <div class="wrap rd-hero__inner">
    <div class="rd-hero__text">
      <p class="rd-eyebrow">Puzzles, games &amp; hobbies</p>
      <h1>Nobody ever finished a jigsaw they could not see.</h1>
      <p class="lede">Big pieces. Big print. Tiles heavy enough to stand up on their own. We sell
      twelve things for the kitchen table and we print the piece size and the point size of every
      one of them.</p>
      <p class="rd-hero__actions">
        <a class="rd-btn rd-btn--mustard" href="/shop.html">Shop all 12 products</a>
        <a class="rd-btn rd-btn--ghost" href="/about.html">Why we started</a>
      </p>
    </div>

    <div class="rd-hero__board">
      ${boardTiles}
      <a class="rd-board__tile rd-board__tile--cta" href="/shop.html">
        <span>See all<br>12 things</span>
      </a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2 class="rd-h2">Four things to do with an afternoon</h2>
    <p class="lede">Grouped by what you actually do with them, not by the aisle they came from.</p>
    <ul class="rd-cats">
      ${categories
        .map(
          (c) => `<li><a class="rd-cat" href="/shop.html?category=${c.id}">
        <span class="rd-cat__media">${productImage(c.image, c.alt, { sizes: '(max-width: 720px) 92vw, 24vw' })}</span>
        <span class="rd-cat__body"><span class="rd-cat__name">${esc(c.name)}</span>
        <span class="rd-cat__blurb">${esc(c.blurb)}</span></span></a></li>`,
        )
        .join('')}
    </ul>
  </div>
</section>

<section class="section section--cream">
  <div class="wrap">
    <h2 class="rd-h2">Where most people start</h2>
    <p class="lede">Four that get asked about more than the rest.</p>
    ${cardGrid(featured)}
    <p class="rd-more"><a class="rd-btn rd-btn--ghost" href="/shop.html">See the whole shop</a></p>
  </div>
</section>

<section class="section section--navy">
  <div class="wrap">
    <h2 class="rd-h2 rd-h2--light">Four promises, and where to check them</h2>
    <p class="lede lede--light">Every one of these is repeated, word for word, in our policies.</p>
    ${promises()}
  </div>
</section>

${newsletter()}
`,
  };
}

/* ------------------------------------------------------------------- shop */

export function shop() {
  return {
    file: 'shop.html',
    path: '/shop.html',
    current: '/shop.html',
    title: 'Shop all products',
    description: `Every jigsaw, puzzle book, game and kit Rainy Day Table sells, with piece counts and type sizes. Free US standard shipping over ${T.freeShippingOver} and ${T.returnWindow} returns.`,
    body: `
${breadcrumb([{ href: '/index.html', label: 'Home' }, { label: 'Shop' }])}

<section class="section">
  <div class="wrap">
    <h1>Everything we sell</h1>
    <p class="lede">Twelve things for the table. Every price below is the price you pay; shipping is
    added at the cart and nothing else is.</p>

    <div class="rd-tools">
      <div class="rd-tools__group">
        <span class="rd-tools__label" id="filter-label">Filter</span>
        <div class="rd-chips" role="group" aria-labelledby="filter-label">
          <button class="rd-chip" type="button" data-filter="all" aria-pressed="true">All products</button>
          ${categories
            .map(
              (c) =>
                `<button class="rd-chip" type="button" data-filter="${c.id}" aria-pressed="false">${esc(c.name)}</button>`,
            )
            .join('')}
        </div>
      </div>
      <div class="rd-tools__group">
        <label class="rd-tools__label" for="sort">Sort by</label>
        <select id="sort" data-sort>
          <option value="featured">Our order</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>
    </div>

    <p class="rd-count" role="status" data-count>Showing ${products.length} of ${products.length} products. All in stock.</p>

    <h2 class="visually-hidden">Products</h2>
    <ul class="rd-grid" data-grid>
      ${products
        .map((p, i) =>
          card(p, { eager: i < 3 }).replace(
            '<li class="rd-card">',
            `<li class="rd-card" data-category="${p.category}" data-price="${p.price}" data-name="${esc(p.name)}" data-order="${i}">`,
          ),
        )
        .join('\n')}
    </ul>
  </div>
</section>
`,
  };
}

/* ---------------------------------------------------------------- product */

export function productPage(product) {
  const cat = categories.find((c) => c.id === product.category);
  const related = products
    .filter((p) => p.category === product.category && p.sku !== product.sku)
    .slice(0, 3);

  // The first three specs are pulled out as headline figures: for this shop they
  // are always the numbers that decide the purchase (piece count, type size, size).
  const specEntries = Object.entries(product.specs);
  const headline = specEntries.slice(0, 3);
  const specRows = specEntries
    .map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`)
    .join('');

  return {
    file: `products/${product.slug}.html`,
    path: `/products/${product.slug}.html`,
    current: '/shop.html',
    title: product.name,
    description: `${product.summary} ${money(product.price)}. ${T.returnWindow} returns and free US standard shipping over ${T.freeShippingOver}.`,
    ogImage: `/assets/images/${product.image}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      sku: product.sku,
      description: product.summary,
      image: `${B.siteUrl}/assets/images/${product.image}`,
      brand: { '@type': 'Brand', name: B.brandName },
      offers: {
        '@type': 'Offer',
        url: `${B.siteUrl}/products/${product.slug}.html`,
        priceCurrency: 'USD',
        price: product.price.toFixed(2),
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: { '@type': 'Organization', name: B.legalName },
      },
    },
    body: `
${breadcrumb([
  { href: '/index.html', label: 'Home' },
  { href: '/shop.html', label: 'Shop' },
  { href: `/shop.html?category=${cat.id}`, label: cat.name },
  { label: product.name },
])}

<section class="section">
  <div class="wrap rd-product">
    <div class="rd-product__media">
      ${productImage(product.image, product.alt, { sizes: '(max-width: 880px) 92vw, 46vw', eager: true })}
      <span class="rd-sticker rd-sticker--big">${esc(cat.name)}</span>
    </div>

    <div class="rd-product__info">
      <h1>${esc(product.name)}</h1>
      <p class="rd-product__price">${money(product.price)}</p>
      <p class="rd-product__sku">SKU ${esc(product.sku)} · <strong class="rd-instock">In stock</strong></p>

      <ul class="rd-figures">
        ${headline
          .map(([k, v]) => `<li><span class="rd-figures__k">${esc(k)}</span><span class="rd-figures__v">${esc(v)}</span></li>`)
          .join('')}
      </ul>

      <p>${esc(product.description)}</p>

      <div class="rd-product__buy">
        <div class="rd-qty">
          <label for="qty">Quantity</label>
          <select id="qty" data-qty>
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => `<option value="${n}">${n}</option>`).join('')}
          </select>
        </div>
        <button class="rd-btn rd-btn--mustard" type="button" data-add="${product.sku}" data-use-qty>
          Add to cart — ${money(product.price)}
        </button>
      </div>
      <p class="rd-added" role="status" data-added></p>

      <div class="rd-note">
        <p><strong>Shipping:</strong> ${esc(shippingSummary)}</p>
        <p><strong>Returns:</strong> ${esc(returnSummary)}
           <a href="/policies/refund-returns.html">Read the full policy</a>.</p>
        <p>Sales tax is calculated at checkout from your delivery address. There are no handling fees
           or surcharges.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="wrap rd-cols">
    <div>
      <h2 class="rd-h2">What you get</h2>
      <ul>${product.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
      <h2 class="rd-h2">In the box</h2>
      <ul>${product.inBox.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
    </div>
    <div>
      <h2 class="rd-h2">Every number</h2>
      <div class="table-scroll">
        <table class="rd-specs">
          <caption class="visually-hidden">Specifications for the ${esc(product.name)}</caption>
          <tbody>${specRows}</tbody>
        </table>
      </div>
      <h2 class="rd-h2">Customer reviews</h2>
      <p>No customer reviews yet. Rainy Day Table is a new shop and we will not publish a review until
      a real customer writes one. We do not buy, incentivise or write reviews.</p>
    </div>
  </div>
</section>

${
  related.length
    ? `<section class="section">
  <div class="wrap">
    <h2 class="rd-h2">More ${esc(cat.name)}</h2>
    ${cardGrid(related)}
  </div>
</section>`
    : ''
}
`,
  };
}

/* ------------------------------------------------------------------- cart */

export function cart() {
  return {
    file: 'cart.html',
    path: '/cart.html',
    current: '/cart.html',
    title: 'Your cart',
    description: `Review your Rainy Day Table order. Standard shipping is ${T.standardShipping}, free over ${T.freeShippingOver}, and returns are open for ${T.returnWindow}.`,
    body: `
<section class="section">
  <div class="wrap">
    <h1>Your cart</h1>

    <!-- The empty state is the DEFAULT rendered state, and the cart layout below is what
         JavaScript reveals. The other way round costs a large layout shift: both blocks
         hidden at parse time means the footer paints high on the page and is then pushed
         down the moment the script runs. It also degrades honestly — the cart lives in
         localStorage, so without JavaScript there is genuinely nothing in it. -->
    <div data-cart-empty>
      <div class="rd-panel">
        <h2>There is nothing in your cart yet</h2>
        <p>Have a look at the twelve things we sell — or call ${esc(B.phone)} during ${esc(B.hours)}
        and we will take the order for you.</p>
        <a class="rd-btn rd-btn--mustard" href="/shop.html">Go to the shop</a>
      </div>
    </div>

    <div class="rd-cartlayout" data-cart-layout hidden>
      <div>
        <ul class="rd-cartlist" data-cart-list></ul>

        <fieldset class="rd-fieldset">
          <legend>Shipping method</legend>
          ${shippingMethods
            .map(
              (m, i) => `<label class="rd-radio">
            <input type="radio" name="shipping" value="${m.id}"${i === 0 ? ' checked' : ''} data-shipping>
            <span>
              <span class="rd-radio__label">${esc(m.label)} — <span data-ship-price="${m.id}">${esc(m.priceLabel)}</span></span>
              <span class="rd-radio__note">Arrives in ${esc(m.estimate)} after it ships. ${esc(m.note)}</span>
            </span>
          </label>`,
            )
            .join('')}
          <p class="meta-line">We ship your order within ${esc(T.processing)} of receiving it. Delivery
          estimates are the carrier&rsquo;s transit time after that.</p>
        </fieldset>
      </div>

      <aside class="rd-summary" aria-label="Order summary">
        <h2 class="rd-h3">Order summary</h2>
        <div class="rd-sumrow"><span>Subtotal</span><strong data-subtotal>$0.00</strong></div>
        <div class="rd-sumrow"><span>Shipping<br><span class="meta-line" data-ship-label>Standard shipping</span></span><strong data-shipping-cost>$0.00</strong></div>
        <div class="rd-sumrow"><span>Sales tax</span><span class="meta-line">Calculated at checkout from your delivery address</span></div>
        <div class="rd-sumrow rd-sumrow--total"><span>Total before tax</span><strong data-total>$0.00</strong></div>
        <p class="meta-line" data-freeship></p>

        <a class="rd-btn rd-btn--mustard rd-btn--block" href="/checkout.html">Go to checkout</a>
        <a class="rd-btn rd-btn--ghost rd-btn--block" href="/shop.html">Keep shopping</a>

        <p class="meta-line">Returns are open for ${esc(T.returnWindow)} from delivery —
          <a href="/policies/refund-returns.html">Refund &amp; Return Policy</a>. See also the
          <a href="/policies/shipping.html">Shipping Policy</a>,
          <a href="/policies/terms.html">Terms of Service</a>,
          <a href="/policies/privacy.html">Privacy Policy</a> and
          <a href="/contact.html">how to contact us</a>.</p>
      </aside>
    </div>
  </div>
</section>
`,
  };
}

/* --------------------------------------------------------------- checkout */

const STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

export function checkout() {
  return {
    file: 'checkout.html',
    path: '/checkout.html',
    current: '/checkout.html',
    title: 'Checkout',
    description: 'Complete your Rainy Day Table order. Item prices, shipping and the tax position are all shown before payment.',
    body: `
<section class="section">
  <div class="wrap">
    <h1>Checkout</h1>
    <p class="lede">Every charge is listed below before you pay. There are no handling fees, service
    fees or surcharges.</p>

    <!-- The empty state is the DEFAULT rendered state, and the cart layout below is what
         JavaScript reveals. The other way round costs a large layout shift: both blocks
         hidden at parse time means the footer paints high on the page and is then pushed
         down the moment the script runs. It also degrades honestly — the cart lives in
         localStorage, so without JavaScript there is genuinely nothing in it. -->
    <div data-cart-empty>
      <div class="rd-panel">
        <h2>Your cart is empty</h2>
        <p>Add something to your cart first and the checkout will open.</p>
        <a class="rd-btn rd-btn--mustard" href="/shop.html">Go to the shop</a>
      </div>
    </div>

    <div class="rd-cartlayout" data-cart-layout hidden>
      <form data-checkout novalidate>
        <fieldset class="rd-fieldset">
          <legend>Contact</legend>
          <div class="rd-field">
            <label for="email">Email address</label>
            <span class="hint" id="email-hint">We use this only to send your order confirmation and shipping updates.</span>
            <input id="email" name="email" type="email" autocomplete="email" aria-describedby="email-hint" required>
          </div>
          <div class="rd-field">
            <label for="phone">Phone number (optional)</label>
            <span class="hint" id="phone-hint">Only used if the carrier cannot find your address.</span>
            <input id="phone" name="phone" type="tel" autocomplete="tel" aria-describedby="phone-hint">
          </div>
          <p class="meta-line"><strong>Notice at collection:</strong> we collect your name, address,
          email and optional phone number to fulfil this order, and your payment details go straight to
          our payment processor. We do not sell or share personal information. See the
          <a href="/policies/privacy.html">Privacy Policy</a>.</p>
        </fieldset>

        <fieldset class="rd-fieldset">
          <legend>Shipping address</legend>
          <p class="meta-line">We ship within the United States only.</p>
          <div class="rd-cols2">
            <div class="rd-field">
              <label for="firstName">First name</label>
              <input id="firstName" name="firstName" autocomplete="given-name" required>
            </div>
            <div class="rd-field">
              <label for="lastName">Last name</label>
              <input id="lastName" name="lastName" autocomplete="family-name" required>
            </div>
          </div>
          <div class="rd-field">
            <label for="address1">Street address</label>
            <input id="address1" name="address1" autocomplete="address-line1" required>
          </div>
          <div class="rd-field">
            <label for="address2">Apartment, suite or unit (optional)</label>
            <input id="address2" name="address2" autocomplete="address-line2">
          </div>
          <div class="rd-cols3">
            <div class="rd-field">
              <label for="city">City or town</label>
              <input id="city" name="city" autocomplete="address-level2" required>
            </div>
            <div class="rd-field">
              <label for="state">State</label>
              <select id="state" name="state" autocomplete="address-level1" required>
                <option value="">Choose a state</option>
                ${STATES.map((s) => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div class="rd-field">
              <label for="zip">ZIP code</label>
              <input id="zip" name="zip" inputmode="numeric" autocomplete="postal-code" required>
            </div>
          </div>
          <div class="rd-field">
            <label for="notes">Delivery notes (optional)</label>
            <span class="hint" id="notes-hint">For example: leave with the neighbour at number 14.</span>
            <textarea id="notes" name="notes" rows="3" aria-describedby="notes-hint"></textarea>
          </div>
        </fieldset>

        <fieldset class="rd-fieldset">
          <legend>Shipping method</legend>
          ${shippingMethods
            .map(
              (m, i) => `<label class="rd-radio">
            <input type="radio" name="shipping" value="${m.id}"${i === 0 ? ' checked' : ''} data-shipping>
            <span>
              <span class="rd-radio__label">${esc(m.label)} — <span data-ship-price="${m.id}">${esc(m.priceLabel)}</span></span>
              <span class="rd-radio__note">We ship within ${esc(T.processing)}; the carrier then takes ${esc(m.estimate)}.</span>
            </span>
          </label>`,
            )
            .join('')}
        </fieldset>

        <button class="rd-btn rd-btn--mustard rd-btn--block" type="submit">Review my order</button>

        <div class="rd-review" data-review hidden>
          <h2 class="rd-h3">Order review</h2>
          <p data-review-address></p>
          <p data-review-shipping></p>

          <!-- ==================================================================
               PAYMENT INTEGRATION POINT

               Mount the payment processor here — Stripe Payment Element, PayPal
               Buttons, or a Shopify Buy Button. It must:

                 1. Receive the server-recalculated total. Never trust the amount
                    computed in this browser.
                 2. Add sales tax for the delivery address before charging. The
                    figure shown is deliberately labelled "total before tax" until
                    that calculation exists.
                 3. Create the order only after the processor confirms the payment,
                    then redirect to a real confirmation page.
                 4. Run over HTTPS with a valid certificate — Google Merchant Center
                    requires a secured checkout.

               Until a processor is connected, this build must never show a success
               or confirmation screen. Claiming an order was placed when no payment
               was taken is a Google Ads misrepresentation violation and an FTC
               deception issue.
               ================================================================== -->

          <div class="rd-note rd-note--white">
            <p><strong>No payment processor is connected to this site yet.</strong> Nothing has been
            charged and no order has been placed. To buy any of these items today, call
            ${esc(B.phone)} during ${esc(B.hours)} or email
            <a href="mailto:${B.email}">${B.email}</a>.</p>
          </div>
        </div>
      </form>

      <aside class="rd-summary" aria-label="Order summary">
        <h2 class="rd-h3">Your order</h2>
        <ul class="rd-minilist" data-cart-list></ul>
        <div class="rd-sumrow"><span>Subtotal</span><strong data-subtotal>$0.00</strong></div>
        <div class="rd-sumrow"><span>Shipping<br><span class="meta-line" data-ship-label>Standard shipping</span></span><strong data-shipping-cost>$0.00</strong></div>
        <div class="rd-sumrow"><span>Sales tax</span><span class="meta-line">Added at the payment step from your delivery address</span></div>
        <div class="rd-sumrow rd-sumrow--total"><span>Total before tax</span><strong data-total>$0.00</strong></div>
        <p class="meta-line">By placing an order you accept our <a href="/policies/terms.html">Terms of
        Service</a>. See the <a href="/policies/refund-returns.html">Refund &amp; Return Policy</a>
        (${esc(T.returnWindow)} from delivery), the <a href="/policies/shipping.html">Shipping Policy</a>
        and the <a href="/policies/privacy.html">Privacy Policy</a>. Questions before you order?
        <a href="/contact.html">Contact us</a>.</p>
      </aside>
    </div>
  </div>
</section>
`,
  };
}

/* ------------------------------------------------------------------ about */

export function about() {
  return {
    file: 'about.html',
    path: '/about.html',
    current: '/about.html',
    title: 'About us',
    description: `${B.legalName} is a small shop in ${B.address.city}, ${B.address.state} selling puzzles, games and hobby kits with the piece size and type size printed on every page.`,
    body: `
<section class="section">
  <div class="wrap--narrow">
    <h1>About Rainy Day Table</h1>
    <p class="lede">We are a small shop in ${esc(B.address.city)}, ${esc(B.address.state)}. We sell
    twelve things for the kitchen table. We would rather do that well than sell four hundred badly.</p>

    <h2 class="rd-h2">What we sell</h2>
    <p>Jigsaws with pieces you can pick up, puzzle books printed at a size you can read, cards with
    an index an inch and a quarter tall, dominoes heavy enough to stand on edge, a cribbage board
    drilled wide, and a knitting kit that starts at the beginning. Four groups: Jigsaws, Pencil &amp;
    Paper, Table Games, and Making Things.</p>
    <p>We describe what things are — piece count, piece size, point size, board dimensions, materials.
    We do not claim any of it is good for your memory or your brain. We are a shop that sells puzzles,
    not a clinic, and those claims are not ours to make.</p>

    <h2 class="rd-h2">Why we started</h2>
    <p>It began with a crossword book. One of us bought a &ldquo;large print&rdquo; book for a father
    who had started holding the paper at arm&rsquo;s length. The grid was indeed large. The clues were
    set in nine point, packed two columns to a page, and he never opened it twice.</p>
    <p>Nobody had lied. &ldquo;Large print&rdquo; is not a defined term, so it meant whatever the
    publisher wanted it to mean. So the rule here is simple: every book in this shop states the type
    size in points, on the product page, in the specification table. The crossword book is 18 pt. The
    word search is 20 pt. If a thing does not say, we do not stock it.</p>
    <p>The same rule applies to everything else. The jigsaws state the piece size in inches. The cards
    state the index height. The cribbage board states the hole diameter, because a 2.5 mm hole and a
    4 mm hole are a completely different game for anybody whose hands are less steady than they were.</p>

    <h2 class="rd-h2">How we write about products</h2>
    <ul>
      <li>We give the numbers first. On every product page the three figures that decide the purchase
      sit above the description, not buried under it.</li>
      <li>We do not use &ldquo;best&rdquo;, &ldquo;number one&rdquo; or &ldquo;award-winning&rdquo;.
      We have not won anything and neither have the dominoes.</li>
      <li>There are no star ratings on this site. We are new, nobody has reviewed us yet, and inventing
      reviews is both dishonest and illegal under the Federal Trade Commission&rsquo;s rule on consumer
      reviews.</li>
      <li>The price on the page is the price charged. Shipping is added at the cart, sales tax at
      checkout, and nothing else is added anywhere.</li>
    </ul>

    <h2 class="rd-h2">How we handle orders</h2>
    <p>We ship your order within ${esc(T.processing)} of receiving it, by ${esc(T.carriers)}, within the
    United States. Standard shipping is ${esc(T.standardShipping)} and free over
    ${esc(T.freeShippingOver)}. If anything is unused and still sealed you have ${esc(T.returnWindow)}
    from delivery to send it back — the full rules, including why an opened jigsaw cannot come back,
    are in the <a href="/policies/refund-returns.html">Refund &amp; Return Policy</a>.</p>

    <h2 class="rd-h2">Ordering without a computer</h2>
    <p>Some people would simply rather talk to somebody. Call ${esc(B.phone)} during ${esc(B.hours)} and
    we will take the order over the phone, read the prices back to you and post a paper receipt with the
    parcel if you would like one.</p>

    <h2 class="rd-h2">Where to find us</h2>
    <p>${esc(B.legalName)}<br>
    ${esc(B.addressOneLine)}<br>
    <a href="mailto:${B.email}">${B.email}</a> · <a href="${B.phoneHref}">${B.phone}</a><br>
    ${esc(B.hours)}</p>
    <p class="meta-line">This is a mail-order shop and the address above is our office and returns
    address. It is not a shop you can walk into, so please do not travel to it expecting to browse.</p>

    <p class="rd-more"><a class="rd-btn rd-btn--mustard" href="/shop.html">See what we sell</a></p>
  </div>
</section>
`,
  };
}

/* ---------------------------------------------------------------- contact */

export function contact() {
  return {
    file: 'contact.html',
    path: '/contact.html',
    current: '/contact.html',
    title: 'Contact us',
    description: `Email ${B.email}, call ${B.phone} (${B.hours}), or write to ${B.addressOneLine}. We answer email within one business day.`,
    body: `
<section class="section">
  <div class="wrap">
    <h1>Contact us</h1>
    <p class="lede">A real person reads every message. ${esc(B.responseTime)}</p>

    <div class="rd-cartlayout">
      <form data-contact novalidate>
        <fieldset class="rd-fieldset">
          <legend>Send us a message</legend>

          <div class="rd-field">
            <label for="name">Your name</label>
            <input id="name" name="name" autocomplete="name" required>
          </div>

          <div class="rd-field">
            <label for="cemail">Your email address</label>
            <span class="hint" id="cemail-hint">We reply to this address and use it for nothing else.</span>
            <input id="cemail" name="email" type="email" autocomplete="email" aria-describedby="cemail-hint" required>
          </div>

          <div class="rd-field">
            <label for="topic">What is it about?</label>
            <select id="topic" name="topic">
              <option>A question before I order</option>
              <option>An existing order</option>
              <option>A return or refund</option>
              <option>Something arrived damaged</option>
              <option>A missing puzzle piece</option>
              <option>Accessibility of this website</option>
              <option>Privacy request</option>
              <option>Something else</option>
            </select>
          </div>

          <div class="rd-field">
            <label for="message">Your message</label>
            <span class="hint" id="message-hint">If it is about an order, the order number helps — but it is not essential.</span>
            <textarea id="message" name="message" rows="6" aria-describedby="message-hint" required></textarea>
          </div>

          <button class="rd-btn rd-btn--mustard" type="submit">Send message</button>
          <div class="rd-note rd-note--white" data-contact-note hidden>
            <p><strong>This form is not connected to a mail server yet</strong>, so nothing was sent and
            nothing was stored. Please email <a href="mailto:${B.email}">${B.email}</a> or call
            <a href="${B.phoneHref}">${B.phone}</a> instead — we would still very much like to hear from
            you.</p>
          </div>
        </fieldset>
      </form>

      <aside class="rd-panel" aria-label="Other ways to reach us">
        <h2 class="rd-h3">Other ways to reach us</h2>

        <h3>Email</h3>
        <p><a href="mailto:${B.email}">${B.email}</a><br>
        <span class="meta-line">${esc(B.responseTime)}</span></p>

        <h3>Phone</h3>
        <p><a href="${B.phoneHref}">${B.phone}</a><br>
        <span class="meta-line">${esc(B.hours)}</span><br>
        <span class="meta-line">Outside those hours, leave a message and we will call back the next
        business day.</span></p>

        <h3>Post</h3>
        <address>
          ${esc(B.legalName)}<br>
          ${esc(B.address.line1)}<br>
          ${esc(B.address.city)}, ${B.address.state} ${B.address.zip}<br>
          ${esc(B.address.country)}
        </address>
        <p class="meta-line">This is also the returns address. Please email us for a return number
        before sending anything back — see the
        <a href="/policies/refund-returns.html">Refund &amp; Return Policy</a>.</p>

        <h3>A missing piece</h3>
        <p class="meta-line">If a jigsaw is short a piece, tell us which puzzle and roughly where the
        gap is. We keep spare boards and will cut and post a replacement piece at no charge, inside or
        outside the return window.</p>

        <h3>Privacy requests</h3>
        <p class="meta-line">To access, correct or delete your information, email ${B.email} with
        &ldquo;Privacy request&rdquo; in the subject, or call the number above. You do not need an
        account. See the <a href="/policies/privacy.html">Privacy Policy</a>.</p>

        <h3>Accessibility</h3>
        <p class="meta-line">If any part of this site is hard to use, tell us and we will fix it and
        reply within five business days. See the
        <a href="/policies/accessibility.html">Accessibility Statement</a>.</p>
      </aside>
    </div>
  </div>
</section>
`,
  };
}

/* -------------------------------------------------------------------- faq */

const FAQ = [
  {
    group: 'Orders',
    items: [
      ['Do I need an account to buy something?', 'No. There is no account system on this site at all. You enter a delivery address at checkout and that is it. Nothing is kept behind a login.'],
      ['Can I order over the phone instead?', `Yes. Call ${B.phone} during ${B.hours} and we will take the order, read the prices back to you and confirm the total before anything is charged. We can post a paper receipt with the parcel if you would like one.`],
      ['How do I change or cancel an order?', `Email ${B.email} or call ${B.phone} as soon as you can. If the parcel has not been handed to the carrier we will change or cancel it and refund you in full. If it has already gone, treat it as a return — see the <a href="/policies/refund-returns.html">Refund &amp; Return Policy</a>.`],
      ['Is everything on the site actually in stock?', 'Yes. We only list what we can ship. Every product page says &ldquo;In stock&rdquo; because that is the only state we list. If something sells out it comes off the site until it is back.'],
    ],
  },
  {
    group: 'Puzzles and games',
    items: [
      ['What does &ldquo;large print&rdquo; actually mean here?', 'A number. The crossword book sets its clues at 18 pt; the word search sets its letters at 20 pt; the bingo cards are 48 pt. Every one of those figures is on the product page in the specification table. We do not stock anything that will not state its type size.'],
      ['How big are the jigsaw pieces?', 'The 300-piece harbour puzzle has pieces about 1.9 in across — roughly four times the area of a standard piece. The 500-piece orchard puzzle is about 1.6 in. Both are on 2 mm board with a matte laminate, so they hold together when lifted and do not glare under a lamp.'],
      ['What if a puzzle is missing a piece?', `Tell us which puzzle and roughly where the gap is. We keep spare boards, and we will cut and post a replacement piece at no charge — inside or outside the ${T.returnWindow} return window. Email ${B.email}.`],
      ['Can I return a jigsaw I have opened?', `Not once the sealed bag is opened, because we cannot resell it and we have no way to know a piece has not gone under the table. Everything else about the return policy is in the <a href="/policies/refund-returns.html">Refund &amp; Return Policy</a>.`],
    ],
  },
  {
    group: 'Shipping',
    items: [
      ['How quickly do you ship?', `We ship your order within ${T.processing} of receiving it. That is a commitment, not an average. After it ships, standard delivery takes ${T.standardDelivery} and expedited takes ${T.expeditedDelivery} — those are the carrier&rsquo;s transit times.`],
      ['What does shipping cost?', `Standard shipping is ${T.standardShipping}, and it is free on orders over ${T.freeShippingOver}. Expedited shipping is ${T.expeditedPrice} on any order. There are no handling fees and no surcharges. Sales tax is calculated at checkout from your delivery address.`],
      ['Where do you ship to?', `The United States only, by ${T.carriers}. We do not ship internationally or to APO/FPO addresses. Everything fits a PO Box except the puzzle board with drawers. Full detail is in the <a href="/policies/shipping.html">Shipping Policy</a>.`],
      ['What if my order is going to be late?', `If we find we cannot ship within ${T.processing} we contact you before that deadline, give you a definite new shipping date, and offer you the choice of waiting or cancelling for a full refund. If we cannot give a firm date, or the delay is more than 30 days, we cancel and refund unless you tell us otherwise. This is required by the Federal Trade Commission&rsquo;s Mail, Internet, or Telephone Order Merchandise Rule and we follow it.`],
    ],
  },
  {
    group: 'Returns',
    items: [
      ['How long do I have to return something?', `${T.returnWindow} from the day it is delivered, unused and in its original packaging. Email ${B.email} for a return number before you send anything back.`],
      ['Who pays the return shipping?', 'If you have changed your mind, you do. If the item arrived damaged, faulty, or is not what you ordered, we do — we send a prepaid label and you are not out of pocket.'],
      ['When do I get my money back?', `We inspect returns within ${T.inspectionTime} of arrival and refund to your original payment method within ${T.refundTime} of that. Your bank may then take a few days to show it. If you paid by cash equivalent we refund within seven working days, as the FTC rule requires.`],
      ['Is anything not returnable?', 'Opened jigsaws and card decks, puzzle books that have been written in, and yarn that has been wound. Nothing else is excluded. The full list, with the reasoning, is in the <a href="/policies/refund-returns.html">Refund &amp; Return Policy</a>.'],
    ],
  },
  {
    group: 'Payments',
    items: [
      ['What can I pay with?', 'Once our payment processor is connected, major credit and debit cards. Card details go straight to the processor over an encrypted connection — they never touch our servers and we never see or store a card number.'],
      ['Is the checkout working right now?', `Not yet. This site is complete but no payment processor has been connected, so the checkout stops at the order review and tells you so plainly. We will not show a fake confirmation. Until it is live, order by phone on ${B.phone}.`],
      ['Will I be charged anything extra?', 'No. The price on the product page is the price charged. Shipping is shown in the cart before you go to checkout, and sales tax is calculated at the payment step from your delivery address. There is nothing else.'],
    ],
  },
  {
    group: 'Accounts, privacy and accessibility',
    items: [
      ['What do you do with my details?', 'We use your name, address and email to fulfil the order and to contact you about it. We do not sell or share personal information. Order records are kept for seven years for tax purposes; newsletter addresses are kept until you unsubscribe. Full detail, including your California rights, is in the <a href="/policies/privacy.html">Privacy Policy</a>.'],
      ['How do I unsubscribe from the newsletter?', `Use the unsubscribe link in any message, or email ${B.email} and ask. We act on it within ten business days and we never require anything beyond your email address.`],
      ['Is this site built for people who find small type hard?', 'That is the point of it. Body text is 18px in Atkinson Hyperlegible — a typeface designed for low vision — with a 1.65 line height. Contrast meets WCAG 2.1 AA, every button is at least 44 pixels tall with a printed word on it, and the whole site works from the keyboard with a visible focus outline.'],
      ['Something on the site is still hard to use. What now?', `Tell us. Email ${B.email} with &ldquo;Accessibility&rdquo; in the subject or call ${B.phone}. We reply within five business days and we will take the order over the phone in the meantime. See the <a href="/policies/accessibility.html">Accessibility Statement</a>.`],
    ],
  },
];

export function faq() {
  const body = FAQ.map(
    (g, gi) => `<h2 class="rd-h2">${esc(g.group)}</h2>
${g.items
  .map(
    ([q, a], i) => `<div class="rd-acc">
  <h3><button class="rd-acc__btn" type="button" aria-expanded="${gi === 0 && i === 0}" aria-controls="acc-${gi}-${i}" id="accbtn-${gi}-${i}">
    <span>${q}</span><span class="rd-acc__sign" aria-hidden="true">${gi === 0 && i === 0 ? '−' : '+'}</span>
  </button></h3>
  <div class="rd-acc__panel" id="acc-${gi}-${i}" role="region" aria-labelledby="accbtn-${gi}-${i}"${gi === 0 && i === 0 ? '' : ' hidden'}>
    <p>${a}</p>
  </div>
</div>`,
  )
  .join('')}`,
  ).join('\n');

  return {
    file: 'faq.html',
    path: '/faq.html',
    current: '/faq.html',
    title: 'Frequently asked questions',
    description: `Answers on orders, puzzles and print sizes, shipping (${T.processing} to ship), returns (${T.returnWindow}), payments and accessibility at Rainy Day Table.`,
    body: `
<section class="section">
  <div class="wrap--narrow">
    <h1>Frequently asked questions</h1>
    <p class="lede">If your question is not here, email <a href="mailto:${B.email}">${B.email}</a> or
    call <a href="${B.phoneHref}">${B.phone}</a> during ${esc(B.hours)}.</p>
    ${body}
  </div>
</section>
`,
  };
}

/* ---------------------------------------------------------------- credits */

export function credits(creditRows) {
  const rows = creditRows
    .map(
      (c) => `<tr>
  <th scope="row" class="rd-mono">${esc(c.file)}</th>
  <td>${c.source ? `<a href="${esc(c.source)}" rel="noopener">${esc(c.title)}</a>` : esc(c.title)}</td>
  <td>${esc(c.creator)}</td>
  <td>${esc(c.license)}</td>
</tr>`,
    )
    .join('');

  return {
    file: 'credits.html',
    path: '/credits.html',
    current: '',
    title: 'Photo credits',
    description: 'Credits and licence details for every photograph used on Rainy Day Table, with a link to each original source.',
    body: `
<section class="section">
  <div class="wrap--narrow">
    <h1>Photo credits</h1>
    <p class="lede">Every image on this site is stored on our own server — we do not load pictures from
    anyone else&rsquo;s. The photographs below are used under Creative Commons licences, which ask that
    the photographer is credited. This page is that credit.</p>

    <div class="rd-note">
      <p><strong>These are illustrative photographs, not our own product shots.</strong> They show the
      kind of item described, not the exact unit we will ship. If the precise artwork or finish matters
      to you, call <a href="${B.phoneHref}">${B.phone}</a> during ${esc(B.hours)} and we will describe
      it.</p>
    </div>

    <div class="table-scroll">
      <table>
        <caption class="visually-hidden">Photograph credits and licences</caption>
        <thead><tr><th scope="col">File</th><th scope="col">Photograph</th><th scope="col">By</th><th scope="col">Licence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>

    <h2 class="rd-h2">About the licences</h2>
    <p><strong>CC BY</strong> allows reuse, including commercially, provided the creator is credited.
    <strong>CC BY-SA</strong> adds that adaptations must be shared under the same licence; the crops and
    re-encodings on this site are adaptations and are offered under CC BY-SA 4.0 accordingly.
    <strong>CC0</strong> and <strong>Public domain</strong> carry no conditions, and we credit them
    anyway.</p>
    <p>Images were sourced through <a href="https://commons.wikimedia.org/" rel="noopener">Wikimedia
    Commons</a> and <a href="https://openverse.org/" rel="noopener">Openverse</a>, filtered to licences
    that permit commercial use. Each was downloaded, fitted to a 4:3 frame, resized to at most 1200
    pixels wide and re-encoded as WebP.</p>

    <h2 class="rd-h2">Questions about an image</h2>
    <p>If you are the photographer of anything here and would like the credit corrected or the image
    removed, email <a href="mailto:${B.email}">${B.email}</a> and we will act the same working day.</p>

    <p class="rd-more"><a class="rd-btn rd-btn--ghost" href="/shop.html">Back to the shop</a></p>
  </div>
</section>
`,
  };
}

/* -------------------------------------------------------------------- 404 */

export function notFound() {
  return {
    file: '404.html',
    path: '/404.html',
    current: '',
    title: 'Page not found',
    description: 'That page does not exist on Rainy Day Table. Here are the places you might have been looking for.',
    body: `
<section class="section rd-404">
  <div class="wrap--narrow">
    <h1>We could not find that page</h1>
    <p class="lede">The address may have been mistyped, or the page may have moved. Nothing is broken
    on your end.</p>
    <ul class="rd-404__links">
      <li><a class="rd-btn rd-btn--mustard" href="/index.html">Home</a></li>
      <li><a class="rd-btn rd-btn--ghost" href="/shop.html">Shop</a></li>
      <li><a class="rd-btn rd-btn--ghost" href="/faq.html">FAQ</a></li>
      <li><a class="rd-btn rd-btn--ghost" href="/contact.html">Contact</a></li>
    </ul>
    <p>If you followed a link from somewhere on this site, please tell us where it was — email
    <a href="mailto:${B.email}">${B.email}</a> or call <a href="${B.phoneHref}">${B.phone}</a> during
    ${esc(B.hours)} — and we will fix it.</p>
  </div>
</section>
`,
  };
}
