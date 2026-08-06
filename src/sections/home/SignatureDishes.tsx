/**
 * Section 04 — Signature Dishes
 * Editorial showcase of Amani's core signature dishes with price, veg, spice level, and menu link.
 */

import { NavLink } from 'react-router-dom';
import { SIGNATURE_DISHES_CONTENT } from '../../content/home';
import { Reveal } from '../../components/motion/Reveal';

export function SignatureDishes() {
  return (
    <section
      className="section-padding bg-[var(--amani-canvas)] text-[var(--amani-ink)] border-b border-[var(--amani-hairline)]"
      aria-label="Signature Dishes"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <Reveal className="max-w-2xl mb-16">
          <span className="text-eyebrow mb-3 block">{SIGNATURE_DISHES_CONTENT.label}</span>
          <h2 className="text-h1 mb-4 font-serif">{SIGNATURE_DISHES_CONTENT.heading}</h2>
          <p className="text-body-lg">{SIGNATURE_DISHES_CONTENT.intro}</p>
        </Reveal>

        {/* Editorial Alternating Layout */}
        <div className="space-y-20 mb-16">
          {SIGNATURE_DISHES_CONTENT.dishes.map((dish, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <Reveal key={dish.id} direction={isEven ? 'left' : 'right'}>
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  {/* Dish Image */}
                  <div className={`lg:col-span-7 ${isEven ? 'order-1' : 'order-1 lg:order-2'} aspect-[4/3] rounded-[var(--amani-radius-md)] overflow-hidden border border-[var(--amani-hairline)]`}>
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Dish Content */}
                  <div className={`lg:col-span-5 ${isEven ? 'order-2' : 'order-2 lg:order-1'} space-y-4`}>
                    <div className="flex items-center gap-3">
                      {dish.isVeg && (
                        <span className="w-4 h-4 border border-emerald-600 flex items-center justify-center p-0.5" title="Vegetarian">
                          <span className="w-2 h-2 rounded-full bg-emerald-600" />
                        </span>
                      )}
                      {dish.spiceLevel && (
                        <span className="text-xs uppercase tracking-wider text-[var(--amani-maroon)] font-semibold font-mono">
                          {'🌶️'.repeat(dish.spiceLevel)} Mild Heat
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline justify-between gap-4 border-b border-[var(--amani-hairline)] pb-3">
                      <h3 className="text-h2 font-serif">{dish.name}</h3>
                      {dish.price && <span className="text-xl font-serif text-[var(--amani-maroon)] font-medium">{dish.price}</span>}
                    </div>

                    <p className="text-body font-sans leading-relaxed">{dish.description}</p>

                    {dish.allergens && (
                      <p className="text-xs text-[var(--amani-ink-muted)] font-mono">
                        Contains: {dish.allergens.join(', ')}
                      </p>
                    )}

                    <div className="pt-2">
                      <NavLink
                        to={dish.categoryLink}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--amani-maroon)] font-semibold hover:underline"
                      >
                        View Category in Menu →
                      </NavLink>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Section Footer CTA */}
        <div className="text-center pt-8 border-t border-[var(--amani-hairline)]">
          <NavLink
            to={SIGNATURE_DISHES_CONTENT.ctaLink}
            className="inline-flex items-center justify-center bg-[var(--amani-maroon)] text-[var(--amani-canvas)] px-10 py-4 text-xs font-semibold uppercase tracking-widest rounded-[var(--amani-radius-sm)] hover:bg-[var(--amani-maroon-dark)] transition-colors focus:ring-2 focus:ring-[var(--amani-maroon)]"
          >
            {SIGNATURE_DISHES_CONTENT.ctaText}
          </NavLink>
        </div>
      </div>
    </section>
  );
}
