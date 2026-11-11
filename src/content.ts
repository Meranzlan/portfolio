/*
 * content.ts — everything the page says, in one place
 * ====================================================
 * Edit this file to change the portfolio: add a project, a photo or an achievement here and the page lays
 * it out. Images go in public/images/ and are referenced from the site root, e.g. '/images/jakim-touch-1.webp'.
 * Leave `src` empty and the page shows a labelled placeholder in that slot instead.
 */

/** The app's place colours (see tokens.css). Each section, and each project, wears one. */
export type Tint = 'water' | 'move' | 'star' | 'food' | 'looks' | 'you' | 'weight'

export interface Station {
  id: string
  /** Its number on the page, shown small over the section title. */
  code: string
  label: string
  /** The icon in its pebble on the corner dial (an id from SignIcons.vue). */
  icon: string
  tint: Tint
}

export interface Picture {
  /** Path under public/, e.g. '/images/portrait.webp'. Empty shows a placeholder. */
  src: string
  alt: string
}

export interface AppScreen extends Picture {
  device: 'phone' | 'browser'
}

export interface Fact {
  label: string
  value: string
}

export interface Project {
  id: string
  /** Two or three letters, shown in the project's pebble badge. */
  code: string
  tint: Tint
  name: string
  summary: string
  /** The label grid every project carries, like the info panel on a platform. */
  facts: Fact[]
  highlights: string[]
  stack: string[]
  screens: AppScreen[]
  /** An optional wide picture under the screens, such as a sheet of in-app art. */
  banner?: Picture
  link?: { label: string; href: string }
  /** 'feature' gets a full-width panel, 'compact' shares a row. */
  size: 'feature' | 'compact'
}

export interface Stop {
  place: string
  title: string
  where: string
  when: string
  notes: string[]
  /** Where you are now: drawn as the lit stone on the trail. */
  current?: boolean
}

export interface SkillLine {
  name: string
  items: string[]
}

/** Photos without a `src` are hidden on the live site and shown as placeholders while you run `npm run dev`. */
export interface Photo extends Picture {
  caption: string
  shape: 'landscape' | 'portrait' | 'square'
}

/** The sections, in page order. The corner dial shows one place per section. */
export const stations: Station[] = [
  { id: 'start', code: '01', label: 'Start', icon: 'home', tint: 'you' },
  { id: 'apps', code: '02', label: 'Apps', icon: 'device', tint: 'food' },
  { id: 'experience', code: '03', label: 'Experience', icon: 'briefcase', tint: 'move' },
  { id: 'skills', code: '04', label: 'Skills', icon: 'code', tint: 'looks' },
  { id: 'highlights', code: '05', label: 'Highlights', icon: 'award', tint: 'star' },
  { id: 'contact', code: '06', label: 'Contact', icon: 'mail', tint: 'water' },
]

export const profile = {
  name: 'Imran Azlan',
  fullName: 'Muhammad Imran Bin Nor Azlan Shah',
  role: 'Mobile developer, Flutter',
  location: 'Putrajaya, Malaysia',
  pitch:
    'I build Flutter apps for government clients, down to the native edges: home-screen widgets, Huawei support, background sync and national digital-ID login.',
  email: 'imranazlan06@gmail.com',
  phoneDisplay: '+60 19-840 0711',
  whatsapp: 'https://wa.me/60198400711',
  linkedin: 'https://www.linkedin.com/in/imranazlan',
  github: 'https://github.com/Meranzlan',
  cv: '/cv/Imran-Azlan-Resume.pdf',
  /*
   * The portrait sits inside the big wavy ring at the top of the page. Any photo works: it is cropped to a pebble.
   */
  portrait: { src: '', alt: 'Imran Azlan' },
}

export const projects: Project[] = [
  {
    id: 'jakim-touch',
    code: 'JT',
    tint: 'water',
    name: 'JAKIM Touch',
    summary:
      'The official JAKIM app, rebuilt from the ground up in Flutter for iOS, Android and Huawei phones.',
    facts: [
      { label: 'Client', value: 'JAKIM' },
      { label: 'Built at', value: 'Zen Computer Systems' },
      { label: 'Platforms', value: 'iOS, Android, Huawei' },
      { label: 'Status', value: 'In service' },
    ],
    highlights: [
      'Home-screen widgets in SwiftUI/WidgetKit and Kotlin show live prayer times synced from the app.',
      'A runtime layer tells Google from Huawei Mobile Services, ending location and map crashes on Huawei phones.',
      'A headless WorkManager sync refreshes location, prayer zones, widgets and daily notifications in the background.',
      'A Qibla compass built on great-circle bearings, steadied by a low-pass filter on the magnetometer.',
      'freeRASP runtime protection (root and jailbreak detection, anti-tampering) to meet government VAPT.',
    ],
    stack: ['Flutter', 'Dart', 'GetX', 'SwiftUI', 'Kotlin', 'WorkManager'],
    screens: [
      { src: '', alt: 'JAKIM Touch home screen', device: 'phone' },
      { src: '', alt: 'JAKIM Touch prayer times widget', device: 'phone' },
    ],
    size: 'feature',
  },
  {
    id: 'i-kredikom',
    code: 'IK',
    tint: 'weight',
    name: 'i-Kredikom 2.0',
    summary:
      'KPKT’s app for finding licensed moneylenders and pawnbrokers, rebuilt from the ground up in Flutter.',
    facts: [
      { label: 'Client', value: 'KPKT' },
      { label: 'Built at', value: 'Zen Computer Systems' },
      { label: 'Languages', value: 'Malay, English, Chinese, Tamil' },
      { label: 'Status', value: 'In service' },
    ],
    highlights: [
      'MyDigital ID 2.0 sign-in over OpenID Connect with PKCE.',
      'A nationwide map of licensed lenders on OpenStreetMap, with marker clustering.',
      'Calculators for the legal interest and fee caps in the Moneylenders Act 1951 and Pawnbrokers Act 1972.',
      'A two-tier memory and disk cache: fewer network calls, and data that still reads offline.',
      'Push notifications through Firebase Cloud Messaging that open the right screen.',
    ],
    stack: ['Flutter', 'Dart', 'Riverpod', 'OIDC + PKCE', 'OpenStreetMap', 'FCM'],
    screens: [
      { src: '/images/i-kredikom/home.webp', alt: 'i-Kredikom 2.0 home: announcements and services', device: 'phone' },
      { src: '/images/i-kredikom/map.webp', alt: 'i-Kredikom 2.0 map of licensed lenders, with a lender’s details open', device: 'phone' },
      { src: '/images/i-kredikom/calculator.webp', alt: 'i-Kredikom 2.0 loan calculator showing total interest and monthly instalment', device: 'phone' },
      { src: '/images/i-kredikom/licence.webp', alt: 'i-Kredikom 2.0 licence check result for a moneylender', device: 'phone' },
    ],
    banner: {
      src: '/images/i-kredikom/banner.webp',
      alt: 'i-Kredikom 2.0 store banner: “Semak lesen sebelum meminjam”, check the licence before you borrow',
    },
    size: 'feature',
  },
  {
    id: 'fitxp',
    code: 'FX',
    tint: 'star',
    name: 'FitXP',
    summary:
      'A calorie and fitness tracker that plays like a game, built around Malaysian food. Snap a meal and your day turns into stars, streaks, quests and a weekly boss. Every screen on this page borrows its look.',
    facts: [
      { label: 'Type', value: 'Personal project' },
      { label: 'Since', value: 'November 2025' },
      { label: 'Food data', value: '1,660 foods' },
      { label: 'Status', value: 'In development' },
    ],
    highlights: [
      'Snap a meal and it becomes a cut-out sticker on your day, cut from the photo on the phone with ML Kit.',
      'A test-first game engine: XP, daily stars, streaks, weekly bosses, quests and collectible cards only change through one dispatch, so every rule has a test.',
      'Offline first: a drift (SQLite) database on the phone is the source of truth, and a small Laravel API ships newer food data when there is a connection.',
      'A versioned food file of local dishes with stable ids, sourced from USDA FoodData Central and Singapore HPB data, with side-dish chips for plates like nasi lemak.',
      'Health guardrails built in: a calorie floor, a warning on very low targets, and neutral BMI wording.',
      'Every shape is drawn in code (wavy pills, pebbles, contour lines, the corner dial), checked by golden tests in light, dark and large text.',
    ],
    stack: ['Flutter', 'Dart', 'BLoC', 'drift (SQLite)', 'ML Kit', 'Laravel'],
    screens: [
      { src: '/images/fitxp/today.webp', alt: 'FitXP Today: kcal left in a wavy ring, water, weight and steps trackers, and meal plates', device: 'phone' },
      { src: '/images/fitxp/log.webp', alt: 'FitXP log sheet: snap a meal or search Malaysian dishes like nasi lemak', device: 'phone' },
      { src: '/images/fitxp/progress.webp', alt: 'FitXP Progress: this week’s boss, the level, cards and trophies', device: 'phone' },
      { src: '/images/fitxp/dial.webp', alt: 'FitXP corner dial open, with Water, Exercise, Food, Looks and Progress', device: 'phone' },
    ],
    banner: {
      src: '/images/fitxp/cards.webp',
      alt: 'A sheet of FitXP’s collectible cards: pebble-shaped scenes for each world, with gold trophy cards',
    },
    size: 'feature',
  },
  {
    id: 'ikko',
    code: 'IKO',
    tint: 'looks',
    name: 'Ikko',
    summary:
      'A trip planner for a Kansai trip: a Vue and Laravel web app, plus a Flutter Android app on the same API.',
    facts: [
      { label: 'Type', value: 'Personal project' },
      { label: 'Since', value: 'September 2026' },
      { label: 'Platforms', value: 'Web, Android' },
      { label: 'Status', value: 'In service' },
    ],
    highlights: [
      'Optimistic Pinia stores that keep the web app working when the API is out of reach.',
      'A Laravel REST API with Sanctum tokens: anyone can read, only signed-in users can write.',
      'Friends send souvenir requests through a shared link.',
      'GitHub Actions deploys it to the same hosting as this site.',
    ],
    stack: ['Vue 3', 'TypeScript', 'Laravel', 'Flutter', 'Leaflet'],
    screens: [
      { src: '', alt: 'Ikko itinerary on the web', device: 'browser' },
      { src: '', alt: 'Ikko on Android', device: 'phone' },
    ],
    link: { label: 'Visit ikko.space', href: 'https://ikko.space' },
    size: 'compact',
  },
  {
    id: 'recipease',
    code: 'RE',
    tint: 'move',
    name: 'Recipease',
    summary:
      'A cooking assistant that recognises ingredients in a photo with an on-device CNN, then suggests recipes.',
    facts: [
      { label: 'Type', value: 'Final-year project, UiTM' },
      { label: 'Built', value: '2023 to 2025' },
    ],
    highlights: [
      'A TensorFlow Lite CNN that runs on the phone, no server needed.',
      'Recipe suggestions from the Spoonacular API, based on what it recognised.',
    ],
    stack: ['Flutter', 'TensorFlow Lite', 'Spoonacular API'],
    screens: [{ src: '', alt: 'Recipease ingredient scan', device: 'phone' }],
    size: 'compact',
  },
]

/** Newest first. The line runs down the page from where you are now. */
export const journey: Stop[] = [
  {
    place: 'Zen Computer Systems',
    title: 'Solution Developer, Mobile',
    where: 'Cyberjaya',
    when: 'Apr 2025 – now',
    notes: ['Government apps for JAKIM and KPKT, from rebuild to release.'],
    current: true,
  },
  {
    place: 'Elix Solution',
    title: 'Mobile Developer Intern',
    where: 'Seri Kembangan',
    when: 'Sep 2024 – Feb 2025',
    notes: [
      'Lokel Superapp: one Flutter app for several local-council portals, with parking, fines, assessment tax and monthly passes.',
      'Session persistence with background token refresh, deep links and receipts; skeleton loading and caching for weak networks.',
    ],
  },
  {
    place: 'Universiti Teknologi MARA',
    title: 'BSc (Hons) Computer Science, Mobile Computing',
    where: 'Kuala Terengganu',
    when: 'Graduated Feb 2025',
    notes: ['GPA 3.44. Dean’s List Award.'],
  },
  {
    place: 'Kolej Matrikulasi Negeri Sembilan',
    title: 'Science, Computer Science module',
    where: 'Kuala Pilah',
    when: 'Aug 2020 – May 2021',
    notes: ['GPA 3.33.'],
  },
]

export const skillLines: SkillLine[] = [
  { name: 'Mobile', items: ['Flutter', 'Dart', 'Kotlin', 'Java', 'SwiftUI', 'Android Studio', 'Gradle'] },
  { name: 'Native edges', items: ['Home-screen widgets', 'WorkManager', 'Huawei HMS', 'Google GMS'] },
  { name: 'State', items: ['GetX', 'Riverpod', 'BLoC', 'Provider'] },
  {
    name: 'Security and identity',
    items: ['OIDC + PKCE', 'MyDigital ID 2.0', 'freeRASP', 'OWASP Mobile Top 10'],
  },
  {
    name: 'Web and back end',
    items: ['Vue', 'Laravel', 'REST API design', 'SQL', 'SQLite', 'drift', 'Hive', 'Firebase Cloud Messaging', '.NET (basic)'],
  },
  { name: 'Machine learning', items: ['TensorFlow Lite', 'CNN', 'OCR', 'Object detection'] },
  {
    name: 'Tools',
    items: ['Git', 'GitHub Enterprise', 'Figma', 'Miro', 'Postman', 'Swagger UI', 'Copilot Studio', 'CI/CD'],
  },
]

export const photos: Photo[] = [
  { src: '', alt: '', caption: 'JAKIM Touch launch', shape: 'landscape' },
  { src: '', alt: '', caption: 'Graduation, UiTM', shape: 'portrait' },
  { src: '', alt: '', caption: 'i-Kredikom 2.0 launch', shape: 'landscape' },
]

export interface Achievement {
  title: string
  from: string
}

export const achievements: Achievement[] = [{ title: 'Dean’s List Award', from: 'Universiti Teknologi MARA' }]
