import { motion, useReducedMotion } from 'motion/react';

export function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="vst-hero" aria-labelledby="vst-hero-title">
      <div className="vst-container vst-hero__inner">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="vst-eyebrow">Visit / 01</p>
          <h1 id="vst-hero-title">Visit <em>Amani.</em></h1>
          <p className="vst-hero__lede">Whether it&rsquo;s breakfast before work, dinner with family, or a quiet cup of filter coffee — we&rsquo;d love to welcome you.</p>
        </motion.div>
      </div>
    </section>
  );
}
