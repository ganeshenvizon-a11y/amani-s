# AMANI DESIGN, MOTION & IMAGERY SYSTEM
## Primary Visual Direction and Implementation Specification

> **Document purpose:** This is the single authoritative brief for Amani's visual design, motion language, component system, imagery direction, and React implementation. All earlier reference documents are superseded by this file.
>
> **Project stack:** React 19 + Vite + TypeScript + Tailwind CSS v4 + Motion for React (motion/react) + GSAP/ScrollTrigger + Lenis + Lucide React.
>
> **Preservation rule:** Do not break or rewrite existing routes, data, state, CMS fields, APIs, reservation links, form logic, or unrelated sections.

---

# 1. EXECUTIVE CREATIVE DIRECTION

## 1.1 Core philosophy

The editorial restaurant experience this project draws from does not introduce itself as a conventional restaurant. It first establishes a sense of territory: architecture, light, time, material, and gathering. Food enters as part of that environment rather than as an isolated product catalogue.

Five principles:
1. Atmosphere before information
2. Landscape before decoration
3. Editorial composition before cards
4. Slow, composed movement before spectacle
5. Human gathering before aggressive conversion

## 1.2 The Amani creative translation

Amani is a meeting of warmth, food, people, memory, and place.

The website must feel: Editorial, Warm, Cinematic, Tactile, Spacious, Contemporary but not trendy, Luxurious without looking expensive for the sake of it, Hospitality-led rather than technology-led.

## 1.3 The emotional sequence

Every major page should follow this emotional progression:

Arrival -> Atmosphere -> Food -> Philosophy -> People -> Trust -> Invitation

The user should feel the restaurant before being asked to reserve.

---

# 2. SITE MAP AND PAGE STRUCTURES

## 2.1 Global navigation

Navigation: Logo | Menu | Stories | Gatherings | Visit | Reserve a Table

Utility bar: Live open/closed status | Serving area | Get Directions

Navigation behavior:
- Desktop: calm, horizontal, fixed or absolute over the opening visual.
- After hero threshold: transition to solid warm-ivory background with dark text.
- Mobile: full-screen editorial menu rather than a small dropdown card.
- Keep the reservation CTA visually distinct but not oversized.
- Do not use glassmorphism.
- Do not place the header inside a rounded pill.

---

## 2.2 Home page — canonical section order

| # | Section |
|---|---|
| 01 | Hero |
| 02 | Brand Introduction |
| 03 | Mood Finder |
| 04 | Signature Experiences |
| 05 | Signature Dishes |
| 06 | The Amani Way |
| 07 | Inside Amani |
| 08 | Guest Reviews |
| 09 | Visit Preview |
| 10 | Gatherings Preview |
| 11 | Final Reservation Invitation |
| 12 | Footer |

At least 60-70% of the page should be composed from full-width editorial layouts, asymmetric image/text arrangements, and deliberate negative space.

---

## 2.3 Stories page — canonical section order

| # | Section |
|---|---|
| 01 | Hero |
| 02 | Why Amani |
| 03 | Our Beginning |
| 04 | The Philosophy |
| 05 | From Kitchen to Table |
| 06 | Our People |
| 07 | A Day at Amani |
| 08 | Closing Invitation |

Treat the page as a visual essay. Alternate: large statement / full-bleed image / narrow body text / quote / human portrait / process detail.

---

## 2.4 Menu page — canonical section order

| # | Section |
|---|---|
| 01 | Hero |
| 02 | Practical Menu Introduction |
| 03 | Sticky Categories |
| 04 | Mood Finder |
| 05 | Menu Categories |
| 06 | Dish Detail Experience |
| 07 | Dietary and Service Information |
| 08 | QR Ordering Information |
| 09 | Closing Gallery / Reservation Invitation |

Recommended desktop layout: [Category rail sticky left] [Menu content centre] [Contextual image/story right]

Mobile: horizontally scrollable sticky category strip, single-column list, expandable dish details, persistent unobtrusive QR action. Do not convert the full menu into dense rounded product cards.

---

## 2.5 Gatherings page — canonical section order

| # | Section |
|---|---|
| 01 | Hero |
| 02 | Gatherings Introduction |
| 03 | Occasions |
| 04 | Spaces and Formats |
| 05 | Gallery |
| 06 | Planning Process |
| 07 | Enquiry Form |
| 08 | Closing Statement |

For each venue/occasion: area index, name, one emotional line, capacity, seating format, indoor/outdoor status, best suited for, one strong image. Use editorial stacked panels or split layout. Avoid generic feature cards.

---

## 2.6 Visit page — canonical section order

| # | Section |
|---|---|
| 01 | Hero |
| 02 | Live Status |
| 03 | Location and Directions |
| 04 | Restaurant Information |
| 05 | Contact |
| 06 | FAQs |
| 07 | Menu / Reservation Invitation |

Recommended desktop split: [Live status + hours + address] [Large location image / map treatment]

Do not embed a visually noisy default map above the fold. Use a branded static map preview that opens directions or loads the interactive map on demand.

---

## 2.7 Gallery page

Categories: Atmosphere | Food | People | Spaces | Evenings | Details

Gallery behavior: asymmetric masonry or editorial mosaic, filter via layout reflow not hard refresh, full-screen lightbox with image index, keyboard arrows and Escape, swipe on mobile.


---

# 3. UNIFIED DESIGN TOKEN SYSTEM

All design tokens use the --amani-* prefix. This is the single source of truth. File: src/styles/tokens.css

## 3.1 Color tokens

```css
:root {
  /* Primary canvases */
  --amani-canvas:        #F8F2E5;
  --amani-paper:         #EFE5D4;
  --amani-sand:          #D8C7AA;

  /* Typography */
  --amani-ink:           #171411;
  --amani-ink-soft:      #403A34;
  --amani-muted:         #746E66;

  /* Brand accents */
  --amani-wine:          #7A1F24;
  --amani-wine-deep:     #551317;
  --amani-rust:          #A2553E;
  --amani-olive:         #6D7254;

  /* Structure */
  --amani-line:          rgba(23, 20, 17, 0.16);
  --amani-line-strong:   rgba(23, 20, 17, 0.34);
  --amani-overlay:       rgba(15, 12, 10, 0.34);

  /* Dark scenes */
  --amani-night:         #11100E;
  --amani-night-soft:    #1B1814;
  --amani-light-on-dark: #F4EDDF;

  /* Feedback states */
  --amani-success:       #315a3f;
  --amani-error:         #8a2f28;
}
```

Color distribution: 65% warm ivory/paper, 20% imagery and natural textures, 10% near-black typography/dark sections, 5% wine/rust/olive accents.

Color usage rules:
- No decorative gradients.
- Use wine to mark commitment: reserve, submit, active state, critical highlight.
- Use olive for atmosphere or category accents.
- Use rust sparingly where food and fire are central.
- Prefer borders and contrast over shadows.
- Use --amani-success and --amani-error only for form feedback states.

---

## 3.2 Typography tokens

```css
:root {
  --amani-font-display: "Cormorant Garamond", Georgia, serif;
  --amani-font-ui:      "Manrope", Arial, sans-serif;

  --amani-type-hero:        clamp(4rem,   9.4vw, 10.5rem);
  --amani-type-display-xl:  clamp(3.5rem, 7vw,    7.5rem);
  --amani-type-display-lg:  clamp(2.8rem, 5.4vw,  5.8rem);
  --amani-type-display-md:  clamp(2.15rem,3.7vw,  4rem);
  --amani-type-title:       clamp(1.65rem,2.3vw,  2.6rem);
  --amani-type-body-lg:     clamp(1.08rem,1.35vw, 1.35rem);
  --amani-type-body:        1rem;
  --amani-type-label:       0.72rem;
}
```

Typography rules:
- Display/emotional headings: --amani-font-display (Cormorant Garamond Variable)
- Body/UI/labels: --amani-font-ui (Manrope Variable)
- Hero headings: line-height 0.86-0.94
- Editorial display: line-height 0.92-1.02
- Body: line-height 1.55-1.7
- Labels: uppercase, tracking 0.12em-0.2em
- Long paragraphs: maximum 58-68ch; emotional statements: maximum 12-18ch
- Avoid centre-aligning every section; do not use all caps for long text

---

## 3.3 Spacing tokens

```css
:root {
  --amani-space-1:  0.375rem;   /*  6px */
  --amani-space-2:  0.75rem;    /* 12px */
  --amani-space-3:  1.125rem;   /* 18px */
  --amani-space-4:  1.5rem;     /* 24px */
  --amani-space-5:  2rem;       /* 32px */
  --amani-space-6:  3rem;       /* 48px */
  --amani-space-7:  4.5rem;     /* 72px */
  --amani-space-8:  6rem;       /* 96px */
  --amani-space-9:  8rem;       /* 128px */
  --amani-space-10: 11rem;      /* 176px */

  /* Semantic layout tokens */
  --amani-section-block-desktop: clamp(6rem,  11vw, 11rem);
  --amani-section-block-mobile:  clamp(4rem,  18vw,  6.5rem);
  --amani-gutter:                clamp(1rem,   3vw,   3.5rem);
  --amani-container:             1600px;
  --amani-reading-width:         66ch;
}
```

---

## 3.4 Border radius tokens

```css
:root {
  --amani-radius-none: 0;
  --amani-radius-sm:   4px;
  --amani-radius-md:   8px;   /* maximum for editorial images */
  --amani-radius-pill: 999px; /* semantically appropriate tags only */
}
```

Rules: Primary image corners 0-8px; use square framing by default. Avoid large rounded SaaS cards. Avoid floating glass panels.

---

## 3.5 Shadow and grid tokens

```css
:root {
  --amani-shadow: 0 22px 60px rgba(23, 20, 17, 0.10);
  --amani-grid-gap-desktop: clamp(24px, 2.5vw, 40px);
  --amani-grid-gap-mobile:  16px;
}
```

Use shadow rarely. Desktop grid: 12 columns; tablet: 8; mobile: 4.

---

# 4. UNIFIED MOTION TOKEN SYSTEM

File: src/lib/motionTokens.ts

```typescript
export const motionTokens = {
  duration: {
    instant:   0.18,
    micro:     0.22,
    fast:      0.35,
    base:      0.60,
    slow:      0.92,
    cinematic: 1.35,
    scene:     1.80,
  },
  ease: {
    standard:  [0.22, 1, 0.36, 1] as const,
    enter:     [0.16, 1, 0.3,  1] as const,
    exit:      [0.7,  0, 0.84, 0] as const,
    editorial: [0.76, 0, 0.24, 1] as const,
  },
  distance: {
    xs:   8,
    sm:  16,
    md:  24,
    lg:  40,
    hero: 88,
  },
  stagger: {
    tight:   0.05,
    base:    0.08,
    relaxed: 0.12,
  },
  spring: {
    type:      "spring" as const,
    stiffness: 320,
    damping:   30,
    mass:      0.8,
  },
  imageHoverScale: 1.035,
  cardHoverLift:   4,
  pressScale:      0.985,
} as const;

export const gsapEase = {
  enter:     "power3.out",
  cinematic: "power4.inOut",
  soft:      "sine.out",
  linear:    "none",
} as const;
```

## 4.1 Recommended timing ranges by effect

| Effect | Duration |
|---|---|
| Micro interaction | 0.16-0.28s |
| Button / card hover | 0.22-0.38s |
| Content reveal | 0.5-0.75s |
| Hero choreography | 0.8-1.4s |
| Image mask reveal | 0.9-1.5s |
| Child stagger | 0.05-0.10s |
| Ambient loop | 4-10s |
| Standard reveal distance | 16-32px |
| Image hover scale | 1.025-1.035 |
| Card hover lift | 2-4px |

---

# 5. MOTION LANGUAGE

## 5.1 Motion principle

The movement must feel like: wind through fabric, light changing across stone, a camera slowly approaching a table, pages of an editorial publication turning, guests entering a space.

It must NOT feel like: a gaming interface, a SaaS dashboard, a template using random entrance effects, bouncy spring-heavy app motion, constant movement competing with food imagery.

## 5.2 Motion priorities

1. Reveal hierarchy
2. Guide attention
3. Connect sections
4. Give imagery physical presence
5. Confirm interactions

Do not animate an element merely because it exists.

---

## 5.3 Animation ownership matrix

| Need | Owner |
|---|---|
| Color, border, underline, icon transitions | CSS |
| Native sticky positioning | CSS |
| Button hover, card hover, modal, mobile menu, entrance | Motion for React |
| whileInView reveals, AnimatePresence, layout transitions | Motion for React |
| Multi-element hero entrance, mask/clip-path sequences | GSAP |
| Loader and initial page choreography | GSAP |
| Pinned narrative, image expansion, horizontal gallery | GSAP ScrollTrigger |
| Smooth document scrolling | Lenis |

Never allow two systems to animate the same property on the same DOM element.

Use wrapper layers when multiple systems are required:

```html
<div class="gsap-scroll-layer">
  <motion-div class="interaction-layer">
    <img class="css-hover-layer" />
  </motion-div>
</div>
```

## 5.4 Global motion limits

- Use one signature animation per major section.
- Typical reveal distance: 16px to 32px; typical duration: 0.5s to 0.8s; typical stagger: 0.05s to 0.1s.
- Hover lift: no more than 4px; scale effects: between 1.0 and 1.035.
- Avoid bounce unless the interaction specifically requires physical feedback.


---

# 6. GLOBAL ANIMATION SPECIFICATIONS

## 6.1 Opening loader

Timeline:
- 0.00s: Canvas visible, document locked
- 0.12s: First phrase reveals line-by-line
- 0.42s: Logo/mark draws or fades in
- 0.70s: Second phrase reveals
- 1.05s: Subtle image/text shift indicates transition
- 1.30s: Loader mask exits upward or splits vertically
- 1.85s: Hero becomes interactive

Rules: Run full loader only once per session (sessionStorage). On internal page navigation: 450-750ms transition only. Do not fake load percentages. When prefers-reduced-motion: reduce, show 150-250ms fade.

---

## 6.2 Hero entrance

```typescript
// Starting: { yPercent: 115, rotate: 1.5, opacity: 0 }
// Ending:   { yPercent: 0, rotate: 0, opacity: 1, duration: 1.1, stagger: 0.09, ease: "power4.out" }
// Image:    clipPath "inset(100% 0% 0% 0%)" to "inset(0% 0% 0% 0%)", scale 1.08 to 1
```

Sequence: Background image/video mask opens -> Eyebrow appears -> Hero lines reveal -> Supporting copy fades in -> CTA enters last -> Scroll indicator appears after main reveal.

---

## 6.3 Text reveal system

Level A — Hero/statement: Line masking, 900-1300ms, 60-100ms stagger
Level B — Section heading: Line masking or y/opacity, 650-900ms
Level C — Body/metadata: Opacity + y 12-20px, 450-650ms

Do not split all body copy into individual words or characters.

---

## 6.4 Image reveal system

Options: vertical mask, horizontal mask, centre aperture, soft scale and opacity.
Limit each page to two primary reveal directions.

Amani convention: hero and major scenes = vertical mask; supporting editorial images = horizontal mask; gallery = opacity + scale.

---

## 6.5 Parallax

```typescript
gsap.fromTo(image,
  { yPercent: -6 },
  { yPercent: 6, ease: "none",
    scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.6 }
  }
);
```

Inner image is 108-116% of container height. Translate by 6-12% across viewport passage. Disable or reduce on mobile.

---

## 6.6 Section transitions

Approved patterns: image crosses into next section, background changes from ivory to near-black, large statement sticky while imagery changes, full-width image as visual punctuation. Avoid repeated fade-up blocks.

## 6.7 Navigation overlay

Full-screen warm-ivory or dark canvas. Menu links reveal vertically with masked lines. Open: 700-900ms / Close: 500-700ms. Maintain focus trap, Escape support, body scroll lock.

## 6.8 Button interaction

Background overlay sweeps from bottom to top. Arrow moves 4px. Duration 420-620ms. Press scale no lower than 0.985.

## 6.9 Gallery filtering

Use Motion layout animation or GSAP FLIP: non-matching items fade to 0.2, layout reflows, matching items settle. Total: 450-750ms.

## 6.10 Full-screen gallery lightbox

Selected image expands from source rectangle. Dark canvas fades in. Controls appear after image settles. Include: image counter, previous/next, close, captions, keyboard and swipe.

## 6.11 Page transitions

1. Current content fades slightly
2. Branded warm-ivory or wine panel covers viewport
3. Route changes after cover
4. New page scroll resets
5. Panel reveals the new hero
Total target: 900-1300ms. Do not animate during hash navigation or reduced motion.

---

# 7. PAGE-SPECIFIC MOTION

## 7.1 Home hero
Full-bleed cinematic image or muted loop video. Slow 1.04 to 1 scale across 8-12 seconds. Text reveal after loader. On scroll: hero copy rises by 8-12vh and fades.

## 7.2 Brand Introduction (section 02)
Simple y + opacity reveal for headline. Contextual architectural image enters with horizontal mask.

## 7.3 Mood Finder
Mood labels behave like editorial tabs. Crossfade + 1.015 scale on change. Keyboard accessible; mobile: horizontal tab strip with snap.

## 7.4 Signature Experiences (desktop pinned scene)
Left: experience index and title remain sticky. Right: full-height images change as descriptions progress. Background shifts between ivory, paper, and dark scene. Mobile: stacked content only.

## 7.5 Signature Dishes
Feature 3-5 dishes with one dominant image each. Dish name and description reveal as image enters. Do not use a dense product grid.

## 7.6 The Amani Way
Sticky statement + process images + short principles. One sticky media panel on desktop only; no nested pins.

## 7.7 Inside Amani
Editorial mosaic. Slow parallax on one or two hero frames. Gallery lightbox. Human moments mixed with empty-space photography.

## 7.8 Guest Reviews
One large quote at a time. Slow crossfade or horizontal drag. Accessible previous/next controls. No bright star rows repeated.

## 7.9 Visit Preview
Large exterior image. Practical information adjacent. Directions action visible without scrolling inside section.

## 7.10 Gatherings Preview
One emotional image, 2-3 occasion labels. Image subtly changes on occasion hover.

## 7.11 Final Reservation Invitation
Minimal reveal; strong single CTA dominant.

---

# 8. COMPONENT DESIGN LANGUAGE

## 8.1 Header

Desktop: height 76-92px, utility bar above 28-34px, navigation text 12-14px.
Mobile: 64-72px; logo left; menu trigger right.

Header scroll transition (at heroBottom - 80px): transparent to --amani-canvas, logo light to --amani-ink, border bottom fades in, duration 450-650ms.

## 8.2 Buttons

Primary: wine background (--amani-wine), warm-ivory text (--amani-light-on-dark), minimum height 46px, --amani-radius-sm or none.
Editorial text link: "EXPLORE MORE  ->", underline grows left on hover, text shifts 2px, arrow translates 4-6px.

## 8.3 Section label

"01 / THE AMANI WAY" — Manrope 11-12px, uppercase, tracking 0.16em, --amani-muted or --amani-wine, optional 32-48px horizontal rule.

## 8.4 Editorial image module

Intrinsic aspect ratio; overflow: hidden; object-fit: cover. Hover scale: 1 to 1.035, optional -0.75% translation, 800-1100ms, ease power3.out.

## 8.5 Menu list item

Desktop: dish name, price, short description, dietary markers. Hover reveals contextual image on side panel. Active: subtle wine rule. No card elevation. Mobile: tap expands details; price remains visible.

## 8.6 Gallery filters

Plain text buttons; active: underline, weight, or wine dot. No large pills. Animate reflow with FLIP or layout animation. Preserve keyboard focus.

## 8.7 Form fields

Underline or thin outlined fields; labels always visible; 48-54px minimum height. Error: --amani-error; success: --amani-success.

## 8.8 Footer

1. Large brand mark / phrase
2. Reservation or visit invitation
3. Navigation
4. Hours and location
5. Newsletter
6. Social / legal
7. Copyright

Use --amani-night background with --amani-light-on-dark text, or --amani-canvas with large dark wordmark.

---

# 9. IMAGERY ART DIRECTION

## 9.1 Six image pillars

1. Arrival and place: exterior approach, entrance detail, signage, neighbourhood context
2. Architecture and material: stone, wood, fabric, ceramics, light falling across walls
3. Food as landscape: overhead compositions, ingredient detail, hard-light shadows
4. Ritual and craft: hands plating, fire/grill, pouring, setting the table
5. People and gathering: shared plates, toasting, natural moments not posed portraits
6. Evening atmosphere: bar lighting, lamps, fire elements, dark frames with warm highlights

## 9.2 Minimum shot list

Architecture/environment: exterior at golden hour, exterior at blue hour, entrance, main dining room, intimate seating, bar wide, architectural detail, material detail, empty table before service, view through doorway.

Food: signature dish overhead, signature dish vertical, shared table scene, dessert close-up, drink on dark background, ingredient macro, fire/smoke preparation, chef finishing a dish.

Human/hospitality: server presenting dish, hands pouring drink, guests sharing plates, staff movement with motion blur, chef/founder environmental portrait, team moment, event atmosphere.

## 9.3 Framing ratios

Hero desktop: 16:9 or 3:2 | Hero mobile: 4:5 or 9:16 | Editorial vertical: 4:5 | Story portrait: 2:3 | Gallery landscape: 3:2 | Wide section banner: 2:1

## 9.4 Composition rules

Keep 25-45% negative space in hero candidates. Use foreground layers. Let objects exit the frame. Avoid perfectly centred food in every image. Mix close, medium, and wide scenes. Use people as atmosphere, not stock-photo subjects.

## 9.5 Lighting and grade

Target: warm highlights, neutral skin tones, deep but detailed blacks, muted greens, restrained saturation, strong local contrast around food, visible texture.

Avoid: orange-and-teal cinematic presets, heavy HDR, over-sharpened food, artificial neon colors, white-background catalogue food imagery.

## 9.6 Home page image usage rhythm

1 dominant hero scene, 2-3 full-width environmental moments, 3-5 signature food frames, 1 human ritual sequence, 1 gathering sequence, 1 strong arrival/visit image.

## 9.7 Image asset naming

amani-home-hero-desktop-01.webp
amani-home-hero-mobile-01.webp
amani-signature-dish-01-4x5.webp
amani-space-evening-01-3x2.webp
amani-ritual-plating-01-4x5.webp
amani-gathering-shared-table-01-3x2.webp

Required fields: alt, caption, credit, focalPointX, focalPointY, sceneType, orientation, mobileAsset

## 9.8 Image generation prompts (placeholder assets only)

Exterior/arrival: "A cinematic editorial photograph of a refined contemporary restaurant integrated with natural landscaping at golden hour, warm stone, dark timber, soft greenery, quiet luxury, strong architectural composition, natural color grade, deep detailed shadows, no text, no logos, wide 3:2 with negative space for headline."

Signature dish: "A high-end editorial food photograph of a modern signature dish on matte clay tableware, directional late-afternoon sunlight, dark negative space, tactile ingredients, restrained warm earth palette, realistic fine dining, no text, vertical 4:5."

Shared table: "An intimate overhead hospitality scene with several hands sharing refined dishes around a warm timber table, candid gestures, natural daylight, elegant ceramic plates, no visible branding, vertical 4:5."

Evening interior: "A cinematic restaurant interior at night with warm amber practical lighting, dark timber and stone, guests as soft silhouettes, one table in crisp focus, subtle motion blur from a passing server, deep blacks, vertical 4:5."

Chef ritual: "A close editorial photograph of a chef hands finishing a dish under focused warm light, dark kitchen background, tactile steam and ingredients, understated uniform, documentary style, shallow depth of field, vertical 4:5."

Gatherings: "A refined private dining gathering in a warm contemporary restaurant, guests engaged naturally around shared plates, candlelight and soft architectural lighting, candid, premium editorial hospitality photography, wide 3:2."

---

# 10. VIDEO DIRECTION

Hero video: 8-14 seconds, seamless loop, 24 or 30 fps, no audio autoplay.
Shot flow: Light across material -> hand/ritual -> food detail -> table/gathering -> return to opening texture.
Rules: slow physical camera movement; avoid drone footage as only hero content; provide poster image; serve separate mobile encoding; mobile below 4MB; desktop below 8MB.

Scroll-linked video: only when footage is specifically produced for frame-accurate progression. Preferred alternatives: subtle playback-rate shift, image sequence of 30-60 optimized frames, pinned short scene with controlled progress. Disable scrubbing on low-power mobile.


---

# 11. REACT IMPLEMENTATION ARCHITECTURE

## 11.1 Project folder structure

```
src/
app/ (App.tsx, router.tsx, providers.tsx, RouteErrorBoundary.tsx)
components/
  actions/ (Button.tsx, TextLink.tsx, ReservationCTA.tsx)
  editorial/ (SectionLabel, SplitScene, ImageReveal, MaskedHeading, EditorialLink, QuoteScene)
  feedback/ (ErrorState, FormMessage, LoadingState)
  layout/ (UtilityBar, Header, MobileMenu, Footer, PageShell, Container, Section)
  media/ (ResponsiveImage, AmbientVideo, ImageReveal)
  motion/ (Reveal, StaggerGroup, ParallaxMedia, SplitTextReveal, RouteTransition, SmoothScrollProvider)
  navigation/ (NavLink, SkipLink, ScrollToTop)
  restaurant/ (MenuCategoryNav, MenuItem, MoodFinder, LiveStatus, GatheringArea, GalleryLightbox)
  seo/ (PageSeo, RestaurantJsonLd, BreadcrumbJsonLd)
config/ (brand.ts, navigation.ts, restaurant.ts, routes.ts, seo.ts)
content/ (home.ts, stories.ts, menu.ts, gatherings.ts, visit.ts, reviews.ts, faqs.ts)
features/ (enquiry/, live-status/, menu/, reservation/)
hooks/ (useMediaQuery, useReducedMotionPreference, useRouteAnnouncement, useScrollDirection, useHeaderTheme, useScrollLock)
layouts/ (PublicLayout.tsx)
lib/ (gsap.ts, motionTokens.ts, image.ts)
pages/ (home/, stories/, menu/, gatherings/, visit/, not-found/)
sections/ (home/, stories/, menu/, gatherings/, visit/)
styles/ (tokens.css, typography.css, utilities.css, globals.css)
types/ (content.ts, menu.ts, restaurant.ts)
utils/ (cn.ts, format.ts, links.ts, safeJsonLd.ts)
```

---

## 11.2 GSAP setup

```typescript
// src/lib/gsap.ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
export { gsap, ScrollTrigger };
```

Use @gsap/react and scoped contexts with useGSAP. Always clean up ScrollTriggers through the GSAP context.

---

## 11.3 Responsive GSAP with accessibility

```typescript
const mm = gsap.matchMedia();
mm.add(
  {
    motionOK: "(prefers-reduced-motion: no-preference)",
    reduceMotion: "(prefers-reduced-motion: reduce)",
    desktop: "(min-width: 1024px)",
  },
  (context) => {
    const { motionOK, desktop } = context.conditions;
    if (motionOK) {
      // Full choreography
    } else {
      gsap.set("[data-reveal]", { clearProps: "all", autoAlpha: 1 });
    }
    if (motionOK && desktop) {
      // Desktop-only parallax or sticky scene
    }
  }
);
// Always call mm.revert() through the relevant React cleanup mechanism.
```

---

## 11.4 Motion for React Reveal component

```typescript
import type { PropsWithChildren } from "react";
import { motion, useReducedMotion } from "motion/react";
import { motionTokens } from "../../lib/motionTokens";

interface RevealProps extends PropsWithChildren {
  delay?: number;
  distance?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, distance = motionTokens.distance.md, className }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: distance }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : motionTokens.duration.base,
        delay,
        ease: motionTokens.ease.standard,
      }}
    >
      {children}
    </motion.div>
  );
}
```

---

## 11.5 Smooth scroll provider

```typescript
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    const update = (time: number) => { lenisRef.current?.lenis?.raf(time * 1000); };
    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis?.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, smoothWheel: true, syncTouch: false, lerp: 0.08 }}>
      {children}
    </ReactLenis>
  );
}
```

---

## 11.6 Data attributes for animation

```html
<section data-scene="editorial">
  <p data-reveal="label">01 / STORY</p>
  <h2 data-reveal="heading">...</h2>
  <div data-reveal="image">...</div>
</section>
```

---

# 12. COPY AND CONTENT DIRECTION

## 12.1 Amani copy principles

Three-layer model: Poetic headline -> Clear one- or two-sentence explanation -> Direct action.

## 12.2 Brand lockup phrases

Primary: "Made between food and feeling."
Alternative: "A place shaped by warmth and belonging."
Use only one version consistently across loader, page transitions, and footer.

## 12.3 CTA vocabulary

Use: Reserve a Table, Explore the Menu, Plan a Gathering, Find Your Way, Discover the Story, View the Space.
Avoid: "Learn More" everywhere, "Get Started", "Unlock Experience", SaaS-style urgency copy.

---

# 13. RESPONSIVE BEHAVIOR

Desktop: cinematic whitespace, selective sticky/pinned sequences, asymmetric compositions, restrained pointer hover effects.

Tablet: remove unnecessary pinning, reduce heading scale, convert 3-column layouts to 2 columns.

Mobile: build independently (not merely stacked desktop), minimum 16px body text, 44px minimum interactive targets, disable cursor effects and magnetic interactions, no horizontal overflow at 375px.

---

# 14. ACCESSIBILITY

Required: semantic headings in logical order, visible keyboard focus, skip link, full keyboard navigation for menus/filters/accordions/lightbox, meaningful alt text (empty alt for decorative images), form errors via aria-describedby, aria-current="page" on active nav, aria-expanded on menu trigger, lightbox dialog semantics, focus restoration when overlays close, minimum WCAG 2.2 AA contrast, no meaning by color alone.

Motion reduction:
```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

# 15. PERFORMANCE

Animate primarily transform and opacity. Avoid continuous animation of large blur filters, box shadows, layout properties. Use clip-path selectively and test on mobile. Never apply will-change globally. Hero image: 180-350KB; editorial image: 80-220KB. Use AVIF first, WebP fallback; responsive srcset. Do not scrub ordinary headings or every card.

---

# 16. ANTI-PATTERNS

Do not introduce: glassmorphism, neon accents, excessive gradients, large rounded SaaS cards, repeated pill components, floating blobs, generic 3D objects, cursor trails, constant text marquees on important information, bouncy spring animation on editorial content, auto-playing audio, scroll hijacking, every heading split into characters, motion that blocks booking or menu access, two animation libraries controlling the same element property.

---

# 17. IMPLEMENTATION PHASES

Phase 1 - Foundation: Tokens, Typography, Grid, Header/utility bar, Global responsive rules, Accessibility baseline, Image component

Phase 2 - Core editorial components: Section label, Masked heading, Image reveal, Split scene, Editorial link, Quote scene, Footer

Phase 3 - Page structure: Home, Stories, Menu, Gatherings, Visit (preserve existing data and routes)

Phase 4 - Functional interactions: Mood Finder, Sticky menu categories, Gallery filtering and lightbox, Live status, Event enquiry flow, Reservation links

Phase 5 - Motion: Add motion only after all responsive layouts work without animation.
Order: Header state -> Loader -> Hero reveal -> Section reveals -> Image parallax -> Page transitions -> Advanced pinned scenes

Phase 6 - Performance and QA: Lighthouse checks, Reduced motion, 375px overflow, Keyboard navigation, Low-power mobile testing, Asset compression, ScrollTrigger cleanup

---

# 18. DEFINITION OF DONE

The design is complete only when:
- A user can understand what Amani is within the first viewport
- Reservation remains available without dominating the emotional opening
- The page feels premium without relying on decorative effects
- Food, place, people, and gathering are equally represented
- Mobile feels intentionally designed
- The menu is easy to scan
- Location, hours, and directions are easy to find
- Event capacities and enquiry are clear
- All major interactions work by keyboard
- Reduced-motion mode is complete
- No horizontal overflow exists at 375px
- Existing routes, CMS data, APIs, and business logic remain intact
- Animation supports hierarchy and never delays an action

---

# 19. AGENT EXECUTION DIRECTIVE

Treat this markdown as the primary visual and motion specification for the Amani restaurant project. First inspect the existing React 19 + Vite + Tailwind CSS v4 codebase, routes, data sources, component contracts, and current responsive behavior. Preserve all working business logic, data, routes, and unrelated sections.

Implement the design system progressively. Build responsive static layouts before adding motion. Use GSAP/ScrollTrigger only for loaders, complex scroll choreography, masks, and page transitions; Motion for React for component presence and layout transitions; CSS for simple hover and focus states; and Lenis only as the single global smooth-scroll layer. Never allow two systems to control the same transform or opacity property on one DOM node.

The target aesthetic is editorial, warm, tactile, cinematic, spacious, and hospitality-led. Avoid gradients, glassmorphism, neon, excessive rounded cards, pills, SaaS styling, cursor gimmicks, and unnecessary animation. Use the --amani-* token system, Cormorant Garamond display typography, Manrope body/UI, strong image cropping, asymmetry, and generous negative space.

All interactions must support mobile, keyboard navigation, reduced motion, and no horizontal overflow at 375px. Clean up all GSAP contexts and ScrollTriggers. Optimize responsive images and videos. Do not ship animation that blocks booking, menu, location, or enquiry access.

---

# 20. CREATIVE TEST

Before approving any section, ask:

Does this make the guest feel the place, understand the offering, and know the next action -- without looking like a restaurant template?

If the answer is no: remove decoration, improve the image, shorten the copy, strengthen the hierarchy, and slow the motion.
