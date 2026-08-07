/**
 * HomePage — Complete Amani Homepage component.
 * Assembles all 9 sections in the required visible sequence.
 */

import { Hero } from '../../sections/home/Hero';
import { GatheringStatement } from '../../sections/home/GatheringStatement';
import { MoodFinder } from '../../sections/home/MoodFinder';
import { ThaliExperience } from '../../sections/home/ThaliExperience';
import { BrandStory } from '../../sections/home/BrandStory';
import { SignatureDishes } from '../../sections/home/SignatureDishes';
import { TheAmaniWay } from '../../sections/home/TheAmaniWay';
import { InsideAmani } from '../../sections/home/InsideAmani';
import { GuestReviews } from '../../sections/home/GuestReviews';
import { VisitPreview } from '../../sections/home/VisitPreview';
import { GatheringsPreview } from '../../sections/home/GatheringsPreview';
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

        {/* Section 05: Amani Brand Story */}
        <BrandStory />

        {/* Section 06: Signature Dishes */}
        <SignatureDishes />

        {/* Section 05: The Amani Way */}
        <TheAmaniWay />

        {/* Section 06: Inside Amani */}
        <InsideAmani />

        {/* Section 07: Guest Reviews */}
        <GuestReviews />

        {/* Section 08: Visit Preview */}
        <VisitPreview />

        {/* Section 09: Gatherings Preview & Final Reservation Invitation */}
        <GatheringsPreview />
      </div>
    </>
  );
}
