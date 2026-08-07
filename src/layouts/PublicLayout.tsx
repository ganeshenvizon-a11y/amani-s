/**
 * PublicLayout — shared shell for all main site pages.
 * Renders: SkipLink, Header (floating), and page content.
 */
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { RangoliChakriCursor } from '../components/motion/RangoliChakriCursor';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[var(--amani-canvas)] text-[var(--amani-ink)] font-sans">
      {/* Traditional Rangoli Kolam / Chakri Custom Cursor — Home Page Only */}
      {isHomePage && <RangoliChakriCursor />}

      {/* Floating Fixed Header */}
      <Header />

      {/* Main Page Content — hero pages bleed under the floating header, others get clearance */}
      <main
        id="main-content"
        tabIndex={-1}
        className={`flex-1 w-full outline-none ${isHomePage ? '' : 'pt-24 md:pt-28'}`}
      >
        {children}
      </main>
    </div>
  );
}
