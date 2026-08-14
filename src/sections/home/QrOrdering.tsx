/**
 * Section — QR-Based Table Ordering
 * Editorial two-column layout: phone mockup of the in-table ordering app
 * alongside a short "scan, order, relax" walkthrough. Mirrors the warm cream
 * palette and heading treatment of the Guest Stories testimonial section.
 */

import { QR_ORDERING_CONTENT } from '../../content/home';
import { Reveal } from '../../components/motion/Reveal';

export function QrOrdering() {
  const content = QR_ORDERING_CONTENT;

  return (
    <section
      className="qr-ordering-section relative overflow-hidden"
      aria-labelledby="qr-ordering-heading"
    >
      {/* Background pattern texture, matching the stories section */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply z-0"
        aria-hidden="true"
      >
        <img
          src="/media/images/hero-pattern.png"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="qr-ordering-container relative z-10">
        {/* Left — Editorial copy */}
        <Reveal direction="right" className="qr-ordering-copy">
          <h2 id="qr-ordering-heading" className="qr-ordering-heading">
            <span className="qr-ordering-heading-script">{content.headingScript}</span>
            <span className="qr-ordering-heading-main">{content.headingMain}</span>
          </h2>

          <p className="qr-ordering-body">{content.body}</p>

          <ol className="qr-ordering-steps">
            {content.steps.map((step) => (
              <li className="qr-ordering-step" key={step.number}>
                <span className="qr-ordering-step__num" aria-hidden="true">
                  {step.number}
                </span>
                <div className="qr-ordering-step__text">
                  <h3 className="qr-ordering-step__title">{step.title}</h3>
                  <p className="qr-ordering-step__desc">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <a className="qr-ordering-cta" href={content.ctaLink}>
            <span>{content.ctaText}</span>
            <span className="qr-ordering-cta__line" aria-hidden="true" />
          </a>
        </Reveal>

        {/* Right — Phone mockup */}
        <Reveal direction="left" delay={0.1} className="qr-ordering-visual">
          <div className="qr-ordering-phone">
            <img
              className="qr-ordering-phone__img"
              src={content.image}
              alt={content.imageAlt}
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
