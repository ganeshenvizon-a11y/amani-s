/**
 * RouteTransition — SPA page transition wrapper.
 */
import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { motionTokens } from '../../lib/motionTokens';

export function RouteTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: motionTokens.duration.fast,
        ease: motionTokens.ease.standard,
      }}
    >
      {children}
    </motion.div>
  );
}
