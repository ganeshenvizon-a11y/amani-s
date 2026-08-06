/**
 * SplitTextReveal — Editorial text reveal effect line by line / word by word.
 */
import { motion, useReducedMotion } from 'motion/react';
import { motionTokens } from '../../lib/motionTokens';

interface SplitTextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span';
  stagger?: number;
  delay?: number;
}

export function SplitTextReveal({
  text,
  className = '',
  as: Component = 'div',
  stagger = 0.08,
  delay = 0,
}: SplitTextRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const lines = text.split('\n');

  if (shouldReduceMotion) {
    return (
      <Component className={className}>
        {lines.map((line, idx) => (
          <span key={idx} className="block">
            {line}
          </span>
        ))}
      </Component>
    );
  }

  return (
    <Component className={className}>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="overflow-hidden-wrapper block">
          <motion.span
            className="block"
            initial={{ y: '105%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: motionTokens.duration.slow,
              delay: delay + lineIdx * stagger,
              ease: motionTokens.ease.standard,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
