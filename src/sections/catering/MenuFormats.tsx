import { Reveal } from '../../components/motion/Reveal';

const menuFormats = [
  {
    tag: 'Traditional',
    title: 'Banana Leaf Feasts',
    copy: 'Andhra curries, pulusus, biryanis and curd rice laid out on banana leaf, served with traditional warmth.',
  },
  {
    tag: 'From the Tandoor',
    title: 'Kebab & Tandoor Platters',
    copy: 'Paneer tikka, tangdi and kalmi kebabs, mutton seekh and tandoori chicken, fired fresh on-site.',
  },
  {
    tag: 'Curated Mains',
    title: 'Regional Rice & Curry Menus',
    copy: 'Fragrant biryanis, signature pulavs, flavorful gravies, and traditional sides.',
  },
  {
    tag: 'Dietary Options',
    title: 'Vegetarian & Non-Veg Selections',
    copy: 'Tailored combinations prepared with strict segregation and high culinary standards.',
  },
  {
    tag: 'Interactive',
    title: 'Live Counters & Beverages',
    copy: 'Live biryani and tandoor counters, fresh lime soda, lassi, butter milk and seasonal coolers.',
  },
  {
    tag: 'Sweet Endings',
    title: 'Desserts & Authentic Sweets',
    copy: 'Qubani ka Meetha, Double ka Meetha, gulab jamun, junnu and pot kulfi.',
  },
];

export function MenuFormats() {
  return (
    <section className="cater-menus-section" id="menus" aria-labelledby="cater-menus-title">
      <div className="cater-container">
        <Reveal className="cater-head">
          <h2 id="cater-menus-title">Menus Shaped Around <em>Your Occasion.</em></h2>
          <p>Choose from traditional dining formats or contemporary buffet layouts tailored to your guest list.</p>
        </Reveal>
        <div className="cater-menus__grid">
          {menuFormats.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <article className="cater-menu-card">
                <span className="cater-menu-card__tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
