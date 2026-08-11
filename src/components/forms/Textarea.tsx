import { type TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export function Textarea({
  label,
  id,
  required = false,
  error,
  className = '',
  rows = 4,
  ...props
}: TextareaProps) {
  return (
    <div className={`franchise-field flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-xs sm:text-sm font-semibold tracking-wider text-[var(--amani-cream-on-dark)] uppercase">
        {label} {required && <span className="text-[var(--amani-turmeric)]">*</span>}
      </label>
      <textarea
        id={id}
        rows={rows}
        required={required}
        className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(216,199,170,0.2)] text-[var(--amani-cream-on-dark)] placeholder-[rgba(244,237,223,0.4)] focus:outline-none focus:border-[var(--amani-turmeric)] focus:ring-1 focus:ring-[var(--amani-turmeric)] transition-all font-sans text-sm sm:text-base resize-y"
        {...props}
      />
      {error && <span className="text-xs text-red-400 mt-0.5">{error}</span>}
    </div>
  );
}
