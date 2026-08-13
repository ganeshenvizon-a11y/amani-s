import { Reveal } from '../../components/motion/Reveal';

const menuFormats = [
  {
    tag: 'Traditional',
    title: 'Banana Leaf & Sadya Feasts',
    copy: 'Complete multi-course authentic South Indian banquets served with traditional warmth.',
  },
  {
    tag: 'Morning & Evening',
    title: 'Breakfast & Tiffin Buffets',
    copy: 'Fresh idlis, crisp dosas, vadas, chutneys, and filter coffee brewed fresh on-site.',
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
    copy: 'Live dosa stations, freshly poured beverages, panakam, and traditional coolers.',
  },
  {
    tag: 'Sweet Endings',
    title: 'Desserts & Authentic Sweets',
    copy: 'Rich payasam, gulab jamun, halwas, and hand-crafted South Indian sweets.',
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
