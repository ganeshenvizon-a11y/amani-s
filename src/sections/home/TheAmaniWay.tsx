/**
 * Section 05 — The Amani Way
 * Editorial philosophy section with fine rangoli divider and craft sequence.
 */

import { NavLink } from 'react-router-dom';
import { AMANI_WAY_CONTENT } from '../../content/home';
import { Reveal } from '../../components/motion/Reveal';
import { RangoliDivider } from '../../components/motion/RangoliPattern';

export function TheAmaniWay() {
  return (
    <section
      className="section-padding bg-[var(--amani-paper)] text-[var(--amani-ink)] border-b border-[var(--amani-hairline)]"
      aria-label="The Amani Way — Our Philosophy"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Entry Rangoli Line Divider */}
        <RangoliDivider className="mb-12" color="var(--amani-maroon)" />

        {/* Section Header */}
        <Reveal className="max-w-3xl mb-16">
          <span className="text-eyebrow mb-3 block">{AMANI_WAY_CONTENT.label}</span>
          <h2 className="text-h1 mb-6 font-serif">{AMANI_WAY_CONTENT.heading}</h2>
          <p className="text-body-lg leading-relaxed">{AMANI_WAY_CONTENT.body}</p>
        </Reveal>

        {/* Editorial Layout: Principles & Craft Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Principles Column */}
          <div className="lg:col-span-6 space-y-10">
            {AMANI_WAY_CONTENT.principles.map((principle) => (
              <Reveal key={principle.number} direction="up" className="border-l-2 border-[var(--amani-maroon)] pl-6 py-2">
                <span className="text-xs font-mono tracking-widest text-[var(--amani-maroon)] font-semibold block mb-1">
                  {principle.number}
                </span>
                <h3 className="text-h3 font-serif mb-2">{principle.title}</h3>
                <p className="text-body font-sans">{principle.description}</p>
              </Reveal>
            ))}
          </div>

          {/* Craft Photography */}
          <div className="lg:col-span-6 aspect-[4/3] rounded-[var(--amani-radius-md)] overflow-hidden border border-[var(--amani-hairline)] shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop"
              alt="Amani chef hand tempering aromatic spices and preparing fresh dosa on iron griddle"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* CTA Link */}
        <div className="pt-4">
          <NavLink
            to={AMANI_WAY_CONTENT.ctaLink}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--amani-maroon)] font-semibold hover:underline"
          >
            {AMANI_WAY_CONTENT.ctaText} →
          </NavLink>
        </div>
      </div>
    </section>
  );
}
