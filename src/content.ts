/*
 * content.ts — everything the page says, in one place
 * ====================================================
 * Edit this file to change the portfolio: add a project, a photo or an achievement here and the page lays
 * it out. Images go in public/images/ and are referenced from the site root, e.g. '/images/jakim-touch-1.webp'.
 * Leave `src` empty and the page shows a labelled placeholder in that slot instead.
 */

export interface Station {
  id: string
  code: string
  label: string
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
  /** The app's stop code on the Shipped apps line, shown in its roundel. Two or three letters. */
  code: string
  name: string
  summary: string
  /** The label grid every project carries, like the info panel on a platform. */
  facts: Fact[]
  highlights: string[]
  stack: string[]
  screens: AppScreen[]
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
  /** The station you are at now: drawn with the "You are here" marker. */
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

/** The sections, in page order. The route strip draws one stop per station. */
export const stations: Station[] = [
  { id: 'start', code: 'IA01', label: 'Start' },
  { id: 'apps', code: 'IA02', label: 'Apps' },
  { id: 'experience', code: 'IA03', label: 'Experience' },
  { id: 'skills', code: 'IA04', label: 'Skills' },
  { id: 'highlights', code: 'IA05', label: 'Highlights' },
  { id: 'contact', code: 'IA06', label: 'Contact' },
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
   * A cut-out (transparent PNG or WebP of just you, no background) stands on the blue field and breaks
   * out of its top edge. A normal photo sits in a lightbox frame instead: set cutout to false.
   */
  portrait: { src: '', alt: 'Imran Azlan', cutout: true },
}

export const projects: Project[] = [
  {
    id: 'jakim-touch',
    code: 'JT',
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
      { src: '', alt: 'i-Kredikom lender map', device: 'phone' },
      { src: '', alt: 'i-Kredikom loan calculator', device: 'phone' },
    ],
    size: 'feature',
  },
  {
    id: 'ikko',
    code: 'IKO',
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
    id: 'fitxp',
    code: 'FX',
    name: 'FitXP',
    summary:
      'An offline-first fitness tracker that turns calorie and macro logs into levels, quests and an evolving avatar.',
    facts: [
      { label: 'Type', value: 'Personal project' },
      { label: 'Since', value: 'November 2025' },
    ],
    highlights: [
      'BLoC across every feature module.',
      'Flame engine sprite animation alongside custom painters.',
      'Hive storage, so everything works offline.',
    ],
    stack: ['Flutter', 'BLoC', 'Flame', 'Hive'],
    screens: [{ src: '', alt: 'FitXP avatar and quests', device: 'phone' }],
    size: 'compact',
  },
  {
    id: 'recipease',
    code: 'RE',
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
    items: ['Vue', 'Laravel', 'REST API design', 'SQL', 'SQLite', 'Hive', 'Firebase Cloud Messaging', '.NET (basic)'],
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
