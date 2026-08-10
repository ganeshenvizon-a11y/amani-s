/**
 * Amani's — Visual Testimonial / Guest Stories Section
 * "Stories from THE TABLE."
 * High-quality stock photography, restrained Amani color palette,
 * Interactive draggable & placeable memory cards spaced radially outward.
 */
import { useEffect, useRef, useState } from 'react';
import { RESTAURANT_CONFIG } from '../../config/restaurant';
import { gsap } from '../../lib/gsap';

export interface GuestStoryCard {
  id: string;
  tag: string;
  tagType: 'cream' | 'terracotta';
  image: string;
  alt: string;
  quote: string;
  author: string;
  sizeClass: string;
  desktopPosClasses: string;
  rotation: string;
  badgePosition: 'bottom-right' | 'bottom-left' | 'top-left' | 'top-right';
  cloudSide: 'left' | 'right';
  initialY: number;
  initialRotation: number;
}

const STORY_CARDS: GuestStoryCard[] = [
  {
    id: 'story-couple-curry',
    tag: 'A table for two',
    tagType: 'cream',
    image: '/media/images/testimonials/testimonial-couple.jpg',
    alt: 'Couple sharing a warm South Indian fish curry meal in a softly lit dining room',
    quote: 'The fish curry and warm hospitality made our anniversary dinner feel so intimate and special.',
    author: 'Gurpreet & Harpreet',
    sizeClass: 'w-[160px] md:w-[180px] lg:w-[195px] xl:w-[205px]',
    desktopPosClasses: 'top-[10%] left-[3%]',
    rotation: '-2.5deg',
    badgePosition: 'bottom-right',
    cloudSide: 'right',
    initialY: 35,
    initialRotation: -4,
  },
  {
    id: 'story-grand-family',
    tag: 'The grand family thali',
    tagType: 'terracotta',
    image: '/media/images/testimonials/testimonial-grand-family.jpg',
    alt: 'Multi-generational South Indian family gathered around a central thali feast',
    quote: 'Passing platters across three generations — it felt just like our Sunday home gatherings.',
    author: 'The Sundaram Family',
    sizeClass: 'w-[170px] md:w-[190px] lg:w-[210px] xl:w-[220px]',
    desktopPosClasses: 'top-[5%] left-[72%]',
    rotation: '1.5deg',
    badgePosition: 'bottom-left',
    cloudSide: 'left',
    initialY: 40,
    initialRotation: 3,
  },
  {
    id: 'story-dosa',
    tag: 'Just like Ammamma’s',
    tagType: 'cream',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=85&w=1200&auto=format&fit=crop',
    alt: 'Golden crisp Mysore masala dosa served with coconut chutneys',
    quote: 'Simple, warm and familiar — the kind of food you don’t need to explain.',
    author: 'Sriram',
    sizeClass: 'w-[150px] md:w-[170px] lg:w-[185px] xl:w-[195px]',
    desktopPosClasses: 'top-[44%] left-[2%]',
    rotation: '2.2deg',
    badgePosition: 'bottom-right',
    cloudSide: 'right',
    initialY: 30,
    initialRotation: 4,
  },
  {
    id: 'story-kaapi',
    tag: 'Stayed for the kaapi',
    tagType: 'terracotta',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=85&w=1200&auto=format&fit=crop',
    alt: 'South Indian filter coffee poured into traditional brass tumbler',
    quote: 'We finished lunch and still sat around for another brass davara filter coffee.',
    author: 'Keerthi',
    sizeClass: 'w-[145px] md:w-[165px] lg:w-[180px] xl:w-[190px]',
    desktopPosClasses: 'top-[72%] left-[5%]',
    rotation: '-1.5deg',
    badgePosition: 'bottom-right',
    cloudSide: 'right',
    initialY: 45,
    initialRotation: -2,
  },
  {
    id: 'story-happy-dining',
    tag: 'Felt like home',
    tagType: 'cream',
    image: '/media/images/happy-south-indian-dining.png',
    alt: 'South Indian family sharing dishes on fresh banana leaf',
    quote: 'The rasam and slow-simmered curries brought back memories of home.',
    author: 'Ananya & Family',
    sizeClass: 'w-[160px] md:w-[180px] lg:w-[195px] xl:w-[205px]',
    desktopPosClasses: 'top-[68%] left-[76%]',
    rotation: '2.5deg',
    badgePosition: 'bottom-left',
    cloudSide: 'left',
    initialY: 40,
    initialRotation: 3,
  },
  {
    id: 'story-chettinad-roast',
    tag: 'Flavours from fire',
    tagType: 'cream',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=85&w=1200&auto=format&fit=crop',
    alt: 'Chettinad roasted curry with aromatic spices',
    quote: 'Freshly ground masalas and vibrant heat. Everyone ended up sharing from each other’s plate.',
    author: 'Nikhil',
    sizeClass: 'w-[155px] md:w-[175px] lg:w-[190px] xl:w-[200px]',
    desktopPosClasses: 'top-[38%] left-[80%]',
    rotation: '-2.2deg',
    badgePosition: 'bottom-left',
    cloudSide: 'left',
    initialY: 35,
    initialRotation: -3,
  },
];

function DraggableStoryCard({ card }: { card: GuestStoryCard }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ pointerX: 0, pointerY: 0, startX: 0, startY: 0 });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== undefined && e.button !== 0) return;
    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStartRef.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      startX: offset.x,
      startY: offset.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.pointerX;
    const dy = e.clientY - dragStartRef.current.pointerY;
    setOffset({
      x: dragStartRef.current.startX + dx,
      y: dragStartRef.current.startY + dy,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setIsDragging(false);
  };

  return (
    <div
      className={`amani-story-card absolute pointer-events-auto ${card.desktopPosClasses} ${
        isDragging ? 'z-50 cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0) rotate(${card.rotation})`,
        touchAction: 'none',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className={`amani-story-card-inner ${isDragging ? 'is-dragging' : ''}`}>
        {/* Side Thought-Cloud Memory Popover Tooltip (Appears on Hover) */}
        <div className={`amani-story-cloud amani-story-cloud--${card.cloudSide}`}>
          <p className="amani-story-cloud-quote">“{card.quote}”</p>
          <span className="amani-story-cloud-author">— {card.author}</span>
          <div className="amani-story-cloud-arrow" />
        </div>

        {/* Clean Photo Image Box (Uncovered on Hover) */}
        <div className={`amani-story-image-box ${card.sizeClass}`}>
          <img
            src={card.image}
            alt={card.alt}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>

        {/* Overlapping Pill Tag */}
        <div
          className={`amani-story-tag amani-story-tag--${card.tagType} amani-story-tag--${card.badgePosition}`}
        >
          <span>{card.tag}</span>
        </div>
      </div>
    </div>
  );
}

export function GuestReviews() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const heading = section.querySelector('.amani-stories-heading');
      const subcopy = section.querySelector('.amani-stories-subcopy');
      const reviewCard = section.querySelector('.amani-google-review-card');
      const cards = section.querySelectorAll('.amani-story-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      });

      // Animate cards with organic stagger
      tl.fromTo(
        cards,
        {
          autoAlpha: 0,
          y: (i) => STORY_CARDS[i].initialY,
          rotation: (i) => STORY_CARDS[i].initialRotation,
        },
        {
          autoAlpha: 1,
          y: 0,
          rotation: (i) => STORY_CARDS[i].rotation,
          duration: 0.95,
          ease: 'power3.out',
          stagger: 0.08,
        }
      );

      // Central typography entrance
      tl.fromTo(
        [heading, subcopy, reviewCard].filter(Boolean),
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
        },
        '-=0.7'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="guest-stories"
      className="amani-stories-section relative overflow-hidden"
      aria-label="Stories from the table — Guest Testimonials"
    >
      {/* Hero Background Pattern Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-35 mix-blend-multiply z-0" aria-hidden="true">
        <img
          src="/media/images/hero-pattern.png"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="amani-stories-container relative z-10">
        {/* Central Editorial Content */}
        <div className="amani-stories-center-box">
          <h2 className="amani-stories-heading">
            <span className="amani-stories-heading-script">Stories from</span>
            <span className="amani-stories-heading-main">THE TABLE.</span>
          </h2>

          <p className="amani-stories-subcopy">Some meals stay with you.</p>

          <a
            className="amani-google-review-card"
            href={RESTAURANT_CONFIG.contact.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Rate Amani's on Google"
          >
            <span className="amani-google-review-card__mark" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
            </span>
            <span className="amani-google-review-card__copy">
              <span className="amani-google-review-card__eyebrow">SHARE YOUR EXPERIENCE</span>
              <span className="amani-google-review-card__title">Rate us on Google</span>
            </span>
            <span className="amani-google-review-card__rating">
              <span className="amani-google-review-card__star" aria-hidden="true">★</span>
              <strong>{RESTAURANT_CONFIG.googleRating}</strong>
            </span>
            <span className="amani-google-review-card__arrow" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </span>
          </a>
        </div>

        {/* Draggable & Placeable Floating Cards (Desktop) */}
        <div className="hidden md:block w-full h-full absolute inset-0 pointer-events-none">
          {STORY_CARDS.map((card) => (
            <DraggableStoryCard key={card.id} card={card} />
          ))}
        </div>

        {/* Mobile UX Carousel (<768px) */}
        <div className="md:hidden w-full mt-8 overflow-x-auto snap-x snap-mandatory flex gap-4 px-4 pb-6 scrollbar-none">
          {STORY_CARDS.map((card) => (
            <div
              key={`mobile-${card.id}`}
              className="snap-center flex-shrink-0 w-[80vw] max-w-[310px]"
            >
              <div className="amani-story-card-inner relative">
                <div className="amani-story-image-box w-full aspect-[1.25/1]">
                  <img src={card.image} alt={card.alt} loading="lazy" decoding="async" />

                  {/* Testimonial Quote permanently visible on mobile */}
                  <div className="amani-story-mobile-overlay">
                    <p className="amani-story-quote">“{card.quote}”</p>
                    <span className="amani-story-author">— {card.author}</span>
                  </div>
                </div>

                <div
                  className={`amani-story-tag amani-story-tag--${card.tagType} amani-story-tag--bottom-left`}
                >
                  <span>{card.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
