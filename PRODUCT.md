# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vue 3 (`<script setup lang="ts">`) + Vite + TypeScript, built to a static site. Proposed by Claude, accepted by
the owner. Hosted on the owner's existing Hostinger shared hosting as the subdomain `imran.ikko.space`, deployed by
GitHub Actions over rsync like the owner's Ikko app. Public GitHub repo (`Meranzlan`).

## Users

1. **Recruiters and hiring managers** (first) hiring a mobile developer in Malaysia. They arrive from a resume,
   LinkedIn or a job application, skim for about a minute, and decide whether to contact Imran or download his CV.
2. **Freelance and contract clients** (second): companies that might hire him for app work. Same evidence, judged
   on shipped apps and range.

## Product Purpose

The personal portfolio of Muhammad Imran Bin Nor Azlan Shah ("Imran Azlan"), a Flutter mobile developer based in
Putrajaya. It shows the apps he has shipped, with launch photos, achievements and a face, which a one-page resume
cannot. Success: a visitor knows within seconds who he is and what he builds, sees proof, and contacts him.

## Positioning

He ships government-scale Flutter apps end to end, including the native edges most Flutter developers avoid:
SwiftUI/WidgetKit and Kotlin home-screen widgets, Huawei HMS support, background sync with WorkManager, runtime
security for government VAPT, national digital-ID login (MyDigital ID, OIDC + PKCE). Beyond mobile he builds full
stack (Ikko: Vue + Laravel web and a Flutter Android client on his own domain).

## Operating Context

- Visitors open it from a link on a resume PDF, LinkedIn or a job portal, often on a phone, sometimes on a laptop
  during screening.
- The owner edits content himself (he is a Flutter developer learning Vue), so project, achievement and photo
  content must be easy to add without touching layout code.

## Capabilities and Constraints

- Sections the first version needs: who he is (with his photo), featured projects, work experience, skills,
  education and achievements, contact.
- Featured projects, first version: JAKIM Touch (JAKIM), i-Kredikom 2.0 (KPKT), Ikko, FitXP, Recipease.
- Excluded until launched: MyTax Stamp Authenticity Check (LHDN, "STSDS"). Lokel Superapp (internship) is not
  featured; it stays in the experience timeline only.
- Contact: email, LinkedIn, GitHub, phone / WhatsApp, and a downloadable CV PDF. All were chosen by the owner.
- Photos (his face, project launch photos, achievement photos) are supplied later by the owner. The layout must look
  finished with placeholders and must accept portrait and landscape photos of any quality.
- No backend, no analytics, no tracking.

## Brand Commitments

- Blue is the highlight colour (owner's choice).
- The owner's brief: safe and clear first, but not generic; playful and interesting; attention-catching without
  overshadowing the content.

## Evidence on Hand

- Resume (October 2026): `public/cv/Imran-Azlan-Resume.pdf`. Source of all factual copy.
- Work: Zen Computer Systems Sdn Bhd, Solution Developer (Mobile), April 2025 to present: JAKIM Touch, i-Kredikom
  2.0, MyTax. Elix Solution Sdn Bhd, Mobile Developer Intern, September 2024 to February 2025: Lokel Superapp.
- Education: UiTM, Bachelor of Computer Science (Hons) in Mobile Computing, GPA 3.44, Dean's List, graduated
  February 2025. Matriculation College Negeri Sembilan, GPA 3.33.
- Ikko: https://ikko.space (live).
- Not yet supplied, never invent: photos, app store links, download or user counts, ratings, testimonials, awards
  beyond the Dean's List, launch dates beyond the resume.

## Product Principles

1. Proof over adjectives: every claim points to a shipped app, a photo or a concrete technical detail.
2. The one-minute skim wins: role, specialty and contact are reachable without scrolling far.
3. Personality in the details, never at the cost of reading the content.
4. Content is data: adding a project, photo or achievement means editing one file.

## Accessibility & Inclusion

WCAG 2.2 AA. Honour `prefers-reduced-motion`. Readable on a mid-range Android phone over mobile data.
