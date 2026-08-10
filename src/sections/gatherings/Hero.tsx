import { motion, useReducedMotion } from 'motion/react';

const occasions = [
  { title: 'Birthdays', copy: 'A table set for the ones closest to you.' },
  { title: 'Weddings & Engagements', copy: 'Food and hospitality worthy of the day.' },
  { title: 'Corporate Events', copy: 'Private dining that still feels personal.' },
  { title: 'Family Celebrations', copy: 'Festivals, anniversaries, milestones — done properly.' },
];

export function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="gath-hero" aria-labelledby="gath-hero-title">
      <div className="gath-container gath-hero__inner">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="gath-eyebrow">Gatherings / 01</p>
          <h1 id="gath-hero-title">Whatever you&rsquo;re <em>celebrating.</em></h1>
          <p className="gath-hero__lede">A private table, a full room, or the whole restaurant — we set the table, cook the food, and look after the day so you can be a guest at your own celebration.</p>
        </motion.div>
        <div className="gath-occasions">
          {occasions.map((occasion, index) => (
            <motion.article
              key={occasion.title}
              className="gath-occasion"
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="gath-occasion__index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{occasion.title}</h3>
              <p>{occasion.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
