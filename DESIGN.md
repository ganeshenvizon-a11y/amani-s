# Amani's South Indian Kitchen — Design & Architecture Specification (`DESIGN.md`)

Welcome to the central design and development specification document for **Amani's South Indian Kitchen**. This document provides an exhaustive reference for the visual language, design system tokens, typography rules, spacing & layout system, interactive physics engines, component structures, and development practices.

---

## 1. Brand Vision & Design Philosophy

**Amani’s** is an elevated, tactile digital experience celebrating authentic South Indian and Andhra culinary traditions. 

### Core Design Pillars
1. **Tactile Editorial Craft**: High-contrast typography, vintage paper textures, organic torn edges, frosted scotch tape, rubber ink stamps, and physical card deck physics.
2. **Generous Dining & Memory**: Warm, atmospheric visual tones, rich dark void scenes (`#2E130B`), rice/paper canvases (`#F8F2E5`), and deep terracotta/maroon accents (`#7A1F24`, `#A34A31`).
3. **Smooth Micro-Interactions**: Critically damped spring physics, organic gravity drops, inertia-driven drag and throwing loops, dynamic cycling word reveals, and zero-snapping settling algorithms.

---

## 2. Comprehensive Design System Tokens

### 2.1 Color System (`src/styles/tokens.css`)

```css
:root {
  /* Canvases & Surfaces */
  --amani-canvas:          #F8F2E5; /* Primary warm rice canvas */
  --amani-paper:           #EFE5D4; /* Soft paper tint */
  --amani-sand:            #D8C7AA; /* Natural sand background */
  --amani-canvas-dim:      #EDE4D0; /* Cream surface shade (-8% lightness) */

  /* Ink & Text Spectrum */
  --amani-ink:             #171411; /* Primary heading & high-contrast ink */
  --amani-ink-soft:        #403A34; /* Soft body copy ink */
  --amani-ink-muted:       #746E66; /* Muted captions & subheadings */
  --amani-ink-faint:       rgba(23, 20, 17, 0.25);

  /* Brand Accents */
  --amani-maroon:          #7A1F24; /* Primary Amani maroon */
  --amani-maroon-dark:     #551317; /* Active/hover maroon */
  --amani-maroon-tint:     rgba(122, 31, 36, 0.1);
  --amani-terracotta:      #A2553E; /* Muted terracotta accent */
  --amani-terracotta-dark: #2E130B; /* Deep terracotta brown shade */
  --amani-olive:           #6D7254; /* Banana-leaf olive green */
  --amani-turmeric:        #C99732; /* Restrained turmeric yellow */

  /* Dark Editorial Scenes */
  --amani-void:            #2E130B; /* Deep terracotta dark background */
  --amani-dark-warm:       #3A190E; /* Surface dark warm container */
  --amani-cream-on-dark:   #F4EDDF; /* Ivory text on dark void */
  --amani-cream-muted:     rgba(244, 237, 223, 0.7);

  /* Hairlines & Borders */
  --amani-hairline:        rgba(23, 20, 17, 0.12);
  --amani-hairline-dark:   rgba(244, 237, 223, 0.15);

  /* Typography Families */
  --amani-font-display:    'Clash Display', 'Cabinet Grotesk', -apple-system, sans-serif;
  --amani-font-ui:         'Manrope', 'Tenor Sans', -apple-system, sans-serif;
}
```

---

## 3. Exhaustive Typography System

The typography system at Amani's is built around distinct font families, each serving a clear hierarchy and aesthetic role.

### 3.1 Font Family Hierarchy & Fallback Stacks

1. **Display & Editorial Headings (`--amani-font-display`)**:
   - **Stack**: `'Clash Display'`, `'Cabinet Grotesk'`, `-apple-system`, `sans-serif`
   - **Usage**: Main H1 titles, split hero lines, section headings, numbers, and editorial callouts.
   - **Style Traits**: Medium (`500`) to regular (`400`) weight, tight line-heights (`0.84` – `0.98`), subtle negative letter-spacing (`-0.03em` to `-0.055em`), `-webkit-font-smoothing: antialiased`.
2. **UI, Controls & Body Text (`--amani-font-ui`)**:
   - **Stack**: `'Manrope'`, `'Tenor Sans'`, `-apple-system`, `BlinkMacSystemFont`, `'Segoe UI'`, `sans-serif`
   - **Usage**: Body copy, kicker eyebrow tags, navigation links, button text, dietary labels.
   - **Style Traits**: Regular (`400`) to bold (`700`) weight, generous line-height (`1.6` – `1.65`), neutral letter-spacing.
3. **Monospace & Vintage Artifact Labels**:
   - **Stack**: `'Courier New'`, `monospace`
   - **Usage**: Rubber ink stamps (`.card-stamp`), retro card tags (`.card-tag`), card index captions (`.card-caption`), lightbox image captions (`figcaption`).
   - **Style Traits**: All-caps, bold (`700`–`800` weight), letter-spacing `0.1em` – `0.14em`.

---

### 3.2 Typography Scale & CSS Fluid Variable Reference

| Type Utility | CSS Variable / Class | Font Family | Size (Fluid Clamp / Rem) | Line Height | Letter Spacing | Color / Accent |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | `--font-hero` / `.text-hero` | `Clash Display` | `clamp(3.5rem, 8vw, 8.5rem)` | `0.92` | `-0.02em` | `var(--amani-ink)` / `#171411` |
| **Hero Editorial** | `.home-hero__title` | `Clash Display` | `clamp(1.75rem, 6.1vw, 7.3rem)` | `0.88` | `-0.03em` | `#171411` with text shadow |
| **Heading 1** | `--font-heading-1` / `.text-h1` | `Clash Display` | `clamp(2.5rem, 5.5vw, 5.5rem)` | `0.98` | `-0.015em` | `var(--amani-ink)` |
| **Heading 2** | `--font-heading-2` / `.text-h2` | `Clash Display` | `clamp(1.85rem, 3.8vw, 3.8rem)` | `1.05` | `-0.01em` | `var(--amani-ink)` |
| **Heading 3** | `--font-heading-3` / `.text-h3` | `Clash Display` | `clamp(1.4rem, 2.2vw, 2.4rem)` | `1.15` | `0em` | `var(--amani-ink)` |
| **Body Large** | `--font-body-lg` / `.text-body-lg`| `Manrope` | `clamp(1.05rem, 1.3vw, 1.35rem)`| `1.60` | `0em` | `var(--amani-ink-soft)` / `#403A34` |
| **Body Standard** | `--font-body` / `.text-body` | `Manrope` | `clamp(0.95rem, 1.05vw, 1.1rem)` | `1.65` | `0em` | `var(--amani-ink-soft)` / `#403A34` |
| **Body Caption** | `--font-caption` | `Manrope` | `clamp(0.85rem, 0.95vw, 0.95rem)`| `1.50` | `0em` | `var(--amani-ink-muted)` / `#746E66` |
| **Eyebrow Tag** | `--font-eyebrow` / `.text-eyebrow`| `Manrope` | `11px` (`0.68rem`) | `1.20` | `0.16em` uppercase | `var(--amani-maroon)` / `#7A1F24` |
| **Ink Stamp** | `.home-hero__card-stamp` | `Courier New` | `0.64rem` | `1.00` | `0.14em` uppercase | `rgba(150, 35, 25, 0.85)` |
| **Retro Tag** | `.home-hero__card-tag` | `Courier New` | `0.60rem` | `1.00` | `0.10em` uppercase | `#5a4838` |

---

### 3.3 Special Typographic Modifiers & Highlights

- **Spiced Accent Highlights (`.home-hero__word--fire`, `.menu-hero__word--spice`)**:
  - Color: `#A34A31` (Rich Terracotta Spice)
  - Weight: Medium (`500`)
- **Dynamic Cycling Word Reveal (`.home-hero__word--dynamic`, `.menu-hero__word--dynamic`)**:
  - Transition: `transform 650ms cubic-bezier(0.22, 1, 0.36, 1), opacity 650ms, filter 650ms`
  - `.is-idle`: `opacity: 1; transform: translateY(0); filter: blur(0);`
  - `.is-leaving`: `opacity: 0; transform: translateY(-10px); filter: blur(3px);`
  - `.is-entering`: `opacity: 0; transform: translateY(12px); filter: blur(3px);`
- **Editorial Emphasized Italicization (`h1 em`, `h2 em`)**:
  - Color: `#d68767`
  - Font Style: `normal` (styled via brand color distinction)

---

## 4. Spacing, Layout & Boundary System

The spacing system at Amani's uses fluid CSS clamps and token variables to ensure a mathematically precise grid across mobile, tablet, desktop, and ultra-wide displays.

### 4.1 Global Spacing Tokens & Container Boundaries

```css
:root {
  --amani-max-width:  1600px;                    /* Maximum container width ceiling */
  --amani-gutter:     clamp(1rem, 4vw, 3rem);   /* Fluid inline gutter padding */
  --amani-radius-sm:  4px;                      /* Subtle component border radius */
  --amani-radius-md:  8px;                      /* Card container border radius */
}
```

### 4.2 Standard Container Rules

All primary content blocks utilize the unified container pattern:
```css
.menu-story-container,
.menu-container {
  width: min(var(--amani-max-width), calc(100% - (var(--amani-gutter) * 2)));
  margin-inline: auto;
}
```

---

### 4.3 Section Padding Scale

| Utility / Selector | Top Padding | Bottom Padding | Typical Use Case |
| :--- | :--- | :--- | :--- |
| `.section-padding` | `clamp(4rem, 11vw, 11rem)` | `clamp(4rem, 11vw, 11rem)` | Standard full-page story sections |
| `.section-padding-sm` | `clamp(3rem, 6vw, 6rem)` | `clamp(3rem, 6vw, 6rem)` | Compact informational & CTA sections |
| `.menu-why`, `.menu-story` | `clamp(6rem, 12vw, 11rem)` | `clamp(6rem, 12vw, 11rem)` | Major editorial sections |
| `.menu-kitchen` | `clamp(6rem, 11vw, 10rem)` | `clamp(6rem, 11vw, 10rem)` | Dark void showcase sections |
| `.menu-section-heading` | — | `margin-bottom: clamp(3rem, 7vw, 6rem)` | Section header spacing |

---

### 4.4 Multi-Column Grid & Layout Systems

#### 1. Menu Why Grid (`.menu-why__grid`)
- **Structure**: 3-column responsive grid
- **Column Definition**: `grid-template-columns: repeat(3, minmax(0, 1fr));`
- **Gap**: `clamp(1rem, 2.4vw, 2.4rem)`
- **Asymmetric Offsets**: Second card offset downward via `padding-top: clamp(2.5rem, 8vw, 7rem)`

#### 2. Menu Story Layout (`.menu-story__layout`)
- **Structure**: Asymmetric 2-column editorial grid
- **Column Definition**: `grid-template-columns: minmax(18rem, 0.72fr) minmax(22rem, 1.08fr);`
- **Column Gap**: `clamp(2rem, 9vw, 10rem)`
- **Row Gap**: `clamp(3.5rem, 7vw, 7rem)`

#### 3. Menu Kitchen Layout (`.menu-kitchen__layout`)
- **Structure**: 2-column image & narrative split
- **Column Definition**: `grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.82fr);`
- **Gap**: `clamp(2rem, 9vw, 9rem)`

#### 4. Navigation Panel (`#amani-navigation-panel`)
- **Structure**: Full-screen slide-down overlay drawer
- **Padding**: `clamp(2rem, 5vw, 6rem)`
- **Primary Link Gap**: `clamp(1rem, 2vw, 2.5rem)`

---

### 4.5 Hero Card Deck Placement & Spacing Geometry

The interactive physics deck positions 6 retro cards across horizontal percentages with specific aspect ratios and z-indices:

```css
/* Card 01 */
.card:nth-child(1) { left: clamp(1.25rem, 5.5vw, 6.5rem); bottom: 0.3svh; width: clamp(8.8rem, calc(13.5vw * scale), 16.5rem); aspect-ratio: 0.76; z-index: 1; }

/* Card 02 */
.card:nth-child(2) { left: 21%; bottom: 2.3svh; width: clamp(8.2rem, calc(12vw * scale), 15rem); aspect-ratio: 0.98; z-index: 2; }

/* Card 03 */
.card:nth-child(3) { left: 34%; bottom: -1.7svh; width: clamp(8rem, calc(12.2vw * scale), 15.2rem); aspect-ratio: 1.02; z-index: 1; }

/* Card 04 */
.card:nth-child(4) { left: 50%; bottom: 3.3svh; width: clamp(9.4rem, calc(14.2vw * scale), 17.5rem); aspect-ratio: 0.77; z-index: 3; }

/* Card 05 */
.card:nth-child(5) { right: 23%; bottom: -1.2svh; width: clamp(7.8rem, calc(11.8vw * scale), 14.8rem); aspect-ratio: 1.0; z-index: 1; }

/* Card 06 */
.card:nth-child(6) { right: 12.5%; bottom: 2.3svh; width: clamp(8.4rem, calc(12.5vw * scale), 15.6rem); aspect-ratio: 0.96; z-index: 2; }
```

---

### 4.6 Responsive Breakpoints & Adaptations

- **`1600px` (Max Desktop)**: Maximum boundary width for content containers.
- **`900px` (Tablet)**:
  - Multi-column section headings collapse to single column stack (`grid-template-columns: 1fr`).
  - Story collage and kitchen layouts adapt to vertical stack.
- **`767px` (Mobile)**:
  - Reclaim top header clearance (`margin-top: -6rem` on full-bleed hero sections).
- **`680px` (Small Mobile)**:
  - Section headings clamp down to `clamp(3rem, 13vw, 4.8rem)`.
  - `.menu-why__grid` converts to single-column with `2.8rem` gaps.
  - Side notes (`.menu-story-hero__note`) hide to prevent viewport overflow.

---

## 5. Hero Architecture & Motion System

The Hero experience established on the **Home Page** serves as the core architectural blueprint for the **Menu Page Hero**.

```
┌────────────────────────────────────────────────────────────────────────┐
│                          SECTION.HERO-EDITORIAL                       │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ .hero__bg-pattern (Grain Overlay / hero-pattern.png)               │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ .hero__content (GSAP Split Title Reveal)                           │ │
│ │   • Kicker Eyebrow Tag                                             │ │
│ │   • H1 Title Line 1: Accent Word Highlight (.word--fire / --spice) │ │
│ │   • H1 Title Line 2: Dynamic Cycling Words (.word--dynamic)        │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ .hero__card-deck (Physics-Driven Interactive Retro Cards)          │ │
│ │   [Card 1]   [Card 2]   [Card 3]   [Card 4]   [Card 5]   [Card 6]  │ │
│ │   ├── Frosted Scotch Tape Strip (.card-tape)                       │ │
│ │   ├── Vintage Ink Stamp (.card-stamp)                              │ │
│ │   ├── Paper Crease (.card-crease)                                  │ │
│ │   ├── Media Frame + Vignette Overlay (.card-media)                 │ │
│ │   └── Retro Tag & Caption Footer (.card-footer)                    │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ .hero-image-lightbox (Modal Pop-Up Dialog on Click / Enter)        │ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### 5.1 Physics & Animation Engine Mechanics

1. **GSAP Entry Reveal**:
   - Target: `.title-line-inner`
   - Config: `fromTo({ yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.12, ease: 'power4.out' })`
2. **Dynamic Cycling Word State Machine**:
   - Delays: `[3200ms, 2600ms, 2600ms]`
   - Home Cycle: `Home` → `Love` → `Care`
   - Menu Cycle: `Memory` → `Tradition` → `Heritage`
   - State transition: `idle` → `leaving` (blur -10px) → `entering` (translate +12px) → `idle` (650ms cubic-bezier transition).
3. **Card Physics Machine States**:
   - `waiting`: Initial offscreen offset.
   - `falling`: Organic gravity drop (`velocityY += 3600 * dt`).
   - `settling`: Critically damped exponential spring easing (`1 - Math.exp(-14 * dt)`) with zero snapping.
   - `dragging`: Dynamic pointer tracking with viewport clamping and tilt calculation (`deltaX * 0.025`).
   - `throwing`: Inertia decay (`pow(0.02, dt)`), boundary bounce (`velocityY *= -0.28`), and rotational decay.
4. **Accessibility Compliance**:
   - Full keyboard activation via standard `Enter` and `Space` keys.
   - `prefers-reduced-motion` detection: Disables fall/throw animations and immediately locks cards to resting poses.
   - Escape key modal close handler with body overflow lock (`image-lightbox-open`).

---

## 6. Page & Component Architecture

### 6.1 Home Page (`src/pages/home/HomePage.tsx`)
- **`Hero.tsx`**: Flagship editorial hero with 6 family dining & culinary photo cards.
- **`GatheringStatement.tsx`**: Transition section introducing room & table philosophy.
- **`MoodFinder.tsx`**: Interactive mood selection tool suggesting dining experiences.
- **`ThaliExperience.tsx`**: Traditional South Indian banana leaf & thali showcase.
- **`AmaniNumbers.tsx`**: Brand milestones, spices ground, years of heritage.
- **`BrandStory.tsx`**: Heritage timeline & kitchen philosophy.
- **`SignatureDishes.tsx`**: Interactive carousel of flagship recipes.
- **`GuestReviews.tsx`**: Testimonials from regulars & families.
- **`VisitPreview.tsx` & `GatheringsPreview.tsx`**: Closing invitation to reserve a seat.

### 6.2 Menu Page (`src/pages/menu/MenuPage.tsx`)
- **`Hero.tsx`**: Redesigned with exact architectural parity to the Home Page Hero, featuring 6 flagship menu cards (*Avakai Biryani*, *Chepala Pulusu*, *Royal Thali*, *Naatu Kodi*, *Bhimavaram Pulav*, *Gongura Mutton*).
- **`StickyCategories.tsx`**: Sticky jump navigation (`Soups`, `Starters`, `Breads`, `Curries`, `Biryanis`, `Beverages`, `Desserts`).
- **`MenuIntroduction.tsx`**: Warm editorial introduction to Andhra food craft.
- **`MoodFinder.tsx`**: Interactive "What are you feeling?" dish recommendation engine.
- **`MenuCategories.tsx`**: Full menu grid displaying 19 groups and 150+ regional dishes with dietary indicators (`veg`, `non_veg`, `egg`) and live pricing.
- **`DietaryInformation.tsx`**: Comprehensive guide for dietary needs and allergies.
- **`DishDetailExperience.tsx`**: High-resolution spotlight on signature dishes like *Natukodi Pulusu*.
- **`QROrdering.tsx`**: In-restaurant digital ordering banner.
- **`ClosingReservation.tsx`**: Final CTA encouraging table bookings.

### 6.3 Stories Page (`src/pages/stories/StoriesPage.tsx`)
- **`Hero.tsx`**, **`ThePhilosophy.tsx`**, **`WhyAmani.tsx`**, **`OurBeginning.tsx`**, **`OurPeople.tsx`**, **`FromKitchenToTable.tsx`**, **`ADayAtAmani.tsx`**, **`ClosingInvitation.tsx`**.

### 6.4 Global Navigation & Layout ([src/components/layout/Header.tsx](file:///c:/Users/priyansu/Downloads/amm-v1/src/components/layout/Header.tsx))
- **`PublicLayout.tsx`**: Wraps routes in top header and bottom footer.
- **`Header.tsx`**: Floating glassmorphism navbar with slide-down full navigation panel (`#amani-navigation-panel`), smooth GSAP animations, touch/wheel scroll event propagation guards, active route indicators (`aria-current="page"`).
- **`router.tsx`**: Root React Router v6 setup with Lenis smooth scrolling integration, immediate top-scroll reset on route change, and layout-stable suspense fallback loader.

---

## 7. File Structure Reference

```
src/
├── app/
│   └── router.tsx                # Application router & AppShell layout
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Global site header & navigation panel
│   │   └── Footer.tsx            # Editorial site footer
│   └── motion/
│       ├── Reveal.tsx            # Motion reveal component
│       └── RangoliPattern.tsx    # SVG Rangoli motif generator
├── content/
│   ├── menu.ts                   # Complete menu data source (19 groups, 150+ dishes)
│   └── seo.ts                    # SEO metadata and JSON-LD schema generators
├── lib/
│   └── gsap.ts                   # GSAP instance with ScrollTrigger registration
├── pages/
│   ├── home/HomePage.tsx         # Complete Home page
│   ├── menu/MenuPage.tsx         # Complete Menu page
│   ├── stories/StoriesPage.tsx   # Stories & heritage page
│   ├── gatherings/               # Gatherings & private dining
│   ├── visit/                    # Location, hours & reservations
│   └── not-found/                # 404 error page
├── sections/          
│   ├── home/
│   │   └── Hero.tsx              # Home editorial physics hero section
│   └── menu/
│       ├── Hero.tsx              # Menu editorial physics hero section
│       ├── StickyCategories.tsx  # Floating category jumper
│       ├── MenuIntroduction.tsx  # Editorial introduction
│       ├── MoodFinder.tsx        # Interactive dish recommendation tool
│       ├── MenuCategories.tsx    # Complete menu dish grid
│       ├── DietaryInformation.tsx# Dietary guide
│       ├── DishDetailExperience.tsx # Dish spotlight
│       ├── QROrdering.tsx        # QR ordering callout
│       └── ClosingReservation.tsx# Booking CTA
└── styles/
    ├── tokens.css                # CSS custom properties & color tokens
    ├── typography.css            # Typography classes & font scaling
    ├── globals.css               # Global baseline & Home Hero deck styles
    ├── menu.css                  # Menu page & Menu Hero deck styles
    ├── navbar.css                # Header & mobile drawer styles
    ├── footer.css                # Footer styles
    ├── cinematic.css             # Dark editorial scene styles
    └── loader.css                # Route loading & transition styles
```

---

## 8. Developer Guidelines & Best Practices

1. **Architecture Parity**: When extending or building new section heroes, maintain consistency with the `Hero.tsx` physics deck pattern, using identical CSS variables, GSAP timing functions, and reduced motion safety checks.
2. **Design Token Integrity**: Always reference custom properties defined in `tokens.css` (`var(--amani-canvas)`, `var(--amani-maroon)`, `var(--amani-void)`) rather than hardcoding ad-hoc hex values.
3. **TypeScript Strictly Validated**: Ensure all dish types, menu group schemas, and motion states maintain strict typing (`npx tsc --noEmit`).
4. **Performance First**: Maintain lazy loading on secondary image assets (`loading="lazy"`) and keep heavy GSAP ScrollTrigger contexts bounded inside `gsap.context()` for clean memory cleanup on component unmount.

---
*Updated & Maintained for Amani's South Indian Kitchen codebase.*
