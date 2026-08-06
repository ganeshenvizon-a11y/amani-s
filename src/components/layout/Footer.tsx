/**
 * Footer — Shared Footer component.
 * Acts as the final editorial scene on the page.
 */

import { NavLink } from 'react-router-dom';
import { RESTAURANT_CONFIG } from '../../config/restaurant';
import { FOOTER_NAV_LINKS } from '../../config/navigation';
import { BRAND_CONFIG } from '../../config/brand';
import { RangoliPattern } from '../motion/RangoliPattern';

export function Footer() {
  return (
    <footer
      className="bg-[var(--amani-void)] text-[var(--amani-cream-on-dark)] pt-20 pb-10 border-t border-[var(--amani-hairline-dark)] relative overflow-hidden"
      aria-label="Site Footer"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[var(--amani-hairline-dark)]">
          {/* Col 1: Large Brand Name & Tagline */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={BRAND_CONFIG.logoMarkSvg} alt="" className="w-9 h-9 object-contain" />
                <span className="font-serif text-3xl tracking-wider">{BRAND_CONFIG.name}</span>
              </div>
              <p className="text-[var(--amani-cream-muted)] text-sm max-w-sm leading-relaxed mb-6 font-sans">
                South Indian kitchen framed as a warm nature retreat—unhurried, editorial, and tactile.
              </p>
              <p className="font-serif italic text-lg text-[var(--amani-terracotta)]">
                "{BRAND_CONFIG.tagline}"
              </p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3">
            <h2 className="text-xs uppercase tracking-[0.16em] text-[var(--amani-cream-muted)] font-semibold mb-6">
              Navigation
            </h2>
            <ul className="space-y-3 font-sans text-sm">
              {FOOTER_NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className="hover:text-[var(--amani-terracotta)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--amani-cream-on-dark)]"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Practical Hours & Address */}
          <div className="md:col-span-4 font-sans text-sm space-y-4">
            <h2 className="text-xs uppercase tracking-[0.16em] text-[var(--amani-cream-muted)] font-semibold mb-6">
              Hours & Location
            </h2>
            <p className="text-[var(--amani-cream-on-dark)] leading-relaxed">
              {RESTAURANT_CONFIG.address.formatted}
            </p>
            <div className="pt-2 text-[var(--amani-cream-muted)] space-y-1">
              <p>Daily: 12:00 PM – 11:00 PM</p>
              <p>Phone: <a href={`tel:${RESTAURANT_CONFIG.contact.phoneRaw}`} className="underline hover:text-[var(--amani-cream-on-dark)]">{RESTAURANT_CONFIG.contact.phone}</a></p>
              <p>Email: <a href={`mailto:${RESTAURANT_CONFIG.contact.email}`} className="underline hover:text-[var(--amani-cream-on-dark)]">{RESTAURANT_CONFIG.contact.email}</a></p>
            </div>
            <div className="pt-2">
              <a
                href={RESTAURANT_CONFIG.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-widest text-[var(--amani-terracotta)] hover:underline inline-flex items-center gap-1"
              >
                Instagram ↗
              </a>
            </div>
          </div>
        </div>

        {/* Oversized Brand Typography & Rangoli Accent */}
        <div className="py-12 flex flex-col items-center justify-center text-center relative">
          <div className="opacity-15 pointer-events-none mb-4">
            <RangoliPattern size={80} color="var(--amani-cream-on-dark)" strokeWidth={1} />
          </div>
          <span className="font-serif text-[clamp(4rem,14vw,14rem)] leading-none uppercase tracking-widest opacity-10 select-none">
            AMANI
          </span>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--amani-cream-muted)] font-sans pt-6 border-t border-[var(--amani-hairline-dark)]">
          <p>© {new Date().getFullYear()} Amani Restaurant. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
