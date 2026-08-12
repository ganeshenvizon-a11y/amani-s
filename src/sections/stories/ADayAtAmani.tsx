import { motion, useReducedMotion } from 'motion/react';

const scenes = [
  { label: 'Early morning', time: '06:30', text: 'The grinder is on before the sun. Produce arrives at the back door, stocks go on to simmer, and the first pots of curry begin their slow build.' },
  { label: 'Midday', time: '13:00', text: 'The tiffin and thali rush. Banana leaves are laid, biryani lids are lifted, and plates move across the floor without a pause.' },
  { label: 'Evening', time: '20:00', text: 'Dinner settles into a rhythm. Tables fill with regulars and first-timers alike, orders call out, and the kitchen finds its second wind.' },
  { label: 'Closing', time: 'Late', text: 'The last guests linger over filter coffee. Counters are wiped down, tomorrow’s prep is set, and the kitchen finally exhales.' },
];

export function ADayAtAmani() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="stories-day" aria-labelledby="day-title">
      <div className="stories-container">
        <div className="stories-day__head">
          <div className="stories-day__title-wrap">
            <h2 id="day-title">A day at <em>Amani.</em></h2>
          </div>
          <p className="stories-day__intro">Long before the first guest arrives, the day has already started.</p>
        </div>
        <ol className="stories-day__scenes">
          {scenes.map((scene, index) => (
            <motion.li
              key={scene.label}
              className="stories-scene"
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="stories-scene__time">{scene.time}</span>
              <h3 className="stories-scene__label">{scene.label}</h3>
              <p className="stories-scene__text">{scene.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
