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
  className?: string;
}

export function Select({
  label,
  id,
  options,
  required = false,
  error,
  placeholder = 'Select an option',
  className = '',
  value,
  ...props
}: SelectProps) {
  return (
    <div className={`franchise-field flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-xs sm:text-sm font-semibold tracking-wider text-[var(--amani-cream-on-dark)] uppercase">
        {label} {required && <span className="text-[var(--amani-turmeric)]">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          required={required}
          value={value}
          className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(216,199,170,0.2)] text-[var(--amani-cream-on-dark)] focus:outline-none focus:border-[var(--amani-turmeric)] focus:ring-1 focus:ring-[var(--amani-turmeric)] transition-all font-sans text-sm sm:text-base appearance-none pr-10 cursor-pointer"
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="bg-[#2E130B] text-[rgba(244,237,223,0.5)]">
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const val = typeof opt === 'string' ? opt : opt.value;
            const lbl = typeof opt === 'string' ? opt : opt.label;
            return (
              <option key={val} value={val} className="bg-[#2E130B] text-[var(--amani-cream-on-dark)]">
                {lbl}
              </option>
            );
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[var(--amani-turmeric)]">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
      {error && <span className="text-xs text-red-400 mt-0.5">{error}</span>}
    </div>
  );
}
