import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

const moments = [
  { year: 'The kitchen', text: 'A stone grinder, a well-worn notebook of Andhra recipes, and the food a family grew up on.' },
  { year: '2018', text: 'Those recipes found a room of their own in Jubilee Hills, Hyderabad — cooked the same way, for strangers now.' },
  { year: 'Today', text: 'The family has grown, the tables have multiplied, and the welcome is still made one plate at a time.' },
];

export function OurBeginning() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.stories-beginning__image', { clipPath: 'inset(14% 10% 14% 10%)', scale: 1.12 }, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.15, ease: 'power4.out', stagger: 0.12, scrollTrigger: { trigger: section, start: 'top 72%' } });
      gsap.fromTo('.stories-timeline__item', { opacity: 0, x: -22 }, { opacity: 1, x: 0, duration: 0.65, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.stories-timeline', start: 'top 82%' } });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="stories-beginning" aria-labelledby="beginning-title">
      <div className="stories-container">
        <div className="stories-beginning__intro">
          <div className="stories-beginning__title-wrap">
            <p className="stories-eyebrow">OUR BEGINNING / 03</p>
            <h2 id="beginning-title">Our <em>beginning.</em></h2>
          </div>
          <p className="stories-beginning__summary">The family behind Amani didn&rsquo;t set out to open a restaurant. They set out to recreate a kitchen they missed — a home kitchen in Hyderabad, and the Andhra cooking that came out of it.</p>
        </div>
        <div className="stories-beginning__collage">
          <figure className="stories-beginning__image stories-beginning__image--main"><img src="/media/images/grandma-cooking-stone-1.png" alt="A grandmother preparing food on a traditional stone grinder" loading="lazy" /></figure>
          <figure className="stories-beginning__image stories-beginning__image--small"><img src="/media/images/story/amani-story-02-first-room.webp" alt="The first warmly dressed Amani dining room" loading="lazy" /></figure>
          <div className="stories-beginning__stamp" aria-hidden="true">FROM OUR<br />HOME TO YOURS</div>
        </div>
        <ol className="stories-timeline">{moments.map((moment) => <li className="stories-timeline__item" key={moment.year}><span>{moment.year}</span><p>{moment.text}</p></li>)}</ol>
      </div>
    </section>
  );
}
