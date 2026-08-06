/**
 * GSAP library setup — single registration point.
 * Import this file (not 'gsap' directly) in any component that needs GSAP
 * so ScrollTrigger is always registered before use.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
