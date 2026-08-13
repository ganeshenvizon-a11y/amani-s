/**
 * Amani — Root application router
 * The homepage is the immediate root experience. Secondary pages remain
 * code-split, with a layout-stable fallback while their chunks load.
 */

import { useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { PublicLayout } from '../layouts/PublicLayout';
import { HomePage } from '../pages/home/HomePage';

// ── Lazy page imports ─────────────────────────────────────────────────────────
const StoriesPage    = lazy(() => import('../pages/stories/StoriesPage').then(m => ({ default: m.StoriesPage })));
const MenuPage       = lazy(() => import('../pages/menu/MenuPage').then(m => ({ default: m.MenuPage })));
const GatheringsPage = lazy(() => import('../pages/gatherings/GatheringsPage').then(m => ({ default: m.GatheringsPage })));
const CateringPage   = lazy(() => import('../pages/catering/CateringPage').then(m => ({ default: m.CateringPage })));
const VisitPage      = lazy(() => import('../pages/visit/VisitPage').then(m => ({ default: m.VisitPage })));
const FranchisePage  = lazy(() => import('../pages/franchise/FranchisePage').then(m => ({ default: m.FranchisePage })));
const NotFoundPage   = lazy(() => import('../pages/not-found/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// ── AppShell ──────────────────────────────────────────────────────────────────
function AppShell() {
  const location = useLocation();
  const lenis    = useLenis();
  const previousLocation = useRef<string | undefined>(undefined);

  // Always begin a non-hash route at its top. This runs before paint, avoiding
  // a momentary footer-first render on reload or on a route transition.
  useLayoutEffect(() => {
    const locationKey = `${location.pathname}${location.search}${location.hash}`;
    if (previousLocation.current === locationKey) return;
    previousLocation.current = locationKey;
    if (location.hash) return;

    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [lenis, location.hash, location.pathname, location.search]);

  // Refresh scroll-based layouts after fonts and image dimensions settle.
  useEffect(() => {
    const refreshScrollLayout = () => window.dispatchEvent(new Event('resize'));
    const fontsReady = document.fonts?.ready;
    fontsReady?.then(refreshScrollLayout).catch(() => undefined);
    window.addEventListener('load', refreshScrollLayout, { once: true });
    return () => window.removeEventListener('load', refreshScrollLayout);
  }, []);

  // Handle smooth scrolling to target form/section element when location has a hash fragment
  useEffect(() => {
    if (!location.hash) return;

    const hash = location.hash;
    const targetId = hash.replace('#', '');
    if (!targetId) return;

    const OFFSET = -80;
    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 30; // Retry up to 3 seconds while lazy components mount
    const timers: ReturnType<typeof setTimeout>[] = [];

    const getTarget = () =>
      (document.getElementById(targetId) ||
        document.querySelector(hash)) as HTMLElement | null;

    const alignTo = (element: HTMLElement, immediate: boolean) => {
      if (lenis) {
        lenis.scrollTo(element, { offset: OFFSET, duration: immediate ? 0 : 1.2, immediate });
      } else {
        const top = element.getBoundingClientRect().top + window.scrollY + OFFSET;
        window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
      }
    };

    // Re-align without animation while content above the target settles (images
    // and fonts loading can shift its final position after the first scroll).
    const settle = (deadline: number) => {
      if (cancelled) return;
      const element = getTarget();
      if (element) alignTo(element, true);
      if (Date.now() < deadline) {
        timers.push(setTimeout(() => settle(deadline), 250));
      }
    };

    const scrollToHashTarget = () => {
      if (cancelled) return;
      const element = getTarget();
      if (element) {
        alignTo(element, false);
        // Correct for layout shift over a short window after the smooth scroll.
        timers.push(setTimeout(() => settle(Date.now() + 1600), 700));
      } else if (attempts < maxAttempts) {
        attempts++;
        timers.push(setTimeout(scrollToHashTarget, 100));
      }
    };

    timers.push(setTimeout(scrollToHashTarget, 120));
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [location.pathname, location.hash, lenis]);

  return (
    <PublicLayout>
      <Suspense fallback={<div className="route-loading" role="status"><span className="sr-only">Loading page</span></div>}>
        <Outlet />
      </Suspense>
    </PublicLayout>
  );
}

// ── Router definition ─────────────────────────────────────────────────────────
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    errorElement: (
      <Suspense fallback={null}>
        <NotFoundPage />
      </Suspense>
    ),
    children: [
      { index: true,         element: <HomePage /> },
      { path: 'stories',     element: <StoriesPage /> },
      { path: 'stories/',    element: <StoriesPage /> },
      { path: 'menu',        element: <MenuPage /> },
      { path: 'menu/',       element: <MenuPage /> },
      { path: 'gatherings',  element: <GatheringsPage /> },
      { path: 'gatherings/', element: <GatheringsPage /> },
      { path: 'catering',    element: <CateringPage /> },
      { path: 'catering/',   element: <CateringPage /> },
      { path: 'visit',       element: <VisitPage /> },
      { path: 'visit/',      element: <VisitPage /> },
      { path: 'franchise',   element: <FranchisePage /> },
      { path: 'franchise/',  element: <FranchisePage /> },
      { path: '*',           element: <NotFoundPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
