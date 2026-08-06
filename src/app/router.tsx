/**
 * Amani — Root application router & entry flow manager
 * Ensures page refresh always displays the active route cleanly without forcing intro video loops.
 */

import { useState, useCallback, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { SiteLoader } from '../components/motion/SiteLoader';
import { CinematicIntro } from '../components/motion/CinematicIntro';
import { ViewRestaurantTransition } from '../components/motion/ViewRestaurantTransition';
import { PublicLayout } from '../layouts/PublicLayout';

// ── Lazy page imports ────────────────────────────────────────────────────────
import { lazy, Suspense } from 'react';
const HomePage       = lazy(() => import('../pages/home/HomePage').then(m => ({ default: m.HomePage })));
const StoriesPage    = lazy(() => import('../pages/stories/StoriesPage').then(m => ({ default: m.StoriesPage })));
const MenuPage       = lazy(() => import('../pages/menu/MenuPage').then(m => ({ default: m.MenuPage })));
const GatheringsPage = lazy(() => import('../pages/gatherings/GatheringsPage').then(m => ({ default: m.GatheringsPage })));
const VisitPage      = lazy(() => import('../pages/visit/VisitPage').then(m => ({ default: m.VisitPage })));
const NotFoundPage   = lazy(() => import('../pages/not-found/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if session has visited site or if user is refreshing/navigating
  const [hasVisitedSession] = useState(() => {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem('amani_visited') === 'true';
  });

  // Loader state: Fast subtle initial loader on first page mount
  const [loaderDone, setLoaderDone] = useState(() => hasVisitedSession);

  // Intro state: Only show video intro if visiting root '/' and session hasn't visited yet
  const [introDone, setIntroDone] = useState(() => {
    return hasVisitedSession || location.pathname !== '/';
  });

  const [inTransition, setInTransition] = useState(false);
  const [pendingDest, setPendingDest] = useState<string | null>(null);

  // Mark session as visited on mount so refresh never loops back to intro
  useEffect(() => {
    try {
      sessionStorage.setItem('amani_visited', 'true');
    } catch {
      // Storage fallback
    }
  }, []);

  const handleLoaderDone = useCallback(() => {
    setLoaderDone(true);
  }, []);

  const handleIntroDone = useCallback((destination: string) => {
    try {
      sessionStorage.setItem('amani_visited', 'true');
    } catch {
      // Storage fallback
    }

    if (destination === '/') {
      setPendingDest(destination);
      setInTransition(true);
    } else {
      setIntroDone(true);
      navigate(destination);
    }
  }, [navigate]);

  const handleTransitionComplete = useCallback(() => {
    setInTransition(false);
    setIntroDone(true);
    if (pendingDest) {
      navigate(pendingDest);
    }
  }, [navigate, pendingDest]);

  // Phase 1: Fast loader on initial cold load (bypassed on refresh)
  if (!loaderDone) {
    return <SiteLoader onDone={handleLoaderDone} />;
  }

  // Phase 2: Smooth View Restaurant transition overlay
  if (inTransition) {
    return <ViewRestaurantTransition onComplete={handleTransitionComplete} />;
  }

  // Phase 3: Video intro screen (only on first cold session visit to '/')
  if (!introDone && location.pathname === '/') {
    return <CinematicIntro onComplete={handleIntroDone} />;
  }

  // Phase 4: Current Page Content inside PublicLayout
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
