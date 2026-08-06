/**
 * PublicLayout — shared shell for all main site pages.
 * Renders: SkipLink, UtilityBar, Header, children (page content), Footer.
 */
import type { ReactNode } from 'react';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      {/* SkipLink, UtilityBar, Header components go here */}
      <main id="main-content">
        {children}
      </main>
      {/* Footer component goes here */}
    </>
  );
}
