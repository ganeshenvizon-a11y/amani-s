import { type SelectHTMLAttributes } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: (SelectOption | string)[];
  required?: boolean;
  error?: string;
  placeholder?: string;
  tone?: 'light' | 'dark';
  className?: string;
}

export function Select({
  label,
  id,
  options,
  required = false,
  error,
  placeholder = 'Select an option',
  tone = 'dark',
  className = '',
  value,
  ...props
}: SelectProps) {
  const isLight = tone === 'light';
  const labelColor = isLight ? 'text-[var(--amani-ink-soft)]' : 'text-[var(--amani-cream-on-dark)]';
  const asteriskColor = isLight ? 'text-[var(--amani-maroon)]' : 'text-[var(--amani-turmeric)]';
  const fieldClass = isLight
    ? 'w-full px-4 py-3 rounded-md bg-white border border-[rgba(23,20,17,0.16)] text-[var(--amani-ink)] focus:outline-none focus:border-[var(--amani-maroon)] focus:ring-2 focus:ring-[var(--amani-maroon-tint)] transition-all text-sm sm:text-base appearance-none pr-10 cursor-pointer'
    : 'w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(216,199,170,0.2)] text-[var(--amani-cream-on-dark)] focus:outline-none focus:border-[var(--amani-turmeric)] focus:ring-1 focus:ring-[var(--amani-turmeric)] transition-all text-sm sm:text-base appearance-none pr-10 cursor-pointer';
  const optionClass = isLight ? 'bg-white text-[var(--amani-ink)]' : 'bg-[#2E130B] text-[var(--amani-cream-on-dark)]';
  const placeholderClass = isLight ? 'bg-white text-[var(--amani-ink-muted)]' : 'bg-[#2E130B] text-[rgba(244,237,223,0.5)]';
  const chevronColor = isLight ? 'text-[var(--amani-maroon)]' : 'text-[var(--amani-turmeric)]';

  return (
    <div className={`franchise-field flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className={`text-xs sm:text-sm font-semibold tracking-wider uppercase ${labelColor}`}>
        {label} {required && <span className={asteriskColor}>*</span>}
      </label>
      <div className="relative">
        <select id={id} required={required} value={value} className={fieldClass} {...props}>
          {placeholder && (
            <option value="" disabled className={placeholderClass}>
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const val = typeof opt === 'string' ? opt : opt.value;
            const lbl = typeof opt === 'string' ? opt : opt.label;
            return (
              <option key={val} value={val} className={optionClass}>
                {lbl}
              </option>
            );
          })}
        </select>
        <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 ${chevronColor}`}>
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
}
