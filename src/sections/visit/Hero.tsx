import { motion, useReducedMotion } from 'motion/react';

export function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="vst-hero" aria-labelledby="vst-hero-title">
      <img
        className="vst-hero__bg"
        src="/media/images/visit1.png"
        alt="Amani South Indian Restaurant Interior & Dining Ambiance"
        fetchPriority="high"
      />
      <div className="vst-hero__overlay" aria-hidden="true" />

      <div className="vst-container vst-hero__inner">
        <motion.div
          className="vst-hero__content"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 id="vst-hero-title">Visit <em>Amani</em></h1>
          <p className="vst-hero__lede">Whether it&rsquo;s breakfast before work, dinner with family, or a quiet cup of filter coffee — we&rsquo;d love to welcome you.</p>
          <div className="vst-hero__actions">
            <a className="vst-button" href="#reserve">
              Find Us &amp; Hours <span aria-hidden="true">↓</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
