/**
 * Section 02 — Signature Experiences
 * Pinned GSAP ScrollTrigger editorial sequence on desktop; stacked layout on mobile & reduced-motion.
 */

import { useRef, useEffect, useState } from 'react';
import { EXPERIENCES_CONTENT } from '../../content/home';
import { Reveal } from '../../components/motion/Reveal';
import { gsap } from '../../lib/gsap';

export function SignatureExperiences() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isDesktop = window.innerWidth >= 1024;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isDesktop || reducedMotion) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.experience-step');

      items.forEach((item, index) => {
        gsap.to(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 50%',
            end: 'bottom 50%',
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index),
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const activeExp = EXPERIENCES_CONTENT.experiences[activeIndex] || EXPERIENCES_CONTENT.experiences[0];

  return (
    <section
      ref={containerRef}
      className="section-padding bg-[var(--amani-paper)] text-[var(--amani-ink)] border-b border-[var(--amani-hairline)] relative"
      aria-label="Signature Experiences"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <Reveal className="max-w-2xl mb-16">
          <span className="text-eyebrow mb-3 block">{EXPERIENCES_CONTENT.label}</span>
          <h2 className="text-h1 mb-4 font-serif">{EXPERIENCES_CONTENT.heading}</h2>
          <p className="text-body-lg">{EXPERIENCES_CONTENT.intro}</p>
        </Reveal>

        {/* Desktop Pinned Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Experience Steps List */}
          <div className="lg:col-span-6 space-y-16">
            {EXPERIENCES_CONTENT.experiences.map((exp, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={exp.id}
                  className={`experience-step rounded-[var(--amani-radius-md)] transition-all duration-500 border overflow-hidden ${
                    isActive
                      ? 'bg-[var(--amani-canvas)] border-[var(--amani-maroon)] shadow-sm'
                      : 'bg-transparent border-[var(--amani-hairline)] opacity-70'
                  }`}
                >
                  {/* Mobile Image — shown inline below each step */}
                  <div className="lg:hidden w-full aspect-[16/9] overflow-hidden">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="p-8">
                    <span className="text-sm font-mono tracking-widest text-[var(--amani-maroon)] font-semibold mb-3 block">
                      {exp.number}
                    </span>
                    <h3 className="text-h2 mb-4 font-serif">{exp.title}</h3>
                    <p className="text-body font-sans leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Image Panel — all images stacked, active one visible via opacity */}
          <div className="hidden lg:block lg:col-span-6 sticky top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--amani-radius-md)] border border-[var(--amani-hairline)] shadow-sm bg-[var(--amani-ink)]">
              {EXPERIENCES_CONTENT.experiences.map((exp, idx) => (
                <img
                  key={exp.id}
                  src={exp.image}
                  alt={exp.title}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                  style={{ opacity: idx === activeIndex ? 1 : 0 }}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              ))}

              {/* Caption overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[rgba(17,16,14,0.75)] backdrop-blur-sm text-[var(--amani-cream-on-dark)] rounded font-sans text-xs z-10">
                <span className="text-[var(--amani-terracotta)] font-mono font-semibold block mb-1">
                  {activeExp.number} — EXPERIENCE
                </span>
                <span>{activeExp.title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
