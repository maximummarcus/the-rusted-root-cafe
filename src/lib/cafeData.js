// ============================================================
// THE RUSTED ROOT CAFE — central content config
// Owner can update images, prices, hours here easily.
// ============================================================

// DoorDash menu photography (owner-approved, June 2026). Originals live in
// raw-assets/doordash/ (gitignored, like the other photo source archives);
// these are the optimized 800x800 WebP exports. Vite turns each import into
// a hashed asset URL, so IMG values below stay plain strings.
// Note: pimento-blt.webp is optimized alongside these but is NOT imported —
// the menu has no "Pimento BLT" item; awaiting owner confirmation.
import avocadoToastPhoto from '@/assets/menu/avocado-toast.webp';
import plainBiscuitPhoto from '@/assets/menu/plain-biscuit.webp';
import sausageEggCheesePhoto from '@/assets/menu/sec.webp';
import cranberryWalnutSaladPhoto from '@/assets/menu/cranberry-walnut-salad.webp';
import chickenSaladColdplatePhoto from '@/assets/menu/chicken-salad-coldplate.webp';
import chickenBaconCheddarPaniniPhoto from '@/assets/menu/chicken-bacon-cheddar-panini.webp';
import pastaSaladPhoto from '@/assets/menu/pasta-salad.webp';
import nutellaTwistPhoto from '@/assets/menu/nutella-twist.webp';
import cookiePhoto from '@/assets/menu/cookie.webp';
import browniePhoto from '@/assets/menu/brownie.webp';
import glutenFreeMuffinPhoto from '@/assets/menu/gluten-free-muffin.webp';
import honeyWrapPhoto from '@/assets/menu/honey-wrap.webp';
import turkeyBaconRanchPhoto from '@/assets/menu/turkey-bacon-ranch.webp';
import firecrackerPhoto from '@/assets/menu/the-firecracker.webp';
import frenchHenPhoto from '@/assets/menu/the-french-hen.webp';
import skinnyDipperPhoto from '@/assets/menu/skinny-dipper.webp';

export const BRAND = {
  name: 'The Rusted Root Cafe',
  slogan: 'Gather. Grow. Get Rooted!',
  tagline: 'Sit Long ~ Talk Much ~ Laugh Often',
  rootWay: 'The Root Way',
  phone: '(757) 241-0075',
  phoneRaw: '7572410075',
  email: 'therustedrootcafe@gmail.com',
  address: '11409 Windsor Blvd, Unit C, Windsor, VA 23487',
  addressShort: '11409 Windsor Blvd, Unit C',
  cityState: 'Windsor, VA 23487',
  instagram: 'https://www.instagram.com/the_rustedrootcafe/',
  instagramHandle: '@the_rustedrootcafe',
  facebook: 'https://www.facebook.com/p/The-Rusted-Root-100093432030913/',
  geo: { lat: 36.8068, lng: -76.7441 },
};

// ===== ONLINE ORDERING LINKS — single source of truth =====
// Hosted ordering pages (Clover pickup + DoorDash delivery). Always open these
// in a new tab — never embed them in an iframe; both hosts block framing via
// X-Frame-Options.
export const CLOVER_ORDER_URL = 'https://the-rusted-root-cafe-llc-windsor.cloveronline.com/menu/all';
export const DOORDASH_ORDER_URL = 'https://www.doordash.com/store/the-rusted-root-cafe-windsor-36908799/';

// The Rusted Root Cafe logo (round sunflower badge).
export const LOGO_URL = '/logo.jpeg';

// Brand wordmark — cream retro serif on a transparent background. Used as the
// brand mark in the header and footer; works on both light and dark surfaces.
// The ?v=2 query busts browser + social caches: the art was replaced in place
// (same filename) with the new "The Rusted Root Cafe" mark, so bump this again
// if the file is ever re-exported.
export const WORDMARK_URL = '/wordmark.png?v=2';

// Business hours — confirmed by the owner June 2026. Open Mon to Sat 8 to 4,
// staying open late on Wednesdays until 6 PM; closed Sunday. (The 8 to 6 hours
// listed on social profiles are wrong — do not trust them.) These lines render
// verbatim on the Contact page, the Home "Hours & Location" panel, and the
// footer, so keep the copy in hyphens only (no en/em dashes). The machine-
// readable openingHours for SEO live in LocalBusinessSchema.jsx — keep in sync.
export const HOURS = [
  'Mon-Sat: 8 AM - 4 PM',
  'Open late Wednesdays until 6 PM',
  'Sunday: Closed',
];

// IMAGES — real owner photos live at /images/ (and src/assets/menu/ for the
// DoorDash set). Slots without a real photo yet are null: MenuItem renders
// those items as text-only cards (no placeholder tile), and the MostLoved
// strip hides them. All AI-generated images have been removed.
export const IMG = {
  hero: null, // unused
  bakery: '/images/counter-and-sign.jpg',
  cinnamonRollsTray: '/images/cinnamon-rolls-iced-tray.jpg',
  storefront: '/images/storefront-front.jpg',
  catering: '/images/catering-hero-platter.jpg',
  frenchHen: frenchHenPhoto,
  avocadoToast: avocadoToastPhoto,
  breakfastBurrito: '/images/menu-breakfast-burrito-portrait.jpg',
  chickenSaladPlate: chickenSaladColdplatePhoto,
  cranberrySalad: cranberryWalnutSaladPhoto,
  turkeyBaconRanch: turkeyBaconRanchPhoto,
  chickenBaconPanini: chickenBaconCheddarPaniniPhoto,
  bagels: '/images/scratch-bagels-tray.jpg',
  cinnamonRoll: '/images/cinnamon-roll-single.jpg',
  almondCroissant: '/images/croissants-tray.jpg',
  specialtyDrink: '/images/specialty-drink.jpg',
  limeade: null,
  lemonadeMenu: '/images/lemonade-menu.png',
  // Round 2 — owner-supplied photos. See VERIFY-WITH-OWNER notes at usage sites.
  bec: '/images/breakfast-bec.jpg',
  everythingHen: '/images/sandwich-everything-hen.jpg',
  hamSwissMelt: '/images/panini-ham-swiss.jpg',
  americano: '/images/drink-americano-espresso.jpg',
  toastedAlmondMocha: '/images/drink-toasted-almond-mocha.jpg',
  mudslide: '/images/drink-mudslide.jpg',
  // Round 3 — DoorDash menu photography (see imports above).
  plainBiscuit: plainBiscuitPhoto,
  sausageEggCheese: sausageEggCheesePhoto,
  pastaSalad: pastaSaladPhoto,
  nutellaTwist: nutellaTwistPhoto,
  cookie: cookiePhoto,
  brownie: browniePhoto,
  glutenFreeMuffin: glutenFreeMuffinPhoto,
  honeyWrap: honeyWrapPhoto,
  firecracker: firecrackerPhoto,
  skinnyDipper: skinnyDipperPhoto,
};

// MENU — verified full menu, synced from the Google business panel
// ("Provided by DoorDash", pulled 2026-06-09). Categories render in the order
// below. The Specials section (slot 7 on the page) is owner-editable through
// the Base44 Special entity and is injected by Menu.jsx — keep it out of this
// hardcoded array so the owner can rotate specials monthly without a code
// change. Items with `price: null` render with no price (owner sets these in
// Clover later). Items with a tiered `desc` string carry their pricing on
// the description line.
export const MENU = [
  {
    key: 'breakfast',
    name: 'Breakfast',
    items: [
      { name: 'Avocado Toast', price: '$8.99', desc: 'Toasted sourdough, avocado, everything seasoning, crumbled bacon, fried egg', img: IMG.avocadoToast, popular: true },
      { name: 'Avocado Toast with Tomatoes & Balsamic Glaze', price: '$10.00' },
      { name: 'Sunrise BLT', price: '$7.00' },
      { name: 'Avocado Sunrise BLT', price: '$7.50' },
      { name: 'Country Ham Sunrise BLT', price: '$10.00' },
      { name: 'BEC', price: null, desc: 'Bacon, egg, shredded cheddar cheese', img: IMG.bec }, // VERIFY-WITH-OWNER
      // Spelled out (was 'SEC') so the acronym never renders as the item name — owner request, June 2026.
      { name: 'Sausage Egg & Cheese Biscuit', price: null, img: IMG.sausageEggCheese },
      { name: 'HEC', price: null },
      { name: 'Omelet Scramble', price: '$9.50', desc: 'Scrambled eggs, your choice of meat, cheese, tomatoes, onions, mushrooms' },
      { name: 'French Toast Platter w/ Bacon', price: '$9.00' },
      { name: 'French Toast Platter w/ Sausage', price: '$9.50' },
      { name: 'French Toast Sandwich', price: null },
      { name: 'Fried Bologna', price: '$7.00' },
      { name: 'Plain Bagel', price: '$4.00', img: IMG.bagels },
      { name: 'Bagel w/ Cream Cheese', price: '$6.75' },
      { name: 'Plain Biscuit', price: '$2.50', img: IMG.plainBiscuit },
      { name: 'Toasted Croissant', price: '$3.75' },
    ],
  },
  {
    key: 'sandwiches',
    name: 'Sandwiches',
    items: [
      { name: 'BLT', price: '$9.25', desc: 'Bacon, lettuce, tomato, mayo on toasted sourdough' },
      { name: 'Country Ham BLT', price: '$12.25' },
      { name: 'Classic Club', price: '$10.25' },
      { name: 'Turkey Bacon Ranch', price: '$10.99', img: IMG.turkeyBaconRanch, popular: true },
      { name: 'The French Hen', price: '$11.50', img: IMG.frenchHen, popular: true },
      { name: 'Everything Hen', price: '$11.75', img: IMG.everythingHen }, // VERIFY-WITH-OWNER
      { name: 'Wacky Chicken', price: '$11.50' },
      { name: 'The Firecracker', price: '$10.50', img: IMG.firecracker },
      { name: 'Skinny Dipper', price: '$10.25', img: IMG.skinnyDipper },
      { name: 'Italian Sub', price: '$13.50', popular: true },
    ],
  },
  {
    key: 'paninis',
    name: 'Paninis',
    items: [
      { name: 'Cheesy Pig', price: '$10.25', desc: 'Homemade pimento cheese with bacon on sourdough panini' },
      { name: 'Pizza Melt', price: '$12.00' },
      { name: 'Ham & Swiss Melt', price: '$11.00', img: IMG.hamSwissMelt }, // VERIFY-WITH-OWNER — pretzel bun pre-press
      { name: 'Chicken, Bacon, Cheddar Panini', price: '$11.50', img: IMG.chickenBaconPanini },
      { name: 'Chicken Salad Melt', price: '$12.00' },
      { name: '3 Cheese Bacon Melt', price: '$13.00', desc: 'Cheddar, Swiss, pepper jack, bacon on sourdough' },
      { name: 'Chicken Panini', price: '$11.50', desc: 'Sourdough, basil pesto, provolone, tomato, balsamic glaze', popular: true },
    ],
  },
  {
    key: 'wraps',
    name: 'Wraps',
    items: [
      { name: 'Honey Wrap', price: '$8.50', img: IMG.honeyWrap },
      { name: 'Club Wrap', price: '$9.25' },
    ],
  },
  {
    key: 'salads',
    name: 'Salads',
    items: [
      { name: 'Chicken Salad Coldplate', price: '$12.25', img: IMG.chickenSaladPlate, popular: true },
      { name: 'Cranberry Walnut Salad', price: '$13.00', img: IMG.cranberrySalad, imgAlt: 'Cranberry walnut chicken salad', popular: true },
      { name: 'Chef Salad', price: '$13.50' },
    ],
  },
  {
    key: 'sprouts',
    name: 'Sprouts (Kids)',
    items: [
      { name: 'Kids Grilled Cheese', price: '$6.50' },
    ],
  },
  // ── Slot 7: Specials (owner-editable, lives in Base44 Special entity).
  //    Rendered by Menu.jsx between 'sprouts' and 'grab-n-go'. Not hardcoded here.
  {
    key: 'grab-n-go',
    name: 'Grab N Go',
    items: [
      { name: 'Chicken Salad', price: null, desc: 'Half Pint $6.00 · Pint $12.00 · Quart $24.00', img: IMG.chickenSaladPlate },
      { name: 'Pimento Cheese', price: null, desc: 'Half Pint $6.00 · Pint $9.00 · Snack Box $7.50' },
      { name: 'Broccoli Salad', price: null, desc: 'Pint $6.00 · Quart $12.00' },
      { name: 'Pasta Salad', price: null, desc: 'Pint $6.00 · Quart $12.00', img: IMG.pastaSalad },
      { name: 'Banana Pudding Pint', price: '$6.25' },
    ],
  },
  {
    key: 'sides',
    name: 'Sides',
    items: [
      { name: 'Broccoli Salad', price: '$2.75' },
      { name: 'Pasta Salad', price: '$2.75', img: IMG.pastaSalad },
    ],
  },
  {
    key: 'pastries',
    name: 'Pastries & Desserts',
    items: [
      { name: 'Cinnamon Roll', price: '$5.00', img: IMG.cinnamonRoll, popular: true },
      { name: 'Almond Croissant', price: '$4.50', img: IMG.almondCroissant },
      { name: 'Chocolate Croissant', price: '$3.75' },
      { name: 'Nutella Twist', price: '$4.00', img: IMG.nutellaTwist },
      { name: 'Turnover', price: '$4.75' },
      { name: 'Coffee Cake', price: '$4.50' },
      { name: 'Muffin', price: '$4.50' },
      { name: 'Gluten Free Muffin', price: '$5.50', img: IMG.glutenFreeMuffin },
      { name: 'Gluten Free Cake', price: '$5.50' },
      { name: 'Gluten Free Banana Pudding', price: '$7.25' },
      { name: 'Cookie', price: '$2.75', img: IMG.cookie },
      { name: 'Banana Pudding Cookie', price: '$4.50' },
      { name: 'Strawberry Crunch Cookie', price: '$4.50' },
      { name: 'Blondie', price: '$4.00' },
      { name: 'Brownie', price: '$4.00', img: IMG.brownie },
    ],
  },
  {
    key: 'specialty-drinks',
    name: 'Specialty Drinks',
    items: [
      { name: 'Lavender Vanilla Latte', price: null, img: IMG.specialtyDrink },
      { name: 'French Vanilla Latte', price: null },
      { name: 'White Chocolate Raspberry Latte', price: null },
      { name: 'Cinnamon Roll Latte', price: null },
      { name: 'CTC Latte', price: null },
      { name: 'Pecan Praline Latte', price: null },
      { name: 'Toasted Almond Mocha', price: null, img: IMG.toastedAlmondMocha }, // VERIFY-WITH-OWNER — seasonal cup, owner may want a re-shoot
      { name: 'Caramel Macchiato', price: null },
      { name: 'Mudslide', price: null, img: IMG.mudslide }, // VERIFY-WITH-OWNER — seasonal cup, owner may want a re-shoot
      { name: 'Matcha Latte', price: null },
      { name: 'Americano', price: null, img: IMG.americano },
      { name: 'Limeade', price: null },
    ],
    // Homemade Lemonade sub-section — rendered by Menu.jsx below this category.
    lemonade: {
      heading: 'Homemade Lemonade',
      flavors: [
        'Blackberry', 'Strawberry', 'Raspberry', 'Watermelon',
        'Blue Raspberry', 'Pomegranate', 'Guava', 'Passion Fruit',
        'Kiwi', 'Coconut', 'Violet', 'Lavender',
        'Honey', 'Orange', 'Banana', 'Huckleberry',
      ],
      addOns: [
        { name: 'Popping Boba Pearls', price: '$1', detail: 'Strawberry, Mango, Passion Fruit, Kiwi, Blueberry, Pomegranate' },
        { name: 'Glitter', price: '$0.50' },
      ],
    },
  },
  {
    key: 'drinks',
    name: 'Drinks',
    items: [
      { name: 'Sweet Tea', price: '$2.99' },
      { name: 'Orange Juice', price: '$2.00' },
      { name: 'Apple Juice', price: '$3.50' },
      { name: 'Soda Can', price: '$1.50' },
      { name: 'Bottle Water', price: '$1.00' },
      { name: 'Juice Box', price: '$1.00' },
    ],
  },
];

// Most Loved strip on Home. Keep photographed items first: the homepage strip
// only shows items with a real photo, so null-img items below stay hidden there
// (but keep them listed — they reappear automatically once their photo lands).
export const MOST_LOVED = [
  { name: 'The French Hen', price: '$11.50', img: IMG.frenchHen },
  { name: 'Chicken Salad Coldplate', price: '$12.25', img: IMG.chickenSaladPlate },
  { name: 'Fresh-Baked Cinnamon Rolls', price: null, img: IMG.cinnamonRoll },
  { name: 'Cranberry Walnut Salad', price: '$13.00', img: IMG.cranberrySalad },
  { name: 'Avocado Toast', price: '$8.99', img: IMG.avocadoToast },
  { name: 'Turkey Bacon Ranch', price: '$10.99', img: IMG.turkeyBaconRanch },
];

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Order', to: '/order' },
  { label: 'Catering', to: '/catering' },
  { label: 'Specials', to: '/specials' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];