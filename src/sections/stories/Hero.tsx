import { motion, useReducedMotion } from 'motion/react';

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="stories-hero" aria-labelledby="stories-hero-title">
      <img className="stories-hero__image" src="/media/images/happy-south-indian-dining.png" alt="A family sharing a warm South Indian meal at Amani's" fetchPriority="high" />
      <div className="stories-hero__wash" aria-hidden="true" />
      <motion.div className="stories-hero__content" initial={reduceMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}>
        <p className="stories-eyebrow stories-eyebrow--light">Stories / 01</p>
        <h1 id="stories-hero-title">The story behind<br /><em>every return.</em></h1>
        <p className="stories-hero__lede">Amani means spring in Telugu — the season that always comes back. This is why that felt like the right name for a restaurant.</p>
        <a className="stories-text-link stories-text-link--light" href="#why-amani">Read our story <span aria-hidden="true">↓</span></a>
      </motion.div>
      <p className="stories-hero__note">Jubilee Hills, Hyderabad <span>•</span> Since 2018</p>
    </section>
  );
}
