import { Reveal } from '../../components/motion/Reveal';

export function WhyAmani() {
  return (
    <section id="why-amani" className="stories-why" aria-labelledby="why-amani-title">
      <div className="stories-container stories-why__statement">
        <Reveal><p className="stories-eyebrow">Why Amani? / 02</p></Reveal>
        <Reveal delay={0.06}>
          <h2 id="why-amani-title">Why <em>&ldquo;Amani&rdquo;</em>?</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="stories-why__lede">Spring doesn&rsquo;t ask to be noticed. It just comes back, every year, whether or not you were waiting for it.</p>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="stories-why__body">That&rsquo;s the feeling we wanted to build a restaurant around — not a single unforgettable meal, but the quiet certainty that you can come back to something good, and it&rsquo;ll still be there, still be itself. Amani isn&rsquo;t a promise we make once. It&rsquo;s one we keep repeating.</p>
        </Reveal>
      </div>
    </section>
  );
}
