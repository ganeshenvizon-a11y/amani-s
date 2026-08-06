/**
 * Amani — Root application router
 * Flow:
 *   First session visit to '/' → CinematicIntro video → navigate to destination
 *   All other cases → page renders immediately at top
 */

import { useState, useCallback, useEffect, useRef, lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { CinematicIntro } from '../components/motion/CinematicIntro';
import { PublicLayout } from '../layouts/PublicLayout';

// ── Lazy page imports ─────────────────────────────────────────────────────────
const HomePage       = lazy(() => import('../pages/home/HomePage').then(m => ({ default: m.HomePage })));
const StoriesPage    = lazy(() => import('../pages/stories/StoriesPage').then(m => ({ default: m.StoriesPage })));
const MenuPage       = lazy(() => import('../pages/menu/MenuPage').then(m => ({ default: m.MenuPage })));
const GatheringsPage = lazy(() => import('../pages/gatherings/GatheringsPage').then(m => ({ default: m.GatheringsPage })));
const VisitPage      = lazy(() => import('../pages/visit/VisitPage').then(m => ({ default: m.VisitPage })));
const NotFoundPage   = lazy(() => import('../pages/not-found/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// ── AppShell ──────────────────────────────────────────────────────────────────
function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const lenis    = useLenis();
  const prevPath = useRef(location.pathname);

  // Show CinematicIntro only on first cold session visit to '/'
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window === 'undefined') return true;
    const visited = sessionStorage.getItem('amani_visited') === 'true';
    return visited || location.pathname !== '/';
  });

  // Mark visited immediately so refresh never replays the intro
  useEffect(() => {
    try { sessionStorage.setItem('amani_visited', 'true'); } catch { /* noop */ }
  }, []);

  // Scroll to top on every SPA route change
  useEffect(() => {
    if (prevPath.current === location.pathname) return;
    prevPath.current = location.pathname;
    try {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    } catch {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, lenis]);

  // CinematicIntro done → navigate to chosen destination
  const handleIntroDone = useCallback((destination: string) => {
    setIntroDone(true);
    navigate(destination, { replace: true });
  }, [navigate]);

  // Show video intro on first cold visit to '/'
  if (!introDone && location.pathname === '/') {
    return <CinematicIntro onComplete={handleIntroDone} />;
  }

  // All other cases: render page immediately
  return (
    <PublicLayout>
      <ScrollRestoration />
      <Suspense fallback={null}>
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
      { path: 'stories/',    element: <StoriesPage /> },
      { path: 'menu/',       element: <MenuPage /> },
      { path: 'gatherings/', element: <GatheringsPage /> },
      { path: 'visit/',      element: <VisitPage /> },
      { path: '*',           element: <NotFoundPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
