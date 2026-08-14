/**
 * HomePage — Complete Amani Homepage component.
 * Assembles all 9 sections in the required visible sequence.
 */

import { Hero } from '../../sections/home/Hero';
import { GatheringStatement } from '../../sections/home/GatheringStatement';
import { MoodFinder } from '../../sections/home/MoodFinder';
import { ThaliExperience } from '../../sections/home/ThaliExperience';
import { AmaniNumbers } from '../../sections/home/AmaniNumbers';
import { BrandStory } from '../../sections/home/BrandStory';
import { SignatureDishes } from '../../sections/home/SignatureDishes';
import { GuestReviews } from '../../sections/home/GuestReviews';
import { QrOrdering } from '../../sections/home/QrOrdering';
import { VisitPreview } from '../../sections/home/VisitPreview';
import { GatheringsPreview } from '../../sections/home/GatheringsPreview';
import { ContactForm } from '../../sections/home/ContactForm';
import { SEO_CONFIG, getRestaurantJsonLd } from '../../config/seo';
import { useEffect } from 'react';

export function HomePage() {
  useEffect(() => {
    // Set Page Title & Meta Description
    document.title = SEO_CONFIG.defaultTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', SEO_CONFIG.defaultDescription);
    }
  }, []);

  const jsonLd = getRestaurantJsonLd();

  return (
    <>
      {/* Inject Restaurant JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full flex flex-col">
        <div className="home-hero-transition">
          {/* Section 01: Hero */}
          <Hero />

          {/* Section 02: Editorial transition */}
          <GatheringStatement />
        </div>

        {/* Section 03: Mood Finder */}
        <MoodFinder />

        {/* Section 04: Dietary Thali Experience */}
        <ThaliExperience />

        {/* Section 05: Amani By The Numbers */}
        <AmaniNumbers />

        {/* Section 05: Amani Brand Story */}
        <BrandStory />

        {/* Section 06: Signature Dishes */}
        <SignatureDishes />

        {/* Section 07: Guest Reviews */}
        <GuestReviews />

        {/* Section 07b: QR-Based Table Ordering */}
        <QrOrdering />

        {/* Section 08: Visit Preview */}
        <VisitPreview />

        {/* Section 09: Gatherings Preview & Final Reservation Invitation */}
        <GatheringsPreview />

        {/* Section 10: Contact Form */}
        <ContactForm />
      </div>
    </>
  );
}
