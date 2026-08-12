import { NavLink } from 'react-router-dom';
import { Reveal } from '../../components/motion/Reveal';

export function ClosingReservation() {
  return <section className="menu-closing" aria-labelledby="menu-closing-title"><img src="/media/images/testimonials/testimonial-family-biryani.png" alt="A family happily sharing a biryani meal together" loading="lazy" /><div aria-hidden="true" />
    <Reveal className="menu-closing__copy"><h2 id="menu-closing-title">Bring your<br /><em>appetite.</em></h2><p>We will make room at the table.</p><NavLink className="menu-button" to="/visit/#reserve">Book a table <span aria-hidden="true">→</span></NavLink></Reveal>
  </section>;
}
