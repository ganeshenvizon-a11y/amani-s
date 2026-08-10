import { NavLink } from 'react-router-dom';
import { Reveal } from '../../components/motion/Reveal';

export function ClosingInvitation() {
  return (
    <section className="stories-closing" aria-labelledby="closing-title">
      <img src="/media/images/testimonials/testimonial-grand-family.jpg" alt="A smiling family enjoying their time together at Amani's" loading="lazy" />
      <div className="stories-closing__overlay" aria-hidden="true" />
      <Reveal className="stories-closing__content">
        <p className="stories-eyebrow stories-eyebrow--light">The table is set</p>
        <h2 id="closing-title">Some visits become<br /><em>traditions.</em></h2>
        <p>We hope every first visit becomes the beginning of many more.</p>
        <div className="stories-closing__actions">
          <NavLink to="/menu/" className="stories-button">View the menu <span aria-hidden="true">→</span></NavLink>
          <NavLink to="/visit/#reserve" className="stories-button stories-button--outline">Reserve a table <span aria-hidden="true">→</span></NavLink>
        </div>
      </Reveal>
    </section>
  );
}
