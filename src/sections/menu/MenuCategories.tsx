import { motion, useReducedMotion } from 'motion/react';
import { MENU_GROUPS } from '../../content/menu';

export function MenuCategories() {
  const reduceMotion = useReducedMotion();
  return <section id="menu-categories" className="menu-categories" aria-label="Amani menu categories"><div className="menu-container">
    {MENU_GROUPS.map((group, groupIndex) => <section id={group.id} className="menu-group" key={group.id} aria-labelledby={`${group.id}-title`}>
      <header className="menu-group__head"><span>{group.number}</span><div><h2 id={`${group.id}-title`}>{group.title}</h2><p>{group.note}</p></div></header>
      <div className="menu-group__grid">{group.dishes.map((dish, index) => <motion.article className="menu-dish" key={dish.name} initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .55, delay: Math.min((groupIndex * .04) + index * .05, .35) }}>
        <div className="menu-dish__content"><div className="menu-dish__line"><h3>{dish.name}</h3><span>{dish.price === null ? 'Ask our team' : `₹${dish.price}`}</span></div><i className={`menu-diet menu-diet--${dish.dietary}`}>{dish.dietary === 'veg' ? 'Vegetarian' : dish.dietary === 'egg' ? 'Contains egg' : dish.dietary === 'non_veg' ? 'Non-vegetarian' : 'Dietary details available'}</i></div>
      </motion.article>)}</div>
    </section>)}
  </div></section>;
}
