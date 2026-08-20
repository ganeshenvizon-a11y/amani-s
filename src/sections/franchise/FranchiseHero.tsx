import { motion, useReducedMotion } from 'motion/react';

export function FranchiseHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="gath-hero" aria-labelledby="franchise-hero-title">
      <img
        className="gath-hero__bg"
        src="/media/images/happy-south-indian-dining.png"
        alt="Amani's Restaurant Master Franchise Experience"
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
          <h1 id="franchise-hero-title">
            <span>Serve happiness</span> <em>Build your future</em>
          </h1>
          <p className="gath-hero__lede">
            Every plate creates memories. Now it&rsquo;s your turn to build a thriving business with Amani&rsquo;s.
          </p>
          <div className="gath-hero__actions">
            <a className="gath-button" href="#franchise-form">
              Apply for a Franchise <span aria-hidden="true">↓</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
