/**
 * PublicLayout — shared shell for all main site pages.
 * Renders: SkipLink, Header (floating), children (page content), Footer.
 */
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[var(--amani-canvas)] text-[var(--amani-ink)] font-sans">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[var(--amani-maroon)] focus:text-[var(--amani-canvas)] focus:rounded font-semibold text-xs uppercase tracking-widest"
      >
        Skip to main content
      </a>

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

      {/* Footer */}
      <Footer />
    </div>
  );
}
