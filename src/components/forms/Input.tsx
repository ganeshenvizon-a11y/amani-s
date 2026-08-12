import { type InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  tone?: 'light' | 'dark';
  className?: string;
}

export function Input({
  label,
  id,
  required = false,
  error,
  tone = 'dark',
  className = '',
  type = 'text',
  ...props
}: InputProps) {
  const labelColor = tone === 'light' ? 'text-[var(--amani-ink-soft)]' : 'text-[var(--amani-cream-on-dark)]';
  const asteriskColor = tone === 'light' ? 'text-[var(--amani-maroon)]' : 'text-[var(--amani-turmeric)]';
  const fieldClass =
    tone === 'light'
      ? 'w-full px-4 py-3 rounded-md bg-white border border-[rgba(23,20,17,0.16)] text-[var(--amani-ink)] placeholder-[var(--amani-ink-muted)] focus:outline-none focus:border-[var(--amani-maroon)] focus:ring-2 focus:ring-[var(--amani-maroon-tint)] transition-all text-sm sm:text-base'
      : 'w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(216,199,170,0.2)] text-[var(--amani-cream-on-dark)] placeholder-[rgba(244,237,223,0.4)] focus:outline-none focus:border-[var(--amani-turmeric)] focus:ring-1 focus:ring-[var(--amani-turmeric)] transition-all text-sm sm:text-base';

  return (
    <div className={`franchise-field flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className={`text-xs sm:text-sm font-semibold tracking-wider uppercase ${labelColor}`}>
        {label} {required && <span className={asteriskColor}>*</span>}
      </label>
      <input id={id} type={type} required={required} className={fieldClass} {...props} />
      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
}
