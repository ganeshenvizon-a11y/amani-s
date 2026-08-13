import { Link } from 'react-router-dom';
import { Reveal } from '../../components/motion/Reveal';

export function RestaurantHostingCTA() {
  return (
    <section className="cater-cta-section" aria-labelledby="cater-cta-title">
      <div className="cater-container cater-cta-inner">
        <Reveal>
          <h2 id="cater-cta-title">
            Hosting at the <em>Restaurant Instead?</em>
          </h2>
          <p>
            Catering brings Amani&rsquo;s to your chosen venue. For private celebrations hosted at our tables, explore event planning with us at the restaurant.
          </p>
          <div className="cater-cta-actions">
            <Link to="/gatherings" className="cater-button">
              Explore Gatherings <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
