/**
 * Amani — unified motion token system.
 * Single source of truth for all animation values.
 * Import this instead of hardcoding durations/eases/distances.
 * See AMANI_DESIGN_MOTION_IMAGERY_SYSTEM.md § 4 for full reference.
 */

export const motionTokens = {
  duration: {
    instant:   0.18,   // immediate feedback (hover color)
    micro:     0.22,   // micro interactions
    fast:      0.35,   // button / card hover
    base:      0.60,   // standard content reveal
    slow:      0.92,   // deliberate section transitions
    cinematic: 1.35,   // image curtain / hero choreography
    scene:     1.80,   // page-level orchestration
  },

  ease: {
    standard:  [0.22, 1, 0.36, 1] as const,   // default: strong decel
    enter:     [0.16, 1, 0.3,  1] as const,   // content entering view
    exit:      [0.7,  0, 0.84, 0] as const,   // content leaving
    editorial: [0.76, 0, 0.24, 1] as const,   // deliberate, weighty
  },

  distance: {
    xs:   8,    // micro shift
    sm:  16,    // small reveal
    md:  24,    // standard text reveal
    lg:  40,    // block reveal
    hero: 88,   // scene-level movement
  },

  stagger: {
    tight:   0.05,
    base:    0.08,
    relaxed: 0.12,
  },

  spring: {
    type:      'spring' as const,
    stiffness: 320,
    damping:   30,
    mass:      0.8,
  },

  imageHoverScale: 1.035,
  cardHoverLift:   4,       // px
  pressScale:      0.985,
} as const;

/** GSAP ease string equivalents for use with gsap.to() */
export const gsapEase = {
  enter:     'power3.out',
  cinematic: 'power4.inOut',
  soft:      'sine.out',
  linear:    'none',
} as const;
