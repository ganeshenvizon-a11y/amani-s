/**
 * Amani — Root application router
 *
 * Flow on every page REFRESH:
 *   1. SiteLoader (GSAP logo animation) — loads on every refresh
 *   2. CinematicIntro (video scroll section from amani-new) — plays after loader
 *   3. When user clicks "View Restaurant" (or "View Menu"), main home/menu page comes!
 *
 * On internal navigation within the site:
 *   - SPA routes navigate cleanly within PublicLayout.
 */

import { useState, useCallback } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import { SiteLoader }     from '../components/motion/SiteLoader';
import { CinematicIntro } from '../components/motion/CinematicIntro';
import { PublicLayout }   from '../layouts/PublicLayout';

// ── Lazy page imports ────────────────────────────────────────────────────────
import { lazy, Suspense } from 'react';
const HomePage        = lazy(() => import('../pages/home/HomePage').then(m => ({ default: m.HomePage })));
const StoriesPage     = lazy(() => import('../pages/stories/StoriesPage').then(m => ({ default: m.StoriesPage })));
const MenuPage        = lazy(() => import('../pages/menu/MenuPage').then(m => ({ default: m.MenuPage })));
const GatheringsPage  = lazy(() => import('../pages/gatherings/GatheringsPage').then(m => ({ default: m.GatheringsPage })));
const VisitPage       = lazy(() => import('../pages/visit/VisitPage').then(m => ({ default: m.VisitPage })));
const NotFoundPage    = lazy(() => import('../pages/not-found/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// ── App shell ────────────────────────────────────────────────────────────────
function AppShell() {
  const navigate = useNavigate();
  const [loaderDone, setLoaderDone] = useState(false);
  const [introDone, setIntroDone]   = useState(false);

  const handleLoaderDone = useCallback(() => {
    setLoaderDone(true);
  }, []);

  const handleIntroDone = useCallback((destination: string) => {
    setIntroDone(true);
    navigate(destination);
  }, [navigate]);

  // Phase 1: Loader overlay on refresh
  if (!loaderDone) {
    return <SiteLoader onDone={handleLoaderDone} />;
  }

  // Phase 2: Cinematic video intro
  if (!introDone) {
    return <CinematicIntro onComplete={handleIntroDone} />;
  }

  // Phase 3: Main website
  return (
    <PublicLayout>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </PublicLayout>
  );
}

// ── Router definition ────────────────────────────────────────────────────────
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
      { index: true,             element: <HomePage /> },
      { path: 'stories/',        element: <StoriesPage /> },
      { path: 'menu/',           element: <MenuPage /> },
      { path: 'gatherings/',     element: <GatheringsPage /> },
      { path: 'visit/',          element: <VisitPage /> },
      { path: '*',               element: <NotFoundPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
