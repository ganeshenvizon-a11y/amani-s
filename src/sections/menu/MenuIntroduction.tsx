import { Reveal } from '../../components/motion/Reveal';

export function MenuIntroduction() {
  return (
    <section className="menu-intro" aria-labelledby="menu-intro-title">
      <div className="menu-container">
        <div className="menu-intro__head">
          <div className="menu-intro__title-wrap">
            <Reveal>
              <p className="menu-eyebrow">Our menu / 01</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 id="menu-intro-title">
                Food you know.<br />Flavours you <em>remember.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="menu-intro__summary">
              Our kitchen takes its lead from Andhra homes: patient techniques, clear flavours and food that wants to be shared. Start wherever you like.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

