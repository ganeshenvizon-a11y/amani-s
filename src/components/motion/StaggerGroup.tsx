/**
 * StaggerGroup — Staggered child reveals using Motion.
 */
import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { motionTokens } from '../../lib/motionTokens';

interface StaggerGroupProps {
  children: ReactNode;
  stagger?: number;
  className?: string;
}

export function StaggerGroup({
  children,
  stagger = motionTokens.stagger.base,
  className = '',
}: StaggerGroupProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: motionTokens.distance.sm },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: motionTokens.duration.base,
            ease: motionTokens.ease.standard,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
