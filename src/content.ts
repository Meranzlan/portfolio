/*
 * content.ts — everything the page says, in one place
 * ====================================================
 * The source is Imran's resume. Edit this file to change the site; components only lay it out.
 * Images go in public/images/ and are referenced from the site root, e.g. '/images/jakim-touch/home.webp'.
 */

export interface Screen {
  src: string
  alt: string
}

/** Which app's colours an entry wears (tokens.css). */
export type Brand = 'jakim' | 'fitxp' | 'ikredikom'

export interface Project {
  id: string
  brand: Brand
  /** The rubber stamp on the entry. */
  stamp: string
  /** A short handwritten-style note beside the screens. */
  note?: string
  name: string
  /** One line under the name: what it is. */
  tagline: string
  /** Mono metadata above the name, e.g. client and dates. */
  meta: string[]
  summary?: string
  points: string[]
  stack: string[]
  /** Phone screenshots. A project with none shows a text-only card, never a placeholder. */
  screens: Screen[]
  /** Shows the app's companion, Koma, in the card's corner. */
  companion?: boolean
}

export interface Role {
  company: string
  where: string
  when: string
  title: string
  /** Projects inside the role, each with its own bullets. */
  work: { name: string; client?: string; points: string[] }[]
  stack: string[]
}

export interface OtherWork {
  name: string
  context: string
  when: string
  note: string
}

export interface Study {
  school: string
  where: string
  when: string
  title: string
  note: string
}

export interface SkillGroup {
  name: string
  items: string[]
}

export const profile = {
  name: 'Imran Azlan',
  fullName: 'Muhammad Imran Bin Nor Azlan Shah',
  role: 'Mobile Developer',
  location: 'Putrajaya, Malaysia',
  now: 'currently: Solution Developer, Mobile, at Zen Computer Systems',
  pitch:
    'Government apps by day, a calorie tracker with boss battles by night. I build in Flutter and go all the way down to the native bits most people skip: home-screen widgets, Huawei phones, background sync and digital-ID sign-in.',
  email: 'imranazlan06@gmail.com',
  linkedin: 'https://www.linkedin.com/in/imranazlan',
  github: 'https://github.com/Meranzlan',
  portrait: { src: '/images/portrait.webp', alt: 'Imran Azlan, smiling, with a city skyline behind him' },
}

export const projects: Project[] = [
  {
    id: 'jakim-touch',
    brand: 'jakim',
    stamp: 'In service · iOS · Android · Huawei',
    note: 'The compass needle settles instead of jittering.',
    name: 'JAKIM Touch',
    tagline: 'The official app of the Department of Islamic Development Malaysia',
    meta: ['JAKIM', 'Zen Computer Systems', '2025 – Present'],
    points: [
      'Rebuilt from the ground up in Flutter, Dart and GetX, shipping on iOS, Google Android and Huawei (HMS).',
      'A runtime device layer that detects Google vs. Huawei Mobile Services, ending location and map crashes on Huawei phones.',
      'Native home-screen widgets in SwiftUI/WidgetKit and Kotlin/RemoteViews, showing live prayer times synced from the app.',
      'A headless WorkManager sync that refreshes location, prayer zones, widgets and daily prayer notifications in the background.',
      'A Qibla compass built on great-circle bearings, steadied by a low-pass filter on the magnetometer.',
      'A Microsoft Copilot Studio chatbot with secure URL routing, and freeRASP runtime protection to meet government VAPT.',
    ],
    stack: ['Flutter', 'Dart', 'GetX', 'SwiftUI', 'Kotlin', 'WorkManager', 'Huawei HMS', 'freeRASP'],
    screens: [
      { src: '/images/jakim-touch/splash.webp', alt: 'JAKIM Touch splash screen with the app logo and a Mula button' },
      { src: '/images/jakim-touch/home.webp', alt: 'JAKIM Touch home: the next prayer, Zuhur at 1:02 pm, over a mosque photo' },
      { src: '/images/jakim-touch/home-scrolled.webp', alt: 'JAKIM Touch home scrolled to the services grid, JAKIM news and info' },
      { src: '/images/jakim-touch/quran.webp', alt: 'JAKIM Touch Smart Quran: search and the list of surahs' },
      { src: '/images/jakim-touch/prayer-times.webp', alt: 'JAKIM Touch Waktu Solat: the day’s prayer times with alert toggles' },
      { src: '/images/jakim-touch/kiblat.webp', alt: 'JAKIM Touch Kiblat compass with the Qibla angle and distance to the Kaabah' },
    ],
  },
  {
    id: 'fitxp',
    brand: 'fitxp',
    stamp: 'In progress · not on the stores yet',
    note: 'Koma, the first companion, lives in the corner of every page.',
    name: 'FitXP',
    tagline: 'A gamified nutrition and fitness tracker',
    meta: ['Personal project', 'Nov 2025 – Present'],
    summary:
      'An offline-first Flutter app that turns food, water, exercise and weight logs into levels, quests, boss battles, collectible cards and unlockable companions.',
    points: [
      'A Malaysian food database of 1,660 foods, served from a Laravel API and synced to the phone for offline use, with photo-based meal logging.',
      'Home-screen widgets, scheduled notifications, and a Share studio for posting to Instagram, Facebook, Threads and X.',
      'Illustrations and companion characters drawn in code with custom painters, covered by golden and unit tests.',
    ],
    stack: ['Flutter', 'Dart', 'drift (SQLite)', 'Laravel REST API', 'Kotlin widgets', 'Figma'],
    companion: true,
    /* Rendered from the app in dark mode with sample data (a throwaway shot test in Meranzlan/fitxp, not committed). */
    screens: [
      { src: '/images/fitxp/today.webp', alt: 'FitXP Today in dark mode: 820 kcal left, water, weight and steps, breakfast on its plate and Koma in the corner' },
      { src: '/images/fitxp/dial.webp', alt: 'FitXP corner dial open over Today, with Water, Exercise, Tiles, Looks and Progress' },
      { src: '/images/fitxp/water.webp', alt: 'FitXP Water: Koma filled with 1.5 litres and the Hydrate star earned' },
      { src: '/images/fitxp/exercise.webp', alt: 'FitXP Exercise: 7,420 steps up the mountain to the Move star, and today’s workouts' },
      { src: '/images/fitxp/log-breakfast.webp', alt: 'FitXP log sheet: “What did you have for breakfast?”, snap it or search Malaysian dishes' },
      { src: '/images/fitxp/journal.webp', alt: 'FitXP Today’s page: a notebook page with a meal receipt, a sticky note, the day tracker and a level stamp' },
      { src: '/images/fitxp/weight.webp', alt: 'FitXP Weight: 72.4 kg, down 1.7 kg this month, with Koma waiting at the 70 kg goal' },
    ],
  },
  {
    id: 'i-kredikom',
    brand: 'ikredikom',
    stamp: 'In service · 4 languages',
    note: 'The calculator follows the legal caps in the Acts.',
    name: 'i-Kredikom 2.0',
    tagline: 'Find and check licensed moneylenders and pawnbrokers',
    meta: ['KPKT', 'Zen Computer Systems', '2025 – Present'],
    points: [
      'Rebuilt from the ground up in Flutter and Riverpod for the Ministry of Housing and Local Government (KPKT).',
      'MyDigital ID 2.0 national digital-identity sign-in over OpenID Connect with PKCE.',
      'A nationwide map of licensed lenders on OpenStreetMap, with marker clustering.',
      'Statutory calculators for the interest and fee caps in the Moneylenders Act 1951 and Pawnbrokers Act 1972.',
      'A two-tier memory and disk cache for fewer network calls and offline reading.',
      'Four languages (Malay, English, Chinese, Tamil) with instant switching, and FCM push notifications that deep-link to the right screen.',
    ],
    stack: ['Flutter', 'Dart', 'Riverpod', 'OIDC + PKCE', 'OpenStreetMap', 'FCM'],
    screens: [
      { src: '/images/i-kredikom/home.webp', alt: 'i-Kredikom 2.0 home: announcements and services' },
      { src: '/images/i-kredikom/map.webp', alt: 'i-Kredikom 2.0 map of licensed lenders, with a lender’s details open' },
      { src: '/images/i-kredikom/calculator.webp', alt: 'i-Kredikom 2.0 loan calculator showing total interest and monthly instalment' },
      { src: '/images/i-kredikom/licence.webp', alt: 'i-Kredikom 2.0 licence check result for a moneylender' },
    ],
  },
]

/** Plain entries: no visuals, no highlight. */
export const otherWork: OtherWork[] = [
  {
    name: 'Recipease',
    context: 'Final-year project, UiTM',
    when: '2023 – 2025',
    note: 'A cooking assistant that recognises ingredients in a photo with an on-device CNN (TensorFlow Lite), then suggests recipes from the Spoonacular API.',
  },
  {
    name: 'Ikko',
    context: 'Personal project',
    when: '2026',
    note: 'A trip planner: a Vue and Laravel web app at ikko.space, with a Flutter Android app on the same API.',
  },
]

/** Newest first. */
export const experience: Role[] = [
  {
    company: 'Zen Computer Systems Sdn Bhd',
    where: 'Cyberjaya, Selangor',
    when: 'Apr 2025 – Present',
    title: 'Solution Developer, Mobile',
    work: [
      {
        name: 'JAKIM Touch',
        client: 'JAKIM',
        points: [
          'Rebuilt the official app in Flutter for iOS, Android and Huawei, with native widgets, background sync and runtime security.',
        ],
      },
      {
        name: 'i-Kredikom 2.0',
        client: 'KPKT',
        points: ['Rebuilt the app in Flutter and Riverpod, with MyDigital ID 2.0 sign-in, a lender map and statutory calculators.'],
      },
    ],
    stack: ['Flutter', 'GetX', 'Riverpod', 'SwiftUI', 'Kotlin'],
  },
  {
    company: 'Elix Solution Sdn Bhd',
    where: 'Seri Kembangan, Selangor',
    when: 'Sep 2024 – Feb 2025',
    title: 'Mobile Developer Intern',
    work: [
      {
        name: 'Lokel Superapp',
        points: [
          'Integrated several regional local-council portals into a single Flutter client.',
          'Built ParkN’Pay, compound and fine payments, quarterly assessment tax and recurring monthly passes.',
          'Session persistence with background token refresh, secure storage, deep links and transaction receipts.',
          'Steadier on weak networks: empty states, skeleton loading, central error handling and local caching.',
        ],
      },
    ],
    stack: ['Flutter', 'Dart', 'REST APIs'],
  },
]

export const education: Study[] = [
  {
    school: 'Universiti Teknologi MARA (UiTM)',
    where: 'Kuala Terengganu',
    when: 'Graduated Feb 2025',
    title: 'Bachelor of Computer Science (Hons.) in Mobile Computing',
    note: 'GPA 3.44 / 4.00 · Dean’s List Award',
  },
  {
    school: 'Matriculation College Negeri Sembilan',
    where: 'Kuala Pilah',
    when: 'Aug 2020 – May 2021',
    title: 'Science Matriculation, Module 2 (Computer Science)',
    note: 'GPA 3.33 / 4.00',
  },
]

export const skills: SkillGroup[] = [
  { name: 'Mobile', items: ['Flutter', 'Dart', 'Kotlin', 'Java', 'SwiftUI', 'Android Studio', 'Gradle'] },
  { name: 'State', items: ['GetX', 'Riverpod', 'BLoC', 'Provider'] },
  { name: 'Web', items: ['Vue.js', 'Laravel', 'REST API design'] },
  {
    name: 'Back end & data',
    items: ['REST integration', '.NET (basic)', 'SQL', 'SQLite', 'drift', 'Hive', 'Firebase Cloud Messaging', 'Postman', 'Swagger UI'],
  },
  { name: 'Security & identity', items: ['OIDC / PKCE', 'MyDigital ID 2.0', 'freeRASP', 'OWASP Mobile Top 10'] },
  { name: 'Machine learning', items: ['TensorFlow Lite', 'CNN', 'OCR', 'Object detection'] },
  { name: 'Tools', items: ['Git', 'GitHub Enterprise', 'Figma', 'Miro', 'Copilot Studio', 'CI/CD'] },
]
