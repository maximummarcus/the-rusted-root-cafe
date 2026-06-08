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

// Logo placeholder — owner will swap with real logo file.
export const LOGO_URL = 'https://media.base44.com/images/public/6a2713e14b51b44712b64612/c4103ed5b_generated_e6f85744.png';

export const HOURS = [
  { day: 'Monday', time: '8:00am – 4:00pm' },
  { day: 'Tuesday', time: '8:00am – 4:00pm' },
  { day: 'Wednesday', time: '8:00am – 6:00pm' },
  { day: 'Thursday', time: '8:00am – 4:00pm' },
  { day: 'Friday', time: '8:00am – 4:00pm' },
  { day: 'Saturday', time: '8:00am – 4:00pm' },
  { day: 'Sunday', time: 'Closed' },
];

// PLACEHOLDER IMAGES — owner will replace with real photos.
export const IMG = {
  hero: 'https://media.base44.com/images/public/6a2713e14b51b44712b64612/0f3635004_generated_1cca7114.png',
  bakery: 'https://media.base44.com/images/public/6a2713e14b51b44712b64612/9291911fe_generated_6ace2e11.png',
  plants: 'https://media.base44.com/images/public/6a2713e14b51b44712b64612/dc5e3e5ab_generated_c55c41fe.png',
  storefront: 'https://media.base44.com/images/public/6a2713e14b51b44712b64612/1ece937a5_generated_a3174eba.png',
  catering: 'https://media.base44.com/images/public/6a2713e14b51b44712b64612/4ed7e87f0_generated_f25ca0d0.png',
  frenchHen: 'https://media.base44.com/images/public/6a2713e14b51b44712b64612/9a150250d_generated_f6ac6fb8.png',
  avocadoToast: 'https://media.base44.com/images/public/6a2713e14b51b44712b64612/ab9c04998_generated_d17e1755.png',
  chickenSaladPlate: 'https://media.base44.com/images/public/6a2713e14b51b44712b64612/22bb4a809_generated_4b4ec53d.png',
  cranberrySalad: 'https://media.base44.com/images/public/6a2713e14b51b44712b64612/f1c0583c9_generated_c2337e98.png',
  turkeyBaconRanch: 'https://media.base44.com/images/public/6a2713e14b51b44712b64612/7ed05ee47_generated_4aef1743.png',
  chickenBaconPanini: 'https://media.base44.com/images/public/6a2713e14b51b44712b64612/1f33610bf_generated_a9d93307.png',
  bagels: 'https://media.base44.com/images/public/6a2713e14b51b44712b64612/e3b3e756b_generated_7e8fa615.png',
  cinnamonRoll: 'https://media.base44.com/images/public/6a2713e14b51b44712b64612/217a06dcf_generated_4f33ac10.png',
  almondCroissant: 'https://media.base44.com/images/public/6a2713e14b51b44712b64612/275a4d8a6_generated_5ab3be36.png',
  specialtyDrink: 'https://media.base44.com/images/public/6a2713e14b51b44712b64612/68b85ab84_generated_398239da.png',
  limeade: 'https://media.base44.com/images/public/6a2713e14b51b44712b64612/4154b76ee_generated_c45279e3.png',
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