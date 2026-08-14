/**
 * Section 02 / 07 — Signature Experiences
 * Interactive 100vh layout with click-to-select step navigation (no scroll-pinning / no scroll-based selection).
 * Design system consistency: sans-serif typography, clean header without subtext.
 */

import { useState } from 'react';
import { EXPERIENCES_CONTENT } from '../../content/home';

export function SignatureExperiences() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeExp = EXPERIENCES_CONTENT.experiences[activeIndex] || EXPERIENCES_CONTENT.experiences[0];

  return (
    <section
      className="w-full h-screen max-h-screen min-h-[640px] bg-[var(--amani-paper)] text-[var(--amani-ink)] border-b border-[var(--amani-hairline)] relative overflow-hidden flex flex-col justify-between py-6 lg:py-8 px-6 md:px-12 lg:px-16"
      aria-label="Signature Experiences"
    >
      <div className="max-w-[1600px] w-full mx-auto h-full flex flex-col justify-between">
        {/* Section Header */}
        <header className="flex items-end justify-between border-b border-[var(--amani-hairline)] pb-4 lg:pb-5">
          <div>
            <h2 className="text-2xl lg:text-3xl font-sans font-semibold text-[var(--amani-ink)] tracking-tight">
              {EXPERIENCES_CONTENT.heading}
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[var(--amani-ink-muted)]">
            <span className="text-[var(--amani-maroon)] font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span>/</span>
            <span>{String(EXPERIENCES_CONTENT.experiences.length).padStart(2, '0')}</span>
          </div>
        </header>

        {/* Desktop 100vh Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center flex-1 min-h-0 py-4 lg:py-6">
          {/* Left Column: Interactive Experience Steps List */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-2.5 lg:space-y-3 h-full max-h-[540px]">
            {EXPERIENCES_CONTENT.experiences.map((exp, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative text-left w-full p-3.5 lg:p-4 rounded-xl border transition-all duration-300 flex items-stretch gap-4 ${
                    isActive
                      ? 'bg-[var(--amani-canvas)] border-[var(--amani-maroon)] shadow-sm text-[var(--amani-ink)] scale-[1.01]'
                      : 'bg-transparent border-[var(--amani-hairline)] opacity-60 hover:opacity-100 hover:border-[var(--amani-ink-soft)] text-[var(--amani-ink-soft)]'
                  }`}
                >
                  {/* Left Active Accent Indicator */}
                  <div
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-[var(--amani-maroon)]' : 'bg-transparent'
                    }`}
                  />

                  {/* Step Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-mono font-bold text-[var(--amani-maroon)]">
                        {exp.number}
                      </span>
                      <h3 className="font-sans text-base lg:text-lg font-semibold tracking-tight text-[var(--amani-ink)] truncate">
                        {exp.title}
                      </h3>
                    </div>
                    <p className="font-sans text-xs lg:text-sm text-[var(--amani-ink-soft)] line-clamp-1 leading-snug">
                      {exp.description}
                    </p>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="flex items-center justify-center pl-2">
                    <svg
                      aria-hidden="true"
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isActive
                          ? 'text-[var(--amani-maroon)] translate-x-1'
                          : 'text-[var(--amani-ink-muted)] opacity-0 group-hover:opacity-100'
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Showcase Panel with Cross-fading Images */}
          <div className="lg:col-span-6 h-full min-h-[340px] max-h-[540px] flex items-center justify-center">
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[var(--amani-hairline)] shadow-md bg-[var(--amani-void)]">
              {EXPERIENCES_CONTENT.experiences.map((exp, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <img
                    key={exp.id}
                    src={exp.image}
                    alt={exp.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                      isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0 pointer-events-none'
                    }`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                );
              })}

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,20,17,0.7)] via-transparent to-transparent z-10 pointer-events-none" />

              {/* Floating Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6 p-4 bg-[rgba(163,74,49,0.32)] backdrop-blur-xl text-[var(--amani-cream-on-dark)] rounded-xl border border-[rgba(255,255,255,0.25)] z-20 flex items-center justify-between shadow-xl">
                <div>
                  <span className="text-[var(--amani-terracotta)] font-mono text-[10px] lg:text-xs font-bold uppercase tracking-wider block mb-0.5">
                    {activeExp.number} — SIGNATURE EXPERIENCE
                  </span>
                  <p className="font-sans font-semibold text-sm lg:text-base text-[var(--amani-cream-on-dark)]">
                    {activeExp.title}
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-[var(--amani-cream-muted)] text-xs font-mono">
                  <span className="text-[var(--amani-cream-on-dark)] font-bold">{activeIndex + 1}</span>
                  <span>/</span>
                  <span>{EXPERIENCES_CONTENT.experiences.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar / Navigation Dots */}
        <footer className="flex items-center justify-between border-t border-[var(--amani-hairline)] pt-3 lg:pt-4 text-xs">
          <div className="flex items-center gap-2">
            {EXPERIENCES_CONTENT.experiences.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to experience step ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? 'w-8 bg-[var(--amani-maroon)]'
                    : 'w-2 bg-[var(--amani-ink-muted)] opacity-30 hover:opacity-70'
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-[11px] text-[var(--amani-ink-muted)] uppercase tracking-wider">
            Select a step to explore
          </span>
        </footer>
      </div>
    </section>
  );
}
