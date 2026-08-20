export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  label: string;
  name: string;
  options: (RadioOption | string)[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  tone?: 'light' | 'dark';
  className?: string;
}

export function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  required = false,
  tone = 'dark',
  className = '',
}: RadioGroupProps) {
  const isLight = tone === 'light';
  const legendColor = isLight ? 'text-[var(--amani-ink-soft)]' : 'text-[var(--amani-cream-on-dark)]';
  const asteriskColor = isLight ? 'text-[var(--amani-maroon)]' : 'text-[var(--amani-turmeric)]';

  const selectedClass = isLight
    ? 'bg-[var(--amani-maroon-tint)] border-[var(--amani-maroon)] text-[var(--amani-ink)]'
    : 'bg-[rgba(201,151,50,0.15)] border-[var(--amani-turmeric)] text-[var(--amani-cream-on-dark)]';
  const unselectedClass = isLight
    ? 'bg-white border-[rgba(23,20,17,0.16)] text-[var(--amani-ink-soft)] hover:border-[var(--amani-maroon)]'
    : 'bg-[rgba(255,255,255,0.04)] border-[rgba(216,199,170,0.2)] text-[var(--amani-cream-muted)] hover:border-[rgba(216,199,170,0.4)]';

  const dotSelectedRing = isLight ? 'border-[var(--amani-maroon)] bg-[var(--amani-maroon)]' : 'border-[var(--amani-turmeric)] bg-[var(--amani-turmeric)]';
  const dotUnselectedRing = isLight ? 'border-[rgba(23,20,17,0.3)]' : 'border-[rgba(216,199,170,0.4)]';
  const dotInner = isLight ? 'bg-white' : 'bg-[#742F1C]';

  return (
    <fieldset className={`franchise-field flex flex-col gap-2 ${className}`}>
      <legend className={`text-xs sm:text-sm font-semibold tracking-wider uppercase mb-1 ${legendColor}`}>
        {label} {required && <span className={asteriskColor}>*</span>}
      </legend>
      <div className="flex flex-wrap items-center gap-6">
        {options.map((opt) => {
          const val = typeof opt === 'string' ? opt : opt.value;
          const lbl = typeof opt === 'string' ? opt : opt.label;
          const isSelected = value === val;

          return (
            <label
              key={val}
              className={`inline-flex items-center gap-3 px-5 py-3 rounded-md border transition-all cursor-pointer select-none text-sm font-medium ${isSelected ? selectedClass : unselectedClass
                }`}
            >
              <input
                type="radio"
                name={name}
                value={val}
                checked={isSelected}
                onChange={() => onChange(val)}
                required={required}
                className="sr-only"
              />
              <span
                className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${isSelected ? dotSelectedRing : dotUnselectedRing
                  }`}
              >
                {isSelected && <span className={`w-1.5 h-1.5 rounded-full ${dotInner}`} />}
              </span>
              <span>{lbl}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
