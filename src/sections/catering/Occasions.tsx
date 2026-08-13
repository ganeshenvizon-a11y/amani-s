import { motion, useReducedMotion } from 'motion/react';
import { Reveal } from '../../components/motion/Reveal';

const occasions = [
  { title: 'Family Ceremonies', copy: 'Housewarmings, milestones, and intimate family gatherings.' },
  { title: 'Weddings & Engagements', copy: 'Authentic feast menus and hospitality worthy of your grand day.' },
  { title: 'Corporate Events', copy: 'Executive luncheons, galas, and professional team gatherings.' },
  { title: 'Social Celebrations', copy: 'Birthdays, anniversaries, and festive get-togethers.' },
];

export function Occasions() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="cater-occasions-section" id="occasions" aria-label="Occasions We Cater">
      <div className="cater-container">
        <Reveal className="cater-head">
          <h2>Occasions We <em>Cater.</em></h2>
          <p>Every occasion has its own meaning and rhythm. We help you choose the right menu and service format.</p>
        </Reveal>
        <div className="cater-occasions">
          {occasions.map((occasion, index) => (
            <motion.article
              key={occasion.title}
              className="cater-occasion"
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="cater-occasion__index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{occasion.title}</h3>
              <p>{occasion.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
