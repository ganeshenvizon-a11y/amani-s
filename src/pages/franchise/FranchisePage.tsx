import { useEffect } from 'react';
import { FranchiseFormSection } from '../../sections/franchise/FranchiseFormSection';
import { FranchiseHero } from '../../sections/franchise/FranchiseHero';
import { ValuePropositionGrid } from '../../sections/franchise/ValuePropositionGrid';

export function FranchisePage() {
  useEffect(() => {
    document.title = "Franchise Opportunities | Amani's South Indian Kitchen";
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      "Own an Amani's Restaurant franchise. Partner with us to bring authentic South Indian heritage and high-growth dining experiences to food lovers everywhere.",
    );
  }, []);

  return (
    <div className="franchise-page bg-[var(--amani-canvas)] min-h-screen text-[var(--amani-ink)]">
      {/* 01 — Hero Section */}
      <FranchiseHero />

      {/* 02 — Value Proposition Grid Section */}
      <ValuePropositionGrid />

      {/* 03 — Franchising Form Section */}
      <FranchiseFormSection />
    </div>
  );
}
