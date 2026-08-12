import { Reveal } from '../../components/motion/Reveal';

export function ThePhilosophy() {
  return (
    <section className="stories-philosophy" aria-labelledby="philosophy-title">
      <div className="stories-container stories-philosophy__grid">
        <Reveal className="stories-philosophy__label"><p className="stories-philosophy__small">Good food is only the beginning.</p></Reveal>
        <Reveal delay={0.08}><h2 id="philosophy-title">A meal becomes a memory when it is made with <em>attention.</em></h2></Reveal>
      </div>
    </section>
  );
}
