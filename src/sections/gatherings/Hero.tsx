import { motion, useReducedMotion } from 'motion/react';

export function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="gath-hero" aria-labelledby="gath-hero-title">
      <img
        className="gath-hero__bg"
        src="/media/images/gathering.png"
        alt="Gatherings and Private Dining at Amani South Indian Kitchen"
        fetchPriority="high"
      />
      <div className="gath-hero__overlay" aria-hidden="true" />

      <div className="gath-container gath-hero__inner">
        <motion.div
          className="gath-hero__content"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 id="gath-hero-title">
            <span>Whatever you&rsquo;re</span> <em>celebrating.</em>
          </h1>
          <p className="gath-hero__lede">A private table, a full room, or the whole restaurant — we set the table, cook the food, and look after the day so you can be a guest at your own celebration.</p>
          <div className="gath-hero__actions">
            <a className="gath-button" href="#enquiry">
              Plan Your Event <span aria-hidden="true">↓</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
