import { type ReactNode } from 'react';

export interface CardProps {
  numberTag?: string;
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
}

export function Card({ numberTag, title, description, icon, className = '' }: CardProps) {
  return (
    <div
      className={`franchise-card group relative p-6 sm:p-8 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(216,199,170,0.15)] hover:border-[var(--amani-turmeric)] transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 ${className}`}
    >
      <div>
        {numberTag && (
          <div className="text-xs font-bold tracking-widest uppercase text-[var(--amani-turmeric)] mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--amani-turmeric)]" />
            {numberTag}
          </div>
        )}
        {icon && <div className="mb-4 text-[var(--amani-turmeric)]">{icon}</div>}
        <h3 className="font-display text-2xl sm:text-3xl font-normal text-[var(--amani-cream-on-dark)] mb-3 group-hover:text-[var(--amani-turmeric)] transition-colors">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-[var(--amani-cream-muted)] leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs text-[var(--amani-turmeric)] opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Amani&apos;s Advantage</span>
        <span aria-hidden="true">&rarr;</span>
      </div>
    </div>
  );
}
