import { useEffect } from 'react';
import { Hero } from '../../sections/visit/Hero';
import { LiveStatus } from '../../sections/visit/LiveStatus';
import { RestaurantInformation } from '../../sections/visit/RestaurantInformation';
import { FAQs } from '../../sections/visit/FAQs';
import { ContactForm } from '../../sections/home/ContactForm';

export function VisitPage() {
  useEffect(() => {
    document.title = "Visit | Amani's South Indian Kitchen";
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      "Find Amani's in Jubilee Hills, Hyderabad — today's hours, directions, good-to-know details and answers to common questions.",
    );
  }, []);

  return (
    <div className="visit-page">
      {/* 01 — Hero */}
      <Hero />

      {/* 02 — Find Us: live status, address, directions & map */}
      <LiveStatus />

      {/* 03 — Good to Know */}
      <RestaurantInformation />

      {/* 04 — FAQ */}
      <FAQs />

      {/* 05 — Table Reservation & Contact Form */}
      <ContactForm />
    </div>
  );
}
