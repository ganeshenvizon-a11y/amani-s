import { type ReactNode } from 'react';

export interface StatCounterProps {
  value: string;
  label?: string;
  className?: string;
}

export function StatCounter({ value, label, className = '' }: StatCounterProps) {
  return (
    <div className={`stat-counter-item flex flex-col ${className}`}>
      <span className="stat-counter-value font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider text-[var(--amani-turmeric)]">
        {value}
      </span>
      {label && (
        <span className="stat-counter-label text-xs sm:text-sm font-medium tracking-widest uppercase text-[var(--amani-cream-muted)] mt-1">
          {label}
        </span>
      )}
    </div>
  );
}

export interface StatGroupProps {
  children: ReactNode;
  className?: string;
}

export function StatGroup({ children, className = '' }: StatGroupProps) {
  return (
    <div className={`stat-group flex flex-wrap items-center gap-6 sm:gap-10 md:gap-12 py-4 ${className}`}>
      {children}
    </div>
  );
}
