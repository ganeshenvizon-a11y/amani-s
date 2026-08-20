/**
 * Footer — 100VH Cinematic Interactive Footer Component for Amani
 * Production UI/UX refined implementation with clear image atmosphere, center logo focal point & baseline alignment.
 */

import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from '../../lib/gsap';
import { RESTAURANT_CONFIG } from '../../config/restaurant';
import { BRAND_CONFIG } from '../../config/brand';

function InstagramIcon({ className = 'footer-social-icon' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.45" cy="6.55" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className = 'footer-social-icon' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.8 21v-8h2.7l.4-3.1h-3.1V7.95c0-.9.25-1.5 1.56-1.5H17V3.68A22.9 22.9 0 0 0 14.58 3C12.18 3 10.54 4.47 10.54 7.16V9.9H8v3.1h2.54v8h3.26Z" />
    </svg>
  );
}

function WhatsAppIcon({ className = 'footer-social-icon' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.5 11.5a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.55-4.35A8.4 8.4 0 1 1 20.5 11.5Z" />
      <path d="M8.9 8.05c.18-.44.37-.45.65-.46h.55c.17 0 .42.06.51.38l.7 1.65c.08.2.05.43-.08.6l-.48.62c-.1.13-.1.3-.02.43.37.64.9 1.17 1.55 1.54.13.08.3.07.43-.03l.62-.48c.17-.13.4-.16.6-.08l1.65.7c.32.1.38.34.38.51v.55c-.01.28-.02.47-.46.65-.39.16-1.26.05-2.44-.52-1.04-.5-2.15-1.46-2.88-2.75-.57-1.01-.68-1.81-.51-2.18Z" />
    </svg>
  );
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const mediaImgRef = useRef<HTMLImageElement>(null);

  // Smooth pointer tracking interpolation
  const targetPos = useRef({ x: 50, y: 50 });
  const currentPos = useRef({ x: 50, y: 50 });
  const animFrameId = useRef<number | null>(null);
  const isHovered = useRef(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // Check media query for coarse pointer / reduced motion
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Pointer move listener with smooth 0.07 lerp loop
    const updatePosition = () => {
      if (!isHovered.current || isCoarse || prefersReducedMotion) {
        animFrameId.current = null;
        return;
      }

      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.07;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.07;

      footer.style.setProperty('--mx', `${currentPos.current.x.toFixed(2)}%`);
      footer.style.setProperty('--my', `${currentPos.current.y.toFixed(2)}%`);

      animFrameId.current = requestAnimationFrame(updatePosition);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isCoarse || prefersReducedMotion) return;
      const rect = footer.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      targetPos.current = { x, y };

      if (!isHovered.current) {
        isHovered.current = true;
        if (!animFrameId.current) {
          animFrameId.current = requestAnimationFrame(updatePosition);
        }
      }
    };

    const handlePointerLeave = () => {
      isHovered.current = false;
      targetPos.current = { x: 50, y: 50 };
    };

    footer.addEventListener('pointermove', handlePointerMove as EventListener);
    footer.addEventListener('pointerleave', handlePointerLeave);

    // GSAP ScrollTrigger Entrance & Parallax Animations
    let ctx: gsap.Context | undefined;
    if (!prefersReducedMotion) {
      ctx = gsap.context(() => {
        // Parallax image movement
        if (mediaImgRef.current) {
          gsap.fromTo(
            mediaImgRef.current,
            { yPercent: -3, scale: 1.08 },
            {
              yPercent: 3,
              scale: 1.03,
              ease: 'none',
              scrollTrigger: {
                trigger: footer,
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: true,
              },
            }
          );
        }

        // Viewport entrance reveal
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: footer,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });

        tl.fromTo(
          '.footer-title-inner',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.95, ease: 'power3.out', stagger: 0.12 }
        )
          .fromTo(
            '.footer-cta',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.6'
          )
          .fromTo(
            '.footer-info-group',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08 },
            '-=0.8'
          );
      }, footerRef);
    }

    return () => {
      footer.removeEventListener('pointermove', handlePointerMove as EventListener);
      footer.removeEventListener('pointerleave', handlePointerLeave);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <footer ref={footerRef} className="site-footer" aria-label="Site Footer">
      {/* Background Media Photograph with 10-15% reduced overlay */}
      <div className="footer-media">
        <img
          ref={mediaImgRef}
          src="/media/images/footer-table-memory.png"
          alt="Hands serving traditional South Indian meal on banana leaf"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Atmospheric Dark Gradient Overlay */}
      <div className="footer-overlay" />

      {/* Interactive Cursor Spotlight Reveal */}
      <div className="footer-reveal" />

      {/* Micro Film Grain */}
      <div className="footer-grain" />

      {/* Main Inner Container */}
      <div className="footer-inner">
        {/* Top Hero & Sidebar Grid */}
        <div className="footer-grid-top">
          {/* Main Hero Message in Clash Display Sentence Casing */}
          <div className="footer-title-wrap">
            <div className="footer-title-line">
              <h2 className="footer-title footer-title-inner">
                Come <span className="terracotta">Home</span>
              </h2>
            </div>
            <div className="footer-title-line">
              <h2 className="footer-title footer-title-inner">to the Table</h2>
            </div>

            {/* Editorial CTA Pattern */}
            <NavLink to="/visit/#reserve" className="footer-cta">
              <span className="footer-cta__text">BOOK A TABLE</span>
              <span className="footer-cta__line" aria-hidden="true" />
            </NavLink>
          </div>

          {/* Restaurant Information Sidebar */}
          <div className="footer-info-sidebar">
            <div className="footer-info-group">
              <span className="footer-info-label">VISIT /</span>
              <div className="footer-info-val">
                <p>{RESTAURANT_CONFIG.address.street}, {RESTAURANT_CONFIG.address.area}</p>
                <p>{RESTAURANT_CONFIG.address.city}, {RESTAURANT_CONFIG.address.state} {RESTAURANT_CONFIG.address.postalCode}</p>
              </div>
            </div>

            <div className="footer-info-group">
              <span className="footer-info-label">HOURS /</span>
              <div className="footer-info-val">
                <p>Mon–Sun</p>
                <p>12:00 PM — 11:00 PM</p>
              </div>
            </div>

            <div className="footer-info-group">
              <span className="footer-info-label">CONTACT /</span>
              <div className="footer-info-val">
                <p>
                  <a href={`tel:${RESTAURANT_CONFIG.contact.phoneRaw}`} className="footer-info-link">
                    {RESTAURANT_CONFIG.contact.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${RESTAURANT_CONFIG.contact.email}`} className="footer-info-link">
                    {RESTAURANT_CONFIG.contact.email}
                  </a>
                </p>
                <div className="pt-2">
                  <a
                    href={RESTAURANT_CONFIG.contact.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-directions-cta"
                  >
                    <span className="footer-directions-cta__text">GET DIRECTIONS</span>
                    <span className="footer-directions-cta__line" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Composition Area */}
        <div className="w-full flex flex-col justify-end">
          {/* Navigation & Social Links Row — Baseline Aligned */}
          <div className="footer-middle-row">
            <div className="footer-brand-group">
              <div className="footer-closing-gesture">
                <img
                  src={BRAND_CONFIG.logoSvg}
                  alt="Amani's South Indian Kitchen"
                  className="footer-wordmark-img"
                />
              </div>
            </div>

            <div className="footer-link-groups">
              <nav aria-label="Footer Navigation">
              <ul className="footer-nav-list">
                <li className="flex items-center">
                  {/* Small Quiet Top-Left Brand Motif */}
                  <svg
                    className="footer-top-motif"
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    aria-hidden="true"
                  >
                    <path d="M50 8 L92 50 L50 92 L8 50 Z" />
                    <circle cx="50" cy="50" r="26" strokeDasharray="3 3" />
                    <path d="M50 24 L76 50 L50 76 L24 50 Z" />
                    <circle cx="50" cy="50" r="7" fill="currentColor" />
                  </svg>
                  <NavLink to="/" className="footer-nav-link">
                    HOME
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/menu/" className="footer-nav-link">
                    MENU
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/stories/" className="footer-nav-link">
                    OUR STORY
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/gatherings/" className="footer-nav-link">
                    GATHERINGS
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/catering/" className="footer-nav-link">
                    CATERING
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/franchise/" className="footer-nav-link">
                    FRANCHISE
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/visit/" className="footer-nav-link">
                    VISIT
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/visit/#reserve" className="footer-nav-link">
                    RESERVE
                  </NavLink>
                </li>
              </ul>
              </nav>

              <ul className="footer-social-list" aria-label="Social Media Links">
              <li>
                <a
                  href={RESTAURANT_CONFIG.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="Follow Amani's on Instagram"
                >
                  <InstagramIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="Follow Amani's on Facebook"
                >
                  <FacebookIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/914023558899"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="Message Amani's on WhatsApp"
                >
                  <WhatsAppIcon />
                </a>
              </li>
              </ul>
            </div>
          </div>

          {/* Bottom Divider Line */}
          <div className="footer-divider-line" aria-hidden="true" />

          {/* Bottom Legal Row */}
          <div className="footer-bottom-bar">
            <div className="footer-copyright">
              © {new Date().getFullYear()} AMANI'S SOUTH INDIAN KITCHEN. ALL RIGHTS RESERVED.
            </div>

            <div className="footer-meta-center">
              <NavLink to="/privacy/" className="footer-meta-link">
                PRIVACY
              </NavLink>
              <NavLink to="/terms/" className="footer-meta-link">
                TERMS
              </NavLink>
              <span className="footer-meta-motto">MADE WITH WARMTH</span>
            </div>

            <a
              href="https://www.envizonstudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-envizon-tag"
              aria-label="Designed by Envizon Studio"
            >
              <span className="footer-envizon-tag__muted">Designed By</span>{' '}
              <strong className="footer-envizon-tag__bold">Envizon Studio</strong>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
