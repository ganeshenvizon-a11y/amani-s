import { Reveal } from '../../components/motion/Reveal';

const shots = [
  { src: '/media/images/gathering-interior-01.webp', alt: 'A warmly lit private dining room set for a celebration', span: 'tall' },
  { src: '/media/images/testimonials/testimonial-grand-family.jpg', alt: 'A large family gathered around a shared meal' },
  { src: '/media/images/gathering-interior-02.webp', alt: 'Tables arranged for a group event at Amani' },
  { src: '/media/images/story/amani-story-03-family-table.webp', alt: 'Friends sharing dishes across a full table', span: 'wide' },
  { src: '/media/images/gathering-interior-04.webp', alt: 'An intimate corner set for a small gathering' },
  { src: '/media/images/gathering-interior-05.webp', alt: 'The dining room dressed for an evening celebration' },
  { src: '/media/images/happy-south-indian-dining.png', alt: 'Guests enjoying a South Indian feast together' },
];

export function Gallery() {
  return (
    <section id="gallery" className="gath-gallery" aria-labelledby="gath-gallery-title">
      <div className="gath-container">
        <Reveal className="gath-head">
          <p className="gath-eyebrow">Gallery / 02</p>
          <h2 id="gath-gallery-title">Moments we&rsquo;ve <em>hosted.</em></h2>
          <p>A few of the celebrations Amani has been part of.</p>
        </Reveal>
        <div className="gath-gallery__grid">
          {shots.map((shot) => (
            <figure
              key={shot.src}
              className={`gath-gallery__item${shot.span === 'tall' ? ' gath-gallery__item--tall' : ''}${shot.span === 'wide' ? ' gath-gallery__item--wide' : ''}`}
            >
              <img src={shot.src} alt={shot.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
