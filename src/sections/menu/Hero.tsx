import { motion, useReducedMotion } from 'motion/react';

export function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="menu-hero" aria-labelledby="menu-hero-title">
      <img
        className="menu-hero__bg"
        src="/media/images/thali/south-indian-thali.png"
        alt="A grand South Indian thali of regional curries at Amani South Indian Kitchen"
        fetchPriority="high"
      />
      <div className="menu-hero__overlay" aria-hidden="true" />

      <div className="menu-container menu-hero__inner">
        <motion.div
          className="menu-hero__content"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 id="menu-hero-title">
            <span>Recipes from</span> <em>fire</em>
          </h1>
          <p className="menu-hero__lede">Andhra curries, dum biryanis, and grand thalis — every dish slow-cooked from regional recipes and handed down through generations. Explore the full menu.</p>
          <div className="menu-hero__actions">
            <a className="menu-hero__button" href="#menu-categories">
              Explore the Menu <span aria-hidden="true">↓</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
