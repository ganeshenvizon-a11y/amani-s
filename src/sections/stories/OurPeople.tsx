import { Reveal } from '../../components/motion/Reveal';

export function OurPeople() {
  return (
    <section className="stories-people" aria-labelledby="people-title">
      <div className="stories-container stories-people__grid">
        <Reveal className="stories-people__portrait" direction="left"><img src="/media/images/story/amani-story-05-today.webp" alt="A member of the Amani team bringing dishes to the dining room" loading="lazy" /></Reveal>
        <Reveal className="stories-people__copy" delay={0.1}><p className="stories-eyebrow">The people / 05</p><h2 id="people-title">The heart of the house is always <em>human.</em></h2><p>Our founder, our cooks, and our floor team share the same instinct: notice what makes someone comfortable, then quietly make it happen.</p><p className="stories-people__signature">Amani family</p></Reveal>
      </div>
    </section>
  );
}
