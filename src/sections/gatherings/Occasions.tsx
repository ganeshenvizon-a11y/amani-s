import { motion, useReducedMotion } from 'motion/react';

const occasions = [
  { title: 'Birthdays', copy: 'A table set for the ones closest to you.' },
  { title: 'Weddings & Engagements', copy: 'Food and hospitality worthy of the day.' },
  { title: 'Corporate Events', copy: 'Private dining that still feels personal.' },
  { title: 'Family Celebrations', copy: 'Festivals, anniversaries, milestones — done properly.' },
];

export function Occasions() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="gath-occasions-section" id="occasions" aria-label="Gathering Occasions">
      <div className="gath-container">
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
