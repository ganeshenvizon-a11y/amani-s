/**
 * Footer — 100VH Cinematic Interactive Footer Component for Amani
 * Production UI/UX refined implementation with clear image atmosphere, center logo focal point & baseline alignment.
 */

import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from '../../lib/gsap';
import { RESTAURANT_CONFIG } from '../../config/restaurant';
import { BRAND_CONFIG } from '../../config/brand';

// Clean SVG Up-Right Arrow Icon
function ArrowUpRightIcon({ className = 'footer-social-icon' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
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
                Come <span className="terracotta">home</span>
              </h2>
            </div>
            <div className="footer-title-line">
              <h2 className="footer-title footer-title-inner">to the table.</h2>
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
                  <NavLink to="/menu/" className="footer-nav-link">
                    MENU
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/stories/" className="footer-nav-link">
                    STORIES
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/gatherings/" className="footer-nav-link">
                    GATHERINGS
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
                >
                  <span>INSTAGRAM</span>
                  <ArrowUpRightIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                >
                  <span>FACEBOOK</span>
                  <ArrowUpRightIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/914023558899"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                >
                  <span>WHATSAPP</span>
                  <ArrowUpRightIcon />
                </a>
              </li>
            </ul>
          </div>

          {/* Centered Amani's Logo Signature (Emotional Focal Point) */}
          <div className="footer-closing-gesture">
            <img
              src={BRAND_CONFIG.logoSvg}
              alt="Amani's South Indian Kitchen"
              className="footer-wordmark-img"
            />
          </div>

          {/* Bottom Divider Line */}
          <div className="footer-divider-line" aria-hidden="true" />

          {/* Bottom Legal Row */}
          <div className="footer-bottom-bar">
            <div>© {new Date().getFullYear()} AMANI'S</div>

            <div className="footer-meta-links">
              <NavLink to="/privacy/" className="footer-meta-link">
                PRIVACY
              </NavLink>
              <NavLink to="/terms/" className="footer-meta-link">
                TERMS
              </NavLink>
              <span>MADE WITH WARMTH</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
