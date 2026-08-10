import { Reveal } from '../../components/motion/Reveal';

export function DishDetailExperience() {
  return <section className="menu-feature" aria-labelledby="menu-feature-title"><div className="menu-container menu-feature__grid">
    <Reveal className="menu-feature__media" direction="left"><img src="/media/images/dish-naatu-kodi-pulusu.jpg" alt="Naatu Kodi Pulusu simmered with country chicken and spices" loading="lazy" /></Reveal>
    <Reveal className="menu-feature__copy" delay={.1}><p className="menu-eyebrow menu-eyebrow--light">From the kitchen / South Indian curry</p><h2 id="menu-feature-title">Natukodi<br /><em>Pulusu</em></h2><p>Part of our Andhra and South Indian non-vegetarian curries selection. Ask our team for today’s preparation and pairing guidance.</p><dl><div><dt>Menu price</dt><dd>₹299</dd></div><div><dt>Category</dt><dd>Non-vegetarian</dd></div></dl></Reveal>
  </div></section>;
}
