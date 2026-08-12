import { type ReactNode } from 'react';

export interface StatCounterProps {
  value: string;
  label?: string;
  tone?: 'light' | 'dark';
  className?: string;
}

export function StatCounter({ value, label, tone = 'dark', className = '' }: StatCounterProps) {
  const valueColor = tone === 'light' ? 'text-[var(--amani-maroon)]' : 'text-[var(--amani-turmeric)]';
  const labelColor = tone === 'light' ? 'text-[var(--amani-ink-muted)]' : 'text-[var(--amani-cream-muted)]';

  return (
    <div className={`stat-counter-item flex flex-col ${className}`}>
      <span className={`stat-counter-value font-display text-2xl sm:text-3xl lg:text-4xl font-normal tracking-wide ${valueColor}`}>
        {value}
      </span>
      {label && (
        <span className={`stat-counter-label text-xs sm:text-sm font-medium tracking-widest uppercase mt-1 ${labelColor}`}>
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
