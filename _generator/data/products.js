/**
 * Product catalogue — Rainy Day Table.
 *
 * The price here is the price charged. Copy describes piece count, piece size,
 * print size, board dimensions and materials — never a claim about memory, brain
 * training or cognitive benefit. A large-print crossword book is a book with big
 * type, and that is exactly how it is sold. See POLICY_RESEARCH.md rules B14, B15.
 */

export const categories = [
  {
    id: 'jigsaws',
    name: 'Jigsaws',
    blurb: 'Big pieces, matte finish, and a picture worth looking at for a week.',
    image: 'cat-jigsaw.webp',
    alt: 'A partly finished jigsaw puzzle spread across a table.',
  },
  {
    id: 'pencil-and-paper',
    name: 'Pencil & Paper',
    blurb: 'Crosswords and word searches printed at a size you can actually read.',
    image: 'cat-paper.webp',
    alt: 'An open puzzle book and a pencil on a table.',
  },
  {
    id: 'table-games',
    name: 'Table Games',
    blurb: 'Cards, dominoes, cribbage and bingo for two people or eleven.',
    image: 'cat-games.webp',
    alt: 'Playing cards and dominoes laid out on a table.',
  },
  {
    id: 'making-things',
    name: 'Making Things',
    blurb: 'Kits and kit for the hands, with instructions that assume nothing.',
    image: 'cat-making.webp',
    alt: 'Knitting needles and balls of yarn in a basket.',
  },
];

export const products = [
  {
    sku: 'RDT-301',
    slug: 'harbour-morning-300-piece-large-jigsaw',
    name: 'Harbour Morning 300-Piece Large Jigsaw',
    price: 26.0,
    category: 'jigsaws',
    image: 'rdt-301.webp',
    alt: 'A jigsaw puzzle of a harbour scene partly assembled.',
    summary: 'Three hundred pieces at nearly two inches each, on a matte board that does not glare.',
    description:
      'A harbour at low tide, painted rather than photographed, so the colours separate into areas ' +
      'you can work with instead of a thousand shades of blue. The pieces are 1.9 inches across — ' +
      'about four times the area of a standard jigsaw piece — cut on a random grid so no two are ' +
      'quite alike. The board is 2 mm greyboard with a matte laminate.',
    features: [
      '300 pieces, each about 1.9 in across',
      'Finished size 26 × 18 in',
      'Matte laminate — no glare under a lamp',
      '2 mm greyboard; pieces hold together when lifted',
      'Random-cut, so no two pieces are interchangeable',
      'Full-size poster of the image included',
    ],
    specs: {
      'Pieces': '300',
      'Piece size': 'About 1.9 in (48 mm) across',
      'Finished size': '26 × 18 in (66 × 46 cm)',
      'Box size': '10 × 8 × 2.4 in',
      'Board': '2 mm greyboard, matte laminate',
      'Weight': '1.6 lb (726 g)',
      'Artwork': 'Painted harbour scene; reference poster included',
    },
    inBox: ['300-piece jigsaw in a sealed bag', 'Full-size reference poster', 'Sturdy lift-off box'],
  },
  {
    sku: 'RDT-302',
    slug: 'orchard-lane-500-piece-large-jigsaw',
    name: 'Orchard Lane 500-Piece Large Jigsaw',
    price: 29.0,
    category: 'jigsaws',
    image: 'rdt-302.webp',
    alt: 'A jigsaw puzzle showing an orchard scene with trees and blossom.',
    summary: 'Five hundred pieces, still oversized, on a board that finishes at nearly three feet.',
    description:
      'The same oversized cut as the 300-piece, with two hundred more pieces and a wider picture. ' +
      'An orchard in blossom gives you distinct bands to sort by — sky, blossom, trunks, grass — ' +
      'so it does not become an exercise in matching greens. Finished, it is 34 × 22 inches, which ' +
      'fits a standard dining table with room for a cup.',
    features: [
      '500 pieces, each about 1.6 in across',
      'Finished size 34 × 22 in',
      'Matte laminate — no glare under a lamp',
      'Distinct colour bands make sorting straightforward',
      '2 mm greyboard; pieces hold together when lifted',
      'Full-size poster of the image included',
    ],
    specs: {
      'Pieces': '500',
      'Piece size': 'About 1.6 in (40 mm) across',
      'Finished size': '34 × 22 in (86 × 56 cm)',
      'Box size': '12 × 9 × 2.4 in',
      'Board': '2 mm greyboard, matte laminate',
      'Weight': '2.1 lb (953 g)',
      'Artwork': 'Painted orchard scene; reference poster included',
    },
    inBox: ['500-piece jigsaw in a sealed bag', 'Full-size reference poster', 'Sturdy lift-off box'],
  },
  {
    sku: 'RDT-303',
    slug: 'large-print-crossword-book-120-puzzles',
    name: 'Large-Print Crossword Book, 120 Puzzles',
    price: 14.0,
    category: 'pencil-and-paper',
    image: 'rdt-303.webp',
    alt: 'An open crossword book printed in large type with a pencil beside it.',
    summary: 'Clues set in 18 pt, grids with half-inch squares, and one puzzle per spread.',
    description:
      'Most &ldquo;large print&rdquo; puzzle books enlarge the grid and leave the clues at 9 pt. ' +
      'This one sets the clues at 18 pt and gives each puzzle a full spread, so there is nothing ' +
      'crammed into a margin. The squares are half an inch, which takes a normal pencil without ' +
      'you having to write small, and the paper is uncoated so it does not shine.',
    features: [
      '120 puzzles, one per spread',
      'Clues set in 18 pt type',
      'Half-inch grid squares',
      'Uncoated 90 gsm paper — takes pencil and pen without showing through',
      'Answers in the back, also in large type',
      'Lies flat when opened',
    ],
    specs: {
      'Puzzles': '120',
      'Page size': '8.5 × 11 in (216 × 279 mm)',
      'Clue type size': '18 pt',
      'Grid square size': '0.5 in (12.7 mm)',
      'Pages': '272',
      'Binding': 'Perfect bound, lies flat',
      'Paper': '90 gsm uncoated',
    },
    inBox: ['Crossword book', 'Two HB pencils'],
  },
  {
    sku: 'RDT-304',
    slug: 'large-print-word-search-book-150-puzzles',
    name: 'Large-Print Word Search Book, 150 Puzzles',
    price: 13.0,
    category: 'pencil-and-paper',
    image: 'rdt-304.webp',
    alt: 'An open word search book with a large grid of letters.',
    summary: 'Letters at 20 pt in a 15 × 15 grid, with the word list on the same page.',
    description:
      'Fifteen by fifteen, letters at 20 pt, and the list of words printed on the same page rather ' +
      'than overleaf — so you are not flipping back and forth. A hundred and fifty puzzles grouped ' +
      'by theme, and the answer grids in the back are printed at the same size as the puzzles, ' +
      'which is not a given.',
    features: [
      '150 puzzles grouped by theme',
      'Letters set at 20 pt in a 15 × 15 grid',
      'Word list on the same page as the grid',
      'Answers printed at full size, not shrunk',
      'Uncoated paper — no glare, takes a pen',
      'Lies flat when opened',
    ],
    specs: {
      'Puzzles': '150',
      'Page size': '8.5 × 11 in (216 × 279 mm)',
      'Letter type size': '20 pt',
      'Grid': '15 × 15',
      'Pages': '320',
      'Binding': 'Perfect bound, lies flat',
      'Paper': '90 gsm uncoated',
    },
    inBox: ['Word search book', 'Two HB pencils'],
  },
  {
    sku: 'RDT-305',
    slug: 'bigface-playing-cards-2-decks',
    name: 'Bigface Playing Cards, 2 Decks',
    price: 12.0,
    category: 'table-games',
    image: 'rdt-305.webp',
    alt: 'Playing cards fanned out showing very large corner index numbers.',
    summary: 'Standard-size cards with corner indices an inch and a quarter tall.',
    description:
      'The cards are the normal poker size, so they shuffle and deal the way you expect, but the ' +
      'corner index is 1.25 inches tall instead of the usual half inch. That means you can read a ' +
      'hand held in the normal fan. Plastic-coated so they last, and two decks with different back ' +
      'colours so a mixed pack can be sorted out.',
    features: [
      'Standard poker size — 2.5 × 3.5 in',
      'Corner index 1.25 in tall',
      'Two decks, blue and red backs',
      'Plastic-coated linen finish; wipes clean',
      'Jumbo index on all four corners',
      'Two jokers and a rules card per deck',
    ],
    specs: {
      'Cards': '2 decks of 52 plus 4 jokers',
      'Card size': '2.5 × 3.5 in (63 × 88 mm), standard poker',
      'Index height': '1.25 in (32 mm)',
      'Finish': 'Plastic-coated linen',
      'Weight': '7.4 oz (210 g) for both decks',
      'Boxes': 'Tuck boxes, one blue one red',
    },
    inBox: ['Two decks of cards', 'Two tuck boxes', 'Rules card'],
  },
  {
    sku: 'RDT-306',
    slug: 'heavyweight-double-six-dominoes-set',
    name: 'Heavyweight Double-Six Dominoes Set',
    price: 34.0,
    category: 'table-games',
    image: 'rdt-306.webp',
    alt: 'A set of dominoes with large pips laid out on a table.',
    summary: 'Twenty-eight tiles at two inches, weighted so they stand up on their own.',
    description:
      'Two-inch tiles in weighted resin — about twice the mass of a cheap set — so they stand on ' +
      'edge without being propped and do not skitter when the table is knocked. The pips are ' +
      'recessed and colour-coded by number, which makes a line of play readable from across the ' +
      'table. They come in a wooden box with a sliding lid.',
    features: [
      '28 tiles, double-six set',
      '2 × 1 in tiles, 0.4 in thick',
      'Weighted resin — tiles stand on edge unaided',
      'Recessed pips, colour-coded by number',
      'Wooden storage box with a sliding lid',
      'Rules for five games included',
    ],
    specs: {
      'Tiles': '28 (double-six)',
      'Tile size': '2 × 1 × 0.4 in (51 × 25 × 10 mm)',
      'Tile weight': '0.9 oz (26 g) each',
      'Set weight': '2.6 lb (1.2 kg) with box',
      'Box': 'Rubberwood, 8.5 × 3 × 2 in, sliding lid',
      'Materials': 'Weighted resin tiles, rubberwood box',
    },
    inBox: ['28 dominoes', 'Wooden box with sliding lid', 'Rules booklet for five games'],
  },
  {
    sku: 'RDT-307',
    slug: 'maple-three-track-cribbage-board',
    name: 'Maple Three-Track Cribbage Board',
    price: 46.0,
    category: 'table-games',
    image: 'rdt-307.webp',
    alt: 'A wooden cribbage board with three tracks and metal pegs.',
    summary: 'Solid maple, three tracks, oversized holes and pegs that do not get lost.',
    description:
      'A solid maple board with three continuous tracks, drilled at 4 mm rather than the usual ' +
      '2.5 mm so a peg goes in without hunting for the hole. The pegs are turned brass with a ' +
      'wide head, and there are nine of them — six to play and three spares — in a covered well ' +
      'under the board. Every fifth hole is grouped, so counting is by eye.',
    features: [
      'Solid maple, three continuous tracks',
      '4 mm holes — easier to find than a standard board',
      'Turned brass pegs with wide heads, 9 supplied',
      'Covered peg well underneath',
      'Holes grouped in fives for counting at a glance',
      'Felt feet; does not mark a table',
    ],
    specs: {
      'Size': '15 × 4.5 × 0.9 in (38 × 11 × 2.3 cm)',
      'Tracks': '3, 121 holes each',
      'Hole diameter': '4 mm',
      'Pegs': '9 turned brass',
      'Weight': '1.4 lb (635 g)',
      'Materials': 'Solid maple with a hard-wax oil finish, brass pegs',
    },
    inBox: ['Cribbage board', 'Nine brass pegs in the storage well', 'Scoring guide'],
  },
  {
    sku: 'RDT-308',
    slug: 'rollaway-puzzle-mat-46x26-inch',
    name: 'Rollaway Puzzle Mat, 46 × 26 inch',
    price: 32.0,
    category: 'jigsaws',
    image: 'rdt-308.webp',
    alt: 'A felt puzzle mat rolled around a tube with straps.',
    summary: 'Roll an unfinished puzzle away for dinner and unroll it exactly as you left it.',
    description:
      'A 46 × 26 inch felt mat with an inflatable tube and three straps. Lay the puzzle on the ' +
      'felt, roll it onto the tube, buckle the straps and stand it in a corner; unroll it and the ' +
      'pieces are where you left them. It takes a finished puzzle up to 1500 standard pieces, or ' +
      'either of our large-piece jigsaws with room to spare.',
    features: [
      '46 × 26 in felt mat',
      'Takes up to 1500 standard pieces',
      'Inflatable tube and three buckled straps',
      'Felt grips the pieces; the mat does not slide on a table',
      'Rolls to 28 in long and 4 in across',
      'Both of our jigsaws fit with room around them',
    ],
    specs: {
      'Mat size': '46 × 26 in (117 × 66 cm)',
      'Capacity': 'Up to 1500 standard pieces',
      'Rolled size': '28 × 4 in (71 × 10 cm)',
      'Weight': '1.8 lb (816 g)',
      'Materials': 'Needle-punched felt, PVC tube, polypropylene straps',
      'Care': 'Wipe with a damp cloth; do not machine wash',
    },
    inBox: ['Felt puzzle mat', 'Inflatable tube', 'Three straps', 'Storage sleeve'],
  },
  {
    sku: 'RDT-309',
    slug: 'first-rows-knitting-starter-kit',
    name: 'First Rows Knitting Starter Kit',
    price: 39.0,
    category: 'making-things',
    image: 'rdt-309.webp',
    alt: 'Knitting needles, yarn and a pattern book in a fabric case.',
    summary: 'Everything for a first scarf, with a pattern written for somebody who has never knitted.',
    description:
      'Two pairs of bamboo needles, three balls of chunky merino blend, a row counter, a darning ' +
      'needle and a spiral-bound pattern book that starts with how to hold the needles. The ' +
      'pattern is photographed step by step at 1:1 scale rather than illustrated, and the whole ' +
      'kit rolls into a cotton case with a tie.',
    features: [
      'Two pairs of bamboo needles, 6 mm and 8 mm',
      'Three 100 g balls of chunky merino blend',
      'Spiral-bound pattern book, photographed step by step at full size',
      'Row counter and darning needle',
      'Cotton roll-up case with a tie',
      'Enough yarn for one scarf, about 60 in finished',
    ],
    specs: {
      'Needles': 'Bamboo, 6 mm and 8 mm, 14 in long',
      'Yarn': '3 × 100 g, 70% merino 30% acrylic, chunky weight',
      'Yardage': 'About 330 yd total',
      'Pattern book': '48 pages, spiral bound, 14 pt type',
      'Case': 'Cotton canvas, 16 × 9 in rolled',
      'Kit weight': '1.5 lb (680 g)',
    },
    inBox: ['Two pairs of needles', 'Three balls of yarn', 'Pattern book', 'Row counter', 'Darning needle', 'Cotton case'],
  },
  {
    sku: 'RDT-310',
    slug: 'tabletop-puzzle-board-with-drawers',
    name: 'Tabletop Puzzle Board with Drawers',
    price: 79.0,
    category: 'jigsaws',
    image: 'rdt-310.webp',
    alt: 'A wooden puzzle board with sorting drawers pulled out underneath.',
    summary: 'A board with four drawers underneath, so the table can still be used for dinner.',
    description:
      'A 34 × 26 inch board with a raised lip and four sorting drawers in the base. The working ' +
      'surface is a soft grey felt that holds the pieces still, and the drawers pull out on all ' +
      'four sides so two people can sort from opposite ends. It weighs 11 pounds, which is enough ' +
      'to stay put and light enough to lift onto a shelf.',
    features: [
      '34 × 26 in felt working surface with a raised lip',
      'Four sorting drawers, one on each side',
      'Takes a finished puzzle up to 1000 standard pieces',
      'Felt surface stops pieces sliding',
      '11 lb — stays put, still liftable',
      'Arrives assembled',
    ],
    specs: {
      'Board size': '34 × 26 in (86 × 66 cm)',
      'Overall height': '3.1 in (8 cm) with drawers closed',
      'Drawers': '4, each 15 × 10 × 1.6 in',
      'Capacity': 'Up to 1000 standard pieces',
      'Weight': '11 lb (5 kg)',
      'Materials': 'Birch ply with a felt working surface',
      'Assembly': 'None — arrives assembled',
    },
    inBox: ['Puzzle board with four drawers', 'Care card'],
  },
  {
    sku: 'RDT-311',
    slug: 'clearview-puzzle-sorting-trays-set-of-6',
    name: 'Clearview Puzzle Sorting Trays, Set of 6',
    price: 24.0,
    category: 'jigsaws',
    image: 'rdt-311.webp',
    alt: 'Six shallow stacking trays holding sorted puzzle pieces.',
    summary: 'Six shallow trays that stack when full and nest when empty.',
    description:
      'Shallow enough that the pieces lie in one layer and you can see every one — 0.9 inches ' +
      'deep, not the usual three — with a lip that lets them stack while loaded. Empty, they nest ' +
      'into the height of one and a half trays. Two are twice the width of the others for edge ' +
      'pieces, which are always the awkward ones.',
    features: [
      'Six trays: four standard, two double-width for edges',
      '0.9 in deep — pieces lie in one visible layer',
      'Stack when loaded, nest when empty',
      'Matte interior, so pieces do not slide when tilted',
      'Fits alongside the puzzle board or on a table',
      'Dishwasher safe on the top rack',
    ],
    specs: {
      'Standard tray': '9 × 6 × 0.9 in, four supplied',
      'Wide tray': '9 × 12 × 0.9 in, two supplied',
      'Nested height': '1.4 in (36 mm) for all six',
      'Weight': '1.7 lb (771 g) for the set',
      'Materials': 'Matte polypropylene',
      'Care': 'Dishwasher safe, top rack',
    },
    inBox: ['Four standard trays', 'Two wide trays'],
  },
  {
    sku: 'RDT-312',
    slug: 'big-number-bingo-set-12-cards',
    name: 'Big-Number Bingo Set, 12 Cards',
    price: 28.0,
    category: 'table-games',
    image: 'rdt-312.webp',
    alt: 'Bingo cards with large printed numbers and a set of coloured markers.',
    summary: 'Numbers at 48 pt, sliding shutter cards, and a cage instead of an app.',
    description:
      'Twelve shutter cards — the kind where you slide a red window over a number rather than ' +
      'hunting for a counter — printed at 48 pt. The cage is brass-handled and turns smoothly, ' +
      'and the master board has a well for each called ball so nobody has to remember. Everything ' +
      'lives in one box with a carry handle.',
    features: [
      '12 shutter cards, numbers at 48 pt',
      'Sliding red windows — no loose counters to drop',
      'Brass-handled cage with 75 wooden balls',
      'Master board with a well for every called number',
      'One box with a carry handle',
      'Enough for twelve players',
    ],
    specs: {
      'Cards': '12 shutter cards, 7 × 4 in each',
      'Number type size': '48 pt',
      'Balls': '75, wooden, 0.6 in',
      'Cage': '7 in diameter, brass handle',
      'Master board': '12 × 9 in with 75 wells',
      'Set weight': '4.2 lb (1.9 kg)',
      'Box': '13 × 10 × 8 in with a carry handle',
    },
    inBox: ['Twelve shutter cards', 'Cage and 75 balls', 'Master board', 'Rules card', 'Storage box'],
  },
];

export const featuredSkus = ['RDT-301', 'RDT-303', 'RDT-306', 'RDT-310'];
