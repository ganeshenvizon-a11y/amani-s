/**
 * Reveal — Entrance reveal animation using Motion for React.
 */
import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { motionTokens } from '../../lib/motionTokens';

interface RevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
}

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = motionTokens.duration.base,
  className = '',
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: motionTokens.distance.md, x: 0 };
      case 'down': return { y: -motionTokens.distance.md, x: 0 };
      case 'left': return { x: motionTokens.distance.md, y: 0 };
      case 'right': return { x: -motionTokens.distance.md, y: 0 };
      default: return { x: 0, y: 0 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...getInitialPosition() }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: motionTokens.ease.standard,
      }}
    >
      {children}
    </motion.div>
  );
}
