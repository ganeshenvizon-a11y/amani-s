import { type ReactNode, type HTMLAttributes } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export function Section({ children, className = '', id, dark = false, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 relative overflow-hidden ${
        dark
          ? 'bg-[var(--amani-void)] text-[var(--amani-cream-on-dark)]'
          : 'bg-[var(--amani-canvas)] text-[var(--amani-ink)]'
      } ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
