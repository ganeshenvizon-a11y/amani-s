import { useEffect } from 'react';
import { Hero } from '../../sections/stories/Hero';
import { WhyAmani } from '../../sections/stories/WhyAmani';
import { OurBeginning } from '../../sections/stories/OurBeginning';
import { FromKitchenToTable } from '../../sections/stories/FromKitchenToTable';
import { ADayAtAmani } from '../../sections/stories/ADayAtAmani';

export function StoriesPage() {
  useEffect(() => {
    document.title = "Stories | Amani's South Indian Kitchen";
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      "Why Amani means spring, how the kitchen came to be, and the rituals behind a table worth returning to.",
    );
  }, []);

  return (
    <div className="stories-page">
      {/* 01 — Hero: the story behind every return */}
      <Hero />

      {/* 02 — Why "Amani"? */}
      <WhyAmani />

      {/* 03 — Our Beginning */}
      <OurBeginning />

      {/* 04 — From Kitchen to Table */}
      <FromKitchenToTable />

      {/* 05 — A Day at Amani */}
      <ADayAtAmani />

      {/* Closing — Some visits become traditions */}
    </div>
  );
}
