import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const occasions: { title: string; label: string; copy: string; icon: ReactNode }[] = [
  {
    title: 'Birthdays',
    label: 'Celebrate',
    copy: 'A table set for the ones closest to you.',
    icon: (
      <>
        <path d="M4 21h16" />
        <path d="M5 21v-7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7" />
        <path d="M5 16.5c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0" />
        <path d="M12 12V8" />
        <path d="M12 5.5c.8-.8.8-2 0-2.5-.8.5-.8 1.7 0 2.5z" />
      </>
    ),
  },
  {
    title: 'Weddings & Engagements',
    label: 'Unite',
    copy: 'Food and hospitality worthy of the day.',
    icon: (
      <>
        <circle cx="9" cy="14.5" r="5" />
        <circle cx="15" cy="14.5" r="5" />
        <path d="M7.5 7 9 4.5 10.5 7" />
      </>
    ),
  },
  {
    title: 'Corporate Events',
    label: 'Host',
    copy: 'Private dining that still feels personal.',
    icon: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 13h18" />
      </>
    ),
  },
  {
    title: 'Family Celebrations',
    label: 'Gather',
    copy: 'Festivals, anniversaries, milestones — done properly.',
    icon: (
      <>
        <circle cx="9" cy="7" r="3" />
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <circle cx="17.5" cy="9" r="2.5" />
        <path d="M17.5 14.5A3.5 3.5 0 0 1 21 18v3" />
      </>
    ),
  },
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
              <span className="gath-occasion__index">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  {occasion.icon}
                </svg>
                {String(index + 1).padStart(2, '0')} · {occasion.label} /
              </span>
              <h3>{occasion.title}</h3>
              <p>{occasion.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
