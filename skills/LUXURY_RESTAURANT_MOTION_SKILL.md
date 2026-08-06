---
name: luxury-restaurant-motion
description: Design, implement, refine, or audit individual sections and interaction systems for a premium restaurant website or web application using React, Vite, Tailwind CSS, Motion for React, GSAP, ScrollTrigger, Lenis, and Lucide. Use when asked to create or improve restaurant heroes, navigation, menus, dish grids, editorial stories, reservation flows, loaders, transitions, hover effects, or scroll choreography while preserving the existing application and delivering minimal, luxurious, accessible, responsive, production-ready motion.
---

# Luxury Restaurant Motion System

## Purpose

Build restaurant interfaces that feel editorial, restrained, tactile, cinematic, and expensive. “Awwwards-level” means strong art direction, controlled timing, meaningful choreography, excellent typography, responsive behavior, accessibility, and performance. It does **not** mean animating everything.

This skill is optimized for the following project direction:

- React 19 with Vite
- Tailwind CSS v4
- Motion for React, imported from `motion/react`
- GSAP with ScrollTrigger and `@gsap/react`
- Lenis smooth scrolling
- Lucide React icons
- Existing content, routes, data, state, APIs, and business logic must remain intact unless the task explicitly changes them

When the repository differs, inspect it first and adapt without forcing this stack or rewriting unrelated code.

## Default visual direction

Preserve the existing design system when one exists. All tokens use the `--amani-*` prefix (defined in `src/styles/tokens.css` and `src/lib/motionTokens.ts`). When no system exists yet, use these resolved values:

- Warm ivory background: `--amani-canvas` (`#F8F2E5`)
- Wine accent: `--amani-wine` (`#7A1F24`)
- Warm ink: `--amani-ink` (`#171411`)
- Ink soft: `--amani-ink-soft` (`#403A34`)
- Muted copy: `--amani-muted` (`#746E66`)
- Soft border: `--amani-line` (`rgba(23, 20, 17, 0.16)`)
- Dark scene background: `--amani-night` (`#11100E`)
- Light on dark: `--amani-light-on-dark` (`#F4EDDF`)
- Display typography: `--amani-font-display` — Cormorant Garamond Variable
- UI and body typography: `--amani-font-ui` — Manrope Variable
- Editorial asymmetry, generous negative space, restrained borders, strong image cropping, and intentional alignment
- No gradients unless the current brand already depends on them
- No excessive glassmorphism, neon glows, pills, rounded cards, floating blobs, or generic SaaS styling
- Avoid repeated boxed sections. Let typography, spacing, imagery, rules, and rhythm create hierarchy

## Non-negotiable rules

1. Inspect the existing repository, package manager, `package.json`, app entry, routing, global styles, current animation setup, and the target section before editing.
2. Modify only the requested section and the smallest supporting files required.
3. Preserve business logic, accessibility semantics, routes, CMS bindings, API calls, analytics hooks, and responsive behavior.
4. Reuse installed libraries and existing providers. Never duplicate GSAP registration, Lenis instances, global listeners, or animation utilities.
5. Install a dependency only when it is genuinely missing and necessary. Use the project’s package manager and lockfile.
6. Build the static responsive layout first. Add animation only after the layout is correct.
7. Assign **one animation owner to each property**. Never let Motion and GSAP simultaneously control the same element property.
8. Do not add fake loading delays, scroll hijacking, excessive pinning, artificial page height, or animation that blocks reading or navigation.
9. Desktop effects must have a deliberate mobile and reduced-motion behavior.
10. Finish by running available lint, type-check, test, and production-build commands. Fix errors caused by the change.

## Animation ownership matrix

Choose the smallest capable tool.

### CSS owns

Use CSS transitions or keyframes for:

- Simple color, border-color, background, underline, and icon-color transitions
- Very small decorative loops that do not depend on React state or scroll
- Native sticky positioning and responsive layout
- Marquees only when a simple CSS implementation is sufficient

Do not introduce Motion or GSAP for a basic color hover.

### Motion for React owns

Use Motion for component-level and state-driven interaction:

- `initial`, `animate`, `exit`, and `AnimatePresence`
- Hover, tap, focus, drag, and press feedback
- Modals, drawers, mobile menus, dropdowns, toast messages, and accordions
- Shared layout transitions with `layout` and `layoutId`
- Small `whileInView` reveals and simple scroll-linked transforms using `useScroll`, `useTransform`, and `useSpring`
- Reusable variants and short card or text staggers

Use the modern package and imports:

```bash
npm install motion
```

```jsx
import { motion, AnimatePresence, MotionConfig } from "motion/react"
```

Do not add the legacy `framer-motion` package to a new setup. If the project already uses it, assess migration risk before changing imports.

### GSAP owns

Use GSAP when an effect needs a coordinated timeline or precise imperative control:

- Loader and initial page choreography
- Multi-element hero entrances
- Mask, clip-path, image-curtain, line, or logo sequences
- Complex hover timelines with multiple dependent layers
- Text-line choreography when accessible text splitting is handled correctly
- Timeline labels, overlaps, reversals, and repeatable sequences

In React, prefer `useGSAP()` from `@gsap/react` with a scoped ref and automatic cleanup.

```jsx
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)
```

Never create unscoped selectors that can accidentally animate another section. Do not use raw `useEffect` for GSAP when `useGSAP` can provide reliable cleanup.

### ScrollTrigger owns

Use ScrollTrigger only when the animation is truly scroll-driven:

- Controlled parallax
- Scroll progress tied to a section
- Sticky editorial storytelling
- Image expansion or zoom tied to section progress
- Carefully designed horizontal portfolio or dish storytelling
- Pinning that is essential to the narrative

Use `gsap.matchMedia()` for responsive setup and cleanup. Do not use the deprecated `ScrollTrigger.matchMedia()`.

Default content reveals should usually be triggered, not scrubbed:

```js
scrollTrigger: {
  trigger: section,
  start: "top 78%",
  once: true,
}
```

Use numeric scrub only for a genuinely continuous effect:

```js
scrub: 0.6
```

Do not scrub ordinary headings, paragraphs, buttons, or every card. Do not pin ordinary content sections.

### Lenis owns

Lenis owns smooth scrolling only. Create exactly one root Lenis instance. It must not own element animation.

Preferred React setup when GSAP drives the animation frame:

```jsx
import { ReactLenis } from "lenis/react"
import "lenis/dist/lenis.css"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const update = (time) => {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    const lenis = lenisRef.current?.lenis
    lenis?.on("scroll", ScrollTrigger.update)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis?.off("scroll", ScrollTrigger.update)
      gsap.ticker.remove(update)
    }
  }, [])

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        smoothWheel: true,
        syncTouch: false,
        lerp: 0.08,
      }}
    >
      {children}
    </ReactLenis>
  )
}
```

Before adding this provider, search for an existing Lenis instance or scroll provider. Do not apply CSS `scroll-behavior: smooth` on top of Lenis. Native touch scrolling should remain predictable.

## Motion language and timing

Luxury motion should feel calm, intentional, and responsive.

### Default easing

Use this brand easing for deliberate reveals:

```js
const luxuryEase = [0.22, 1, 0.36, 1]
```

GSAP equivalent:

```js
ease: "power3.out"
```

### Recommended ranges

- Micro interaction: `0.16–0.28s` (use `motionTokens.duration.micro`)
- Button or card hover: `0.22–0.38s` (use `motionTokens.duration.fast`)
- Content reveal: `0.5–0.75s` (use `motionTokens.duration.base`)
- Hero choreography: `0.8–1.4s` (use `motionTokens.duration.cinematic`)
- Image mask reveal: `0.9–1.5s`
- Child stagger: `0.05–0.10s` (use `motionTokens.stagger.tight` to `motionTokens.stagger.base`)
- Ambient loop: `4–10s`, subtle, and disabled for reduced motion
- Standard reveal distance: `16–32px` (use `motionTokens.distance.sm` to `motionTokens.distance.lg`)
- Image hover scale: `1.025–1.035` (use `motionTokens.imageHoverScale`)
- Card hover lift: `2–4px` (use `motionTokens.cardHoverLift`)

Avoid elastic, bounce, and exaggerated back easing unless the brand specifically calls for playfulness. Restaurant luxury should normally use restrained spring physics or strong ease-out curves.

## Reusable effect recipes

Choose only the effects that support the section’s story.

### Editorial content reveal

- Eyebrow appears first
- Heading lines reveal through overflow masks
- Supporting copy follows with a short stagger
- CTA enters last
- Do not animate every word in body text
- Use `once: true` for standard content reveals

### Image curtain reveal

- Wrapper uses `overflow: hidden`
- Reveal with `clip-path`, scale, or a translating cover layer
- Image settles from approximately `scale: 1.06` to `1`
- Avoid heavy blur
- Keep the image visible in reduced-motion mode

### Dish card hover

- Image scales no more than `1.05`
- Overlay or metadata changes subtly
- Arrow moves `3–5px`
- Card does not jump, tilt excessively, or obscure the dish name and price
- Touch devices receive a clear static state rather than fake hover

### Luxury button

- Use a semantic `<button>` or `<a>`
- Keep text readable throughout
- A background layer may slide or expand behind the label
- Arrow can translate slightly
- Press scale should stay near `0.98`
- Maintain visible keyboard focus
- Magnetic behavior is optional and desktop-only for `pointer: fine`; movement must remain under roughly `8px`

### Navbar

- Transparent over the hero only when contrast remains readable
- Transition to a solid warm background after scrolling
- Hide-on-down/show-on-up is optional and must not make navigation difficult
- Mobile menu uses `AnimatePresence`, focus management, Escape-to-close, and body-scroll handling

### Marquee

- Slow, editorial, and readable
- Repeat content seamlessly
- Pause or become static for reduced motion
- Do not use a fast ticker for important information

### Loader

Add a loader only when explicitly requested or when real initialization requires it.

- GSAP owns the complete loader timeline
- Use the restaurant mark, ring, wordmark, or a restrained mask—not a generic spinner
- Do not manufacture a long wait; exit as soon as critical assets are ready
- Prefer a maximum visual sequence around `1.2–2.2s` when content is already ready
- Skip or shorten on repeat visits when appropriate
- Reduced-motion users receive a nearly immediate opacity transition
- Kill the timeline and restore scroll on unmount or interruption

### Sticky storytelling

Use for one high-value narrative such as chef philosophy, ingredient sourcing, or a signature-dish process.

- CSS owns `position: sticky`
- ScrollTrigger or Motion links only the necessary visual properties
- Keep readable content in normal document flow
- Avoid trapping the user in a very long pinned scene
- On mobile, replace with stacked content or a simple reveal unless pinning remains clearly usable

### Horizontal storytelling

Use sparingly for gallery-like content, never for core menu navigation.

- Provide a vertical mobile fallback
- Ensure keyboard and touch access
- Prevent horizontal page overflow
- Do not create artificial scroll distance without meaningful content

## Section implementation workflow

Follow this sequence every time.

### 1. Inspect

Identify:

- Target component and related styles
- Existing animation imports and providers
- Existing design tokens and typography
- Data source, props, CMS fields, routes, and state
- Desktop and mobile behavior
- Whether a reference image or video is available

### 2. Define the section contract

Before coding, decide internally:

- Primary user goal
- Visual focal point
- One dominant motion idea
- Supporting micro-interactions
- Triggered versus scroll-linked behavior
- Mobile fallback
- Reduced-motion fallback
- Which library owns each animated property

Do not add unrelated animation merely to appear advanced.

### 3. Build the static section

- Use semantic HTML
- Preserve real content and data
- Establish responsive grid, spacing, typography, image ratios, and overflow behavior
- Verify the section at `375px`, `768px`, `1024px`, and a large desktop width
- Ensure it works without animation before proceeding

### 4. Add motion progressively

Recommended order:

1. Essential state transitions
2. Entrance choreography
3. Hover and focus feedback
4. One optional scroll-linked or advanced effect
5. Ambient decoration only when it strengthens the composition

### 5. Validate

Check:

- No duplicate Lenis instance
- No duplicate or leaked ScrollTriggers
- No Motion/GSAP property conflicts
- React Strict Mode does not duplicate timelines
- No hydration issue if the project uses SSR
- No horizontal overflow
- No text or button becomes unreachable
- Images remain visible before JavaScript or under reduced motion
- Route changes and browser back navigation still work
- Modals, drawers, and menus clean up scroll locks and listeners

### 6. Report

After implementation, state:

- Files changed
- Design and motion decisions
- Library used for each effect
- Mobile and reduced-motion behavior
- Commands run and whether they passed
- Any remaining limitation based on missing assets or project context

## Accessibility requirements

- Respect `prefers-reduced-motion`
- Wrap the application with `<MotionConfig reducedMotion="user">` when Motion is used globally
- Use `useReducedMotion()` or a media query to remove large movement and parallax
- Use `gsap.matchMedia()` with `(prefers-reduced-motion: reduce)` for GSAP timelines
- Keep opacity-only or instant state changes where motion is disabled
- Never hide essential content permanently in an initial animated state
- Preserve semantic heading order
- Ensure buttons and cards are keyboard operable
- Maintain visible focus styles
- Decorative cloned marquee or split-text fragments must be `aria-hidden="true"`
- Keep one accessible unsplit text representation for screen readers
- Never rely on hover alone to expose essential information

Example GSAP accessibility setup:

```js
const mm = gsap.matchMedia()

mm.add(
  {
    motionOK: "(prefers-reduced-motion: no-preference)",
    reduceMotion: "(prefers-reduced-motion: reduce)",
    desktop: "(min-width: 900px)",
  },
  (context) => {
    const { motionOK, desktop } = context.conditions

    if (motionOK) {
      // Create the complete choreography.
    } else {
      gsap.set("[data-reveal]", { clearProps: "all", autoAlpha: 1 })
    }

    if (motionOK && desktop) {
      // Optional desktop-only parallax or sticky scene.
    }
  },
)
```

Always call `mm.revert()` through the relevant React cleanup mechanism.

## Performance requirements

- Prefer `transform` and `opacity`
- Avoid continuously animating layout properties such as `top`, `left`, `width`, and `height`
- Use `clip-path` selectively and test it on mobile
- Avoid large animated blur, backdrop-filter, and full-screen filter effects
- Never apply `will-change` globally; add it only shortly before expensive transforms if needed
- Avoid dozens of independent ScrollTriggers; group or batch simple reveals when appropriate
- Do not refresh ScrollTrigger on every render
- Refresh after meaningful layout changes, font readiness, or critical image loading only when necessary
- Give images explicit dimensions or aspect ratios to prevent layout shift
- Prioritize the hero image; lazy-load below-the-fold images
- Avoid Canvas, WebGL, Three.js, heavy video, or new animation libraries unless explicitly requested
- Test on an average mobile viewport and with CPU throttling when possible
- Prefer one memorable hero or storytelling moment over many medium-complexity effects

## Responsive rules

- Design mobile behavior intentionally; do not merely shrink desktop
- Below approximately `900px`, simplify or remove cursor effects, hover-only interactions, horizontal storytelling, and complex pinning
- Use stacked cards and normal document flow where advanced desktop choreography harms readability
- Keep tap targets at least `44px`
- Prevent clipping at `375px`
- Avoid mobile `100vh` problems; use modern viewport units such as `min-h-svh` or `min-h-dvh` when supported by the project
- Test sticky headers, mobile menus, modals, and browser address-bar changes

## Code-quality rules

- Use refs instead of broad document selectors
- Scope GSAP selectors to the target component
- Clean up timelines, triggers, ticker callbacks, event listeners, and observers
- Keep animation constants in a small local or shared motion-token module when reused
- Do not create a huge universal animation component with dozens of props
- Use data attributes such as `data-reveal`, `data-line`, or `data-image` only when they make scoped timeline selection clearer
- Keep component names and file organization aligned with the existing repository
- Do not replace working Tailwind styles with a second styling system
- Do not output placeholders where a usable existing asset or content source is available

## Default motion tokens

All motion values must be imported from `src/lib/motionTokens.ts`. Use or adapt this unified token set. Do not use arbitrary hardcoded values.

```js
// Import from src/lib/motionTokens.ts
export const motionTokens = {
  duration: {
    instant:   0.18,   // immediate feedback
    micro:     0.22,   // micro interactions
    fast:      0.35,   // button / card hover
    base:      0.60,   // standard content reveal
    slow:      0.92,   // deliberate section transitions
    cinematic: 1.35,   // image curtain / hero choreography
    scene:     1.80,   // page-level orchestration
  },
  ease: {
    standard:  [0.22, 1, 0.36, 1],   // default: strong decel
    enter:     [0.16, 1, 0.3,  1],   // content entering view
    exit:      [0.7,  0, 0.84, 0],   // content leaving
    editorial: [0.76, 0, 0.24, 1],   // deliberate, weighty
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
    type:      "spring",
    stiffness: 320,
    damping:   30,
    mass:      0.8,
  },
  imageHoverScale: 1.035,
  cardHoverLift:   4,
  pressScale:      0.985,
};

export const gsapEase = {
  enter:     "power3.out",
  cinematic: "power4.inOut",
  soft:      "sine.out",
  linear:    "none",
};
```

## Prompt interpretation rules

When the user asks to improve a section:

- Treat attached screenshots or videos as visual references, not permission to copy inaccessible proprietary assets
- Preserve all stated content and functionality
- Infer sensible details from the existing project rather than repeatedly asking basic questions
- When the prompt says “Awwwards-level,” implement restraint, hierarchy, and polished transitions—not random effects
- When the prompt says “same design system,” reuse current tokens, radii, type scale, spacing, and components
- When the prompt says “do not affect animations,” preserve existing timelines and modify only layout or styling
- When the task is implementation, edit the repository; do not return only suggestions or pseudocode

## User prompt template

The user can activate this skill with a prompt like:

```text
Use the luxury-restaurant-motion skill.

Task: Redesign and implement only the [SECTION NAME] section in the existing restaurant application.

Goal:
[Describe what the section should communicate and what the user should do.]

Preserve exactly:
- Existing content/data: [LIST]
- Existing functionality and APIs
- Existing design tokens and unrelated sections
- [OTHER CONSTRAINTS]

Visual direction:
- Minimal, editorial, premium restaurant aesthetic
- [REFERENCE IMAGE OR DESCRIPTION]
- Motion intensity: subtle / balanced / cinematic

Motion request:
- Required effects: [LIST OR “choose the best restrained effects”]
- Advanced scroll-linked effect allowed: yes / no
- Pinning allowed: yes / no
- Loader required: yes / no

Technical requirements:
- Inspect the repository before editing
- Reuse the existing Motion, GSAP, ScrollTrigger, and Lenis setup
- Do not duplicate providers or imports
- Implement responsive and reduced-motion alternatives
- Modify only the target section and necessary supporting files
- Run the available lint/type-check/build commands

Deliver the working implementation, then report files changed, motion ownership, responsive behavior, accessibility behavior, and validation results.
```

## Fast prompt for everyday section work

```text
Use the luxury-restaurant-motion skill. Improve only the [SECTION] in the existing restaurant app. Preserve its content, data, functions, routes, and the rest of the page. Make the layout minimal, editorial, luxurious, and conversion-focused. Choose one restrained signature animation plus necessary micro-interactions. Reuse the existing Motion/GSAP/ScrollTrigger/Lenis setup without conflicts or duplicate instances. Build mobile and reduced-motion fallbacks, run the project checks, and implement the result instead of only explaining it.
```

## Definition of done

A section is complete only when:

- It looks intentional before animation is enabled
- It fits the existing restaurant brand
- Motion clarifies hierarchy or interaction
- One library owns each animated property
- Desktop, tablet, mobile, keyboard, touch, and reduced-motion states work
- No unrelated section or business logic was changed
- No animation leaks, duplicate triggers, or duplicate smooth-scroll instances remain
- The production build succeeds, or any unrelated pre-existing failure is clearly identified
