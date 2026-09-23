/**
 * SINGLE SOURCE OF TRUTH — Rainy Day Table
 *
 * SAMPLE DATA — replace with real, verifiable business details before launching
 * or running ads. See ../../BUSINESS_INFO.md for the full list and launch blockers.
 *
 * All 26 generated pages interpolate from this file. Nothing here is retyped:
 * change a value, re-run `node _generator/build.mjs`, and the whole site updates.
 */

export const business = {
  brandName: 'Rainy Day Table',
  shortName: 'Rainy Day Table',
  legalName: 'Rainy Day Table Goods LLC',
  tagline: 'Something to do at the kitchen table when the weather says no',
  descriptor: 'Puzzles, games and hobbies',

  address: {
    line1: '3090 Linden Market Street, Suite 4',
    city: 'Madison',
    state: 'WI',
    zip: '53703',
    country: 'United States',
  },
  addressOneLine: '3090 Linden Market Street, Suite 4, Madison, WI 53703',

  email: 'help@rainydaytable.com',
  phone: '(608) 555-0118',
  phoneHref: 'tel:+16085550118',
  hours: 'Mon–Fri, 10:00 AM–6:00 PM ET',
  responseTime: 'We answer email within one business day.',

  effectiveDate: 'September 8, 2026',
  governingState: 'Wisconsin',
  governingVenue: 'Dane County, Wisconsin',
  siteUrl: 'https://www.rainydaytable.com',
};

export const terms = {
  returnWindow: '30 days',
  returnWindowDays: 30,
  freeShippingOver: '$49',
  standardShipping: '$5.95',
  processing: '1–2 business days',
  standardDelivery: '3–6 business days',
  expeditedPrice: '$12.95',
  expeditedDelivery: '2–3 business days',
  carriers: 'USPS and UPS',
  inspectionTime: '2 business days',
  refundTime: '5–10 business days',
  currencySymbol: '$',
};

export const shippingMethods = [
  {
    id: 'standard',
    label: 'Standard shipping',
    price: 5.95,
    priceLabel: terms.standardShipping,
    estimate: terms.standardDelivery,
    note: `Free on orders over ${terms.freeShippingOver}.`,
  },
  {
    id: 'expedited',
    label: 'Expedited shipping',
    price: 12.95,
    priceLabel: terms.expeditedPrice,
    estimate: terms.expeditedDelivery,
    note: 'Flat rate on every order.',
  },
];

export const freeShippingThreshold = 49;

export const shippingSummary =
  `We ship your order within ${terms.processing} of receiving it. ` +
  `Standard shipping is ${terms.standardShipping}, free on orders over ${terms.freeShippingOver}, ` +
  `and arrives in ${terms.standardDelivery} after it ships.`;

export const returnSummary =
  `Return anything unused in its original packaging within ${terms.returnWindow} of delivery. ` +
  `We refund to your original payment method within ${terms.refundTime} of inspecting the return.`;

export const policyDetail = {
  excludedDestinations: [
    'Outside the United States.',
    'To APO, FPO or DPO military addresses.',
    'To US territories including Puerto Rico, Guam and the US Virgin Islands.',
    'Everything we sell fits a PO Box except the puzzle board with drawers, which needs a street address.',
  ],
  nonReturnable: [
    {
      title: 'Puzzles and card decks with the seal broken',
      detail:
        'because a jigsaw cannot be resold once the bag has been opened and we have no way to know a piece has not gone under the table. Check the box and the picture before you break the seal.',
    },
    {
      title: 'Puzzle books that have been written in',
      detail:
        'even in pencil. Flicking through one is fine; a completed crossword is not.',
    },
    {
      title: 'Yarn from the knitting kit once it has been wound',
      detail:
        'since a wound ball cannot go back into stock. The needles, pattern and case can all come back.',
    },
  ],
  cartKey: 'rainy-day-table-cart',
  cookieKey: 'rainy-day-table-cookie',
};
