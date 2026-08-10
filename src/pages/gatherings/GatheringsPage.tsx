import { useEffect } from 'react';
import { Hero } from '../../sections/gatherings/Hero';
import { Gallery } from '../../sections/gatherings/Gallery';
import { PlanningProcess } from '../../sections/gatherings/PlanningProcess';
import { EnquiryForm } from '../../sections/gatherings/EnquiryForm';

export function GatheringsPage() {
  useEffect(() => {
    document.title = "Gatherings | Amani's South Indian Kitchen";
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      "Host birthdays, weddings, corporate events and family celebrations at Amani's. See how it works and start planning your gathering.",
    );
  }, []);

  return (
    <div className="gatherings-page">
      {/* 01 — Hero + occasions */}
      <Hero />

      {/* 02 — Gallery of hosted moments */}
      <Gallery />

      {/* 03 — How it works */}
      <PlanningProcess />

      {/* 04 — Enquiry form */}
      <EnquiryForm />
    </div>
  );
}
