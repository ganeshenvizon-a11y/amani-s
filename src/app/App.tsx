/**
 * Amani — App.tsx
 * Wraps AppRouter with all global providers.
 */
import { AppRouter } from './router';
import { SmoothScrollProvider } from '../components/motion/SmoothScrollProvider';

export function App() {
  return (
    <SmoothScrollProvider>
      <AppRouter />
    </SmoothScrollProvider>
  );
}
