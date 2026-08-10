import { Reveal } from '../../components/motion/Reveal';

const steps = [
  ['01', 'Ground in-house', 'Spice blends are dry-roasted and stone-ground the same day, never bought pre-mixed.'],
  ['02', 'Cooked with time', 'Stocks simmer for hours, dosa batter ferments overnight, and biryani is sealed for a slow dum.'],
  ['03', 'Brought to your table', 'Finished only when the flavour feels right, then served with unhurried generosity.'],
];

export function FromKitchenToTable() {
  return (
    <section className="stories-kitchen" aria-labelledby="kitchen-title"><div className="stories-container">
      <div className="stories-kitchen__heading">
        <p className="stories-eyebrow stories-eyebrow--light">From Kitchen to Table / 04</p>
        <h2 id="kitchen-title">From kitchen<br />to <em>table.</em></h2>
      </div>
      <p className="stories-kitchen__lede">Every dish here passes through more hands, and more time, than a menu can show you. The gongura is cleaned leaf by leaf; the fish curry is built on a stock started at dawn. Nothing is rushed into being ready.</p>
      <div className="stories-kitchen__feature"><img src="/media/images/grandma-cooking-stone-2.png" alt="Hands grinding fragrant spices for a South Indian meal" loading="lazy" /><p>Some recipes are written down. The ones we love most are felt.</p></div>
      <div className="stories-kitchen__steps">{steps.map(([number, title, copy], index) => <Reveal key={number} delay={index * 0.08}><article className="stories-kitchen__step"><span>{number}</span><h3>{title}</h3><p>{copy}</p></article></Reveal>)}</div>
    </div></section>
  );
}
