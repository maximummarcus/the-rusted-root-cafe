// ============================================================
// THE RUSTED ROOT CAFE — central content config
// Owner can update images, prices, hours here easily.
// ============================================================

export const BRAND = {
  name: 'The Rusted Root café',
  slogan: 'Gather. Grow. Get Rooted!',
  tagline: 'Sit Long ~ Talk Much ~ Laugh Often',
  rootWay: 'The Root Way',
  phone: '(757) 241-0075',
  phoneRaw: '7572410075',
  email: 'therustedrootcafe@gmail.com',
  address: '11409 Windsor Blvd, Unit C, Windsor, VA 23487',
  addressShort: '11409 Windsor Blvd, Unit C',
  cityState: 'Windsor, VA 23487',
  instagram: 'https://instagram.com/the_rustedrootcafe',
  instagramHandle: '@the_rustedrootcafe',
  facebook: 'https://facebook.com/',
  geo: { lat: 36.8068, lng: -76.7441 },
};

// Owner: paste your Clover Online Ordering URL here.
export const CLOVER_ORDER_URL = '';

// The Rusted Root café logo.
export const LOGO_URL = '/logo.jpeg';

export const HOURS = [
  { day: 'Monday', time: '8:00am – 4:00pm' },
  { day: 'Tuesday', time: '8:00am – 4:00pm' },
  { day: 'Wednesday', time: '8:00am – 6:00pm' },
  { day: 'Thursday', time: '8:00am – 4:00pm' },
  { day: 'Friday', time: '8:00am – 4:00pm' },
  { day: 'Saturday', time: '8:00am – 4:00pm' },
  { day: 'Sunday', time: 'Closed' },
];

// IMAGES — real owner photos live at /images/. Slots without a real photo
// yet are null, which renders an "Image coming soon" placeholder tile (see
// MostLoved + MenuItem). All AI-generated images have been removed.
export const IMG = {
  hero: null, // unused
  bakery: '/images/counter-and-sign.jpg',
  plants: '/images/plant-decor-display.jpg',
  storefront: '/images/storefront-front.jpg',
  catering: '/images/buffet-setup.jpg',
  frenchHen: '/images/caprese-panini.jpg',
  avocadoToast: null,
  chickenSaladPlate: '/images/chicken-salad-bagel.jpg',
  cranberrySalad: null,
  turkeyBaconRanch: null,
  chickenBaconPanini: null,
  bagels: '/images/scratch-bagels-tray.jpg',
  cinnamonRoll: '/images/cinnamon-roll-single.jpg',
  almondCroissant: '/images/croissants-tray.jpg',
  specialtyDrink: '/images/specialty-drink.jpg',
  limeade: null,
  lemonadeMenu: '/images/lemonade-menu.png',
};

// MENU — confirmed categories in order. Items with confirmed prices are verbatim.
// Categories without confirmed items show an editable empty state.
export const MENU = [
  {
    key: 'breakfast',
    name: 'Breakfast Options',
    items: [
      { name: 'Avocado Toast', price: '$8.99', img: IMG.avocadoToast, popular: false, desc: 'Scratch sourdough, smashed avocado.' },
    ],
    note: 'More breakfast items coming — add from Clover.',
  },
  {
    key: 'paninis',
    name: 'Paninis',
    items: [
      { name: 'The French Hen', price: '$11.50', img: IMG.frenchHen, popular: true },
      { name: 'Chicken, Bacon & Cheddar Panini', price: '$11.50', img: IMG.chickenBaconPanini, popular: true },
    ],
  },
  {
    key: 'sandwiches',
    name: 'Sandwiches',
    items: [
      { name: 'BLT', price: '—', popular: false },
      { name: 'Homemade Chicken Salad', price: '—', img: IMG.chickenSaladPlate, popular: false },
    ],
    note: 'Full sandwich list coming — add from Clover.',
  },
  {
    key: 'wraps',
    name: 'Wraps',
    items: [
      { name: 'Turkey Bacon Ranch', price: '$10.99', img: IMG.turkeyBaconRanch, popular: true },
    ],
    note: 'More wraps coming — add from Clover.',
  },
  {
    key: 'salads',
    name: 'Salads',
    items: [
      { name: 'Cranberry Walnut Salad', price: '$13.00', img: IMG.cranberrySalad, popular: true },
      { name: 'Chicken Salad Coldplate', price: '$12.25', img: IMG.chickenSaladPlate, popular: true },
    ],
  },
  {
    key: 'sprouts',
    name: 'Sprouts Menu',
    items: [],
    note: 'Sprouts (kids) menu coming — add from Clover.',
  },
  {
    key: 'sides',
    name: 'Sides',
    items: [],
    note: 'Sides coming — add from Clover.',
  },
  {
    key: 'specialty-drinks',
    name: 'Specialty Drinks',
    items: [
      { name: 'Seasonal Specialty Latte', price: '—', img: IMG.specialtyDrink, popular: false },
    ],
    note: 'Full specialty drink list coming — add from Clover.',
  },
  {
    key: 'drinks',
    name: 'Drinks',
    items: [],
    note: 'Drinks coming — add from Clover.',
  },
  {
    key: 'limeade',
    name: 'Limeade',
    items: [
      { name: 'House Limeade', price: '—', img: IMG.limeade, popular: false },
    ],
    note: 'Limeade flavors coming — add from Clover.',
  },
  {
    key: 'pastries',
    name: 'Pastries & Desserts',
    items: [
      { name: 'Cinnamon Rolls', price: '—', img: IMG.cinnamonRoll, popular: false },
      { name: 'Almond Croissants', price: '—', img: IMG.almondCroissant, popular: false },
      { name: 'Scratch-Made Bagels', price: '—', img: IMG.bagels, popular: false },
    ],
    note: 'Assorted from-scratch baked goods — add more from Clover.',
  },
  {
    key: 'grab-n-go',
    name: 'Grab N Go',
    items: [
      { name: 'House BBQ Sauce', price: '—', popular: false },
      { name: 'Apple Butter', price: '—', popular: false },
    ],
    note: 'Retail grab-n-go items — add more from Clover.',
  },
];

// Most Loved strip on Home
export const MOST_LOVED = [
  { name: 'The French Hen', price: '$11.50', img: IMG.frenchHen },
  { name: 'Chicken Salad Coldplate', price: '$12.25', img: IMG.chickenSaladPlate },
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