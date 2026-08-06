/**
 * Section 06 — Inside Amani
 * Asymmetric editorial photo gallery mosaic with accessible Lightbox modal.
 */

import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { INSIDE_AMANI_CONTENT, type GalleryItem } from '../../content/home';
import { Reveal } from '../../components/motion/Reveal';

export function InsideAmani() {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!activeImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveImage(null);
        triggerRef.current?.focus();
      } else if (e.key === 'ArrowRight') {
        const currentIdx = INSIDE_AMANI_CONTENT.gallery.findIndex((g) => g.id === activeImage.id);
        const nextIdx = (currentIdx + 1) % INSIDE_AMANI_CONTENT.gallery.length;
        setActiveImage(INSIDE_AMANI_CONTENT.gallery[nextIdx]);
      } else if (e.key === 'ArrowLeft') {
        const currentIdx = INSIDE_AMANI_CONTENT.gallery.findIndex((g) => g.id === activeImage.id);
        const prevIdx = (currentIdx - 1 + INSIDE_AMANI_CONTENT.gallery.length) % INSIDE_AMANI_CONTENT.gallery.length;
        setActiveImage(INSIDE_AMANI_CONTENT.gallery[prevIdx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeImage]);

  return (
    <section
      className="section-padding bg-[var(--amani-canvas)] text-[var(--amani-ink)] border-b border-[var(--amani-hairline)]"
      aria-label="Inside Amani — Photo Gallery"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <Reveal className="max-w-2xl mb-12">
          <span className="text-eyebrow mb-3 block">{INSIDE_AMANI_CONTENT.label}</span>
          <h2 className="text-h1 mb-4 font-serif">{INSIDE_AMANI_CONTENT.heading}</h2>
          <p className="text-body-lg">{INSIDE_AMANI_CONTENT.body}</p>
        </Reveal>

        {/* Asymmetric Editorial Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          {INSIDE_AMANI_CONTENT.gallery.map((item, idx) => {
            let colSpan = 'md:col-span-4';
            if (idx === 0) colSpan = 'md:col-span-7 aspect-[4/3]';
            if (idx === 1) colSpan = 'md:col-span-5 aspect-[4/3]';
            if (idx === 2) colSpan = 'md:col-span-4 aspect-[3/4]';
            if (idx === 3) colSpan = 'md:col-span-4 aspect-[1/1]';
            if (idx === 4) colSpan = 'md:col-span-4 aspect-[3/4]';

            return (
              <button
                key={item.id}
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  setActiveImage(item);
                }}
                className={`${colSpan} relative group overflow-hidden rounded-[var(--amani-radius-md)] border border-[var(--amani-hairline)] text-left focus:outline-none focus:ring-2 focus:ring-[var(--amani-maroon)]`}
                aria-label={`View larger image: ${item.title}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--amani-void)] via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex flex-col justify-end p-6 text-[var(--amani-cream-on-dark)]">
                  <span className="text-xs uppercase tracking-widest text-[var(--amani-terracotta)] font-mono mb-1">
                    {item.label}
                  </span>
                  <span className="font-serif text-lg">{item.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Section Footer Link */}
        <div className="pt-4 flex justify-between items-center">
          <NavLink
            to={INSIDE_AMANI_CONTENT.ctaLink}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--amani-maroon)] font-semibold hover:underline"
          >
            {INSIDE_AMANI_CONTENT.ctaText} →
          </NavLink>
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.title}
          className="fixed inset-0 z-[600] bg-[rgba(17,16,14,0.92)] backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => {
            setActiveImage(null);
            triggerRef.current?.focus();
          }}
        >
          <div
            className="relative max-w-4xl w-full bg-[var(--amani-canvas)] text-[var(--amani-ink)] rounded-[var(--amani-radius-md)] overflow-hidden border border-[var(--amani-hairline)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-[var(--amani-hairline)]">
              <div>
                <span className="text-xs uppercase tracking-widest text-[var(--amani-maroon)] font-semibold font-mono block">
                  {activeImage.label}
                </span>
                <h3 className="font-serif text-xl">{activeImage.title}</h3>
              </div>
              <button
                onClick={() => {
                  setActiveImage(null);
                  triggerRef.current?.focus();
                }}
                className="p-2 text-sm uppercase tracking-wider font-semibold hover:text-[var(--amani-maroon)] focus:outline-none"
                aria-label="Close image lightbox"
              >
                Close ✕
              </button>
            </div>

            <div className="max-h-[70vh] overflow-hidden bg-[var(--amani-void)] flex items-center justify-center">
              <img
                src={activeImage.image}
                alt={activeImage.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-4 bg-[var(--amani-paper)] text-sm text-[var(--amani-ink-soft)] font-sans">
              {activeImage.caption}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
