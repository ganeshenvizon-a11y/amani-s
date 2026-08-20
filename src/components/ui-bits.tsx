import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface SectionProps {
  children: ReactNode;
  tone?: 'default' | 'sand' | 'cocoa';
  eyebrow?: string;
  id?: string;
  className?: string;
}

export function Section({ children, tone = 'default', eyebrow, id, className = '' }: SectionProps) {
  let toneClass = 'bg-[var(--amani-canvas)] text-[var(--amani-ink)]';
  if (tone === 'sand') {
    toneClass = 'bg-[var(--amani-paper)] text-[var(--amani-ink)] border-y border-[var(--amani-hairline)]';
  } else if (tone === 'cocoa') {
    toneClass = 'bg-[#1a0f0a] text-[var(--amani-cream-on-dark)]';
  }

  return (
    <section id={id} className={`py-16 md:py-24 px-5 lg:px-10 ${toneClass} ${className}`}>
      <div className="mx-auto max-w-7xl">
        {eyebrow && (
          <p className="eyebrow mb-3 font-mono text-xs uppercase tracking-widest text-[#b87d4b]">
            {eyebrow}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

interface DisplayProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Display({ children, className = '', id }: DisplayProps) {
  return (
    <h2
      id={id}
      className={`font-display text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight text-current ${className.includes('rule-brass') ? 'relative pb-3 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[2px] after:bg-[#f4c478]' : ''
        } ${className}`}
    >
      {children}
    </h2>
  );
}

interface LedeProps {
  children: ReactNode;
  className?: string;
}

export function Lede({ children, className = '' }: LedeProps) {
  return (
    <p className={`font-serif text-lg md:text-xl leading-relaxed text-[var(--amani-ink-muted)] ${className}`}>
      {children}
    </p>
  );
}

interface CtaProps {
  to?: string;
  href?: string;
  variant?: 'primary' | 'outline' | 'solid';
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Cta({ to, href, variant = 'primary', children, className = '', onClick }: CtaProps) {
  let baseStyle = 'inline-flex items-center justify-center min-h-12 px-6 py-3 rounded-sm font-sans text-xs uppercase font-bold tracking-widest transition-all duration-300 ';

  if (variant === 'outline') {
    baseStyle += 'border border-[oklch(0.97_0.014_85)] text-[oklch(0.97_0.014_85)] hover:bg-[oklch(0.97_0.014_85)] hover:text-[#1a0f0a]';
  } else if (variant === 'solid') {
    baseStyle += 'bg-[oklch(0.97_0.014_85)] text-[#1a0f0a] hover:bg-white';
  } else {
    baseStyle += 'bg-[var(--amani-maroon)] text-white hover:bg-[var(--amani-gold,#c8a762)] hover:text-[var(--amani-ink,#171411)] shadow-md';
  }

  if (to) {
    return (
      <Link to={to} className={`${baseStyle} ${className}`} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={`${baseStyle} ${className}`} onClick={onClick}>
      {children}
    </a>
  );
}

export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded bg-[var(--amani-sand)] px-2 py-0.5 text-xs font-mono text-[var(--amani-terracotta)] border border-[var(--amani-hairline)]">
      {children}
    </span>
  );
}
