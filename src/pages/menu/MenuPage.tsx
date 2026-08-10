import { useEffect } from 'react';
import { Hero } from '../../sections/menu/Hero';
import { StickyCategories } from '../../sections/menu/StickyCategories';
import { MenuIntroduction } from '../../sections/menu/MenuIntroduction';
import { MoodFinder } from '../../sections/menu/MoodFinder';
import { MenuCategories } from '../../sections/menu/MenuCategories';
import { DietaryInformation } from '../../sections/menu/DietaryInformation';
import { DishDetailExperience } from '../../sections/menu/DishDetailExperience';
import { QROrdering } from '../../sections/menu/QROrdering';

export function MenuPage() {
  useEffect(() => {
    document.title = "Menu | Amani's South Indian Kitchen";
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      "Explore Amani's South Indian menu featuring authentic Andhra curries, biryanis, thalis, and handcrafted regional dishes.",
    );
  }, []);

  return (
    <div className="menu-page">
      {/* Section 01: Hero (Editorial Physics Card Deck matching Home Page architecture) */}
      <Hero />

      {/* Section 02: Sticky Category Navigation */}
      <StickyCategories />

      {/* Section 03: Menu Introduction */}
      <MenuIntroduction />

      {/* Section 04: Mood Finder */}
      <MoodFinder />

      {/* Section 05: Full Menu Categories */}
      <MenuCategories />

      {/* Section 06: Dietary Information */}
      <DietaryInformation />

      {/* Section 07: Signature Dish Highlight */}
      <DishDetailExperience />

      {/* Section 08: In-Restaurant QR Ordering */}
      <QROrdering />

    </div>
  );
}
