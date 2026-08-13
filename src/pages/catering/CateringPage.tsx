import { useEffect } from 'react';
import { Hero } from '../../sections/catering/Hero';
import { Occasions } from '../../sections/catering/Occasions';
import { MenuFormats } from '../../sections/catering/MenuFormats';
import { PlanningProcess } from '../../sections/catering/PlanningProcess';
import { EnquiryForm } from '../../sections/catering/EnquiryForm';
import { RestaurantHostingCTA } from '../../sections/catering/RestaurantHostingCTA';

export function CateringPage() {
  useEffect(() => {
    document.title = "Catering | Amani's South Indian Kitchen";
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      "Amani's catering brings South Indian menus, thoughtful planning and warm service to weddings, ceremonies and corporate events across Hyderabad.",
    );
  }, []);

  return (
    <div className="catering-page">
      {/* 01 — Hero */}
      <Hero />

      {/* 02 — Occasions We Cater */}
      <Occasions />

      {/* 03 — Menus Shaped Around Your Occasion */}
      <MenuFormats />

      {/* 04 — How Planning Works */}
      <PlanningProcess />

      {/* 05 — Request a Quote Form */}
      <EnquiryForm />

      {/* 06 — Restaurant Hosting CTA */}
      <RestaurantHostingCTA />
    </div>
  );
}
