import { Reveal } from '../../components/motion/Reveal';

export function MenuIntroduction() {
  return <section className="menu-intro" aria-labelledby="menu-intro-title"><div className="menu-container menu-intro__grid">
    <Reveal><p className="menu-eyebrow">Our menu / 01</p></Reveal>
    <Reveal delay={.08}><h2 id="menu-intro-title">Food you know.<br />Flavours you <em>remember.</em></h2><p>Our kitchen takes its lead from Andhra homes: patient techniques, clear flavours and food that wants to be shared. Start wherever you like.</p></Reveal>
  </div></section>;
}
