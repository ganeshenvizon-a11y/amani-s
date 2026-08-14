import { motion, useReducedMotion } from 'motion/react';
import gatheringImg from '../../assets/gathering-table.jpg';

export function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="cater-hero" aria-labelledby="cater-hero-title">
      <img
        className="cater-hero__bg"
        src={gatheringImg}
        alt="A long celebration table set with brass serveware for a catered occasion"
        fetchPriority="high"
      />
      <div className="cater-hero__overlay" aria-hidden="true" />

      <div className="cater-container cater-hero__inner">
        <motion.div
          className="cater-hero__content"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 id="cater-hero-title">
            <span>Our Warmth,</span> <em>Your Occasion.</em>
          </h1>
          <p className="cater-hero__lede">
            Amani&rsquo;s catering brings authentic South Indian menus, thoughtful planning, and warm service to weddings, family ceremonies, and corporate events across Hyderabad.
          </p>
          <div className="cater-hero__actions">
            <a className="cater-button" href="#quote">
              Request a Quote <span aria-hidden="true">↓</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
