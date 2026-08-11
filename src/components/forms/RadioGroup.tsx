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
  className?: string;
}

export function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  required = false,
  className = '',
}: RadioGroupProps) {
  return (
    <fieldset className={`franchise-field flex flex-col gap-2 ${className}`}>
      <legend className="text-xs sm:text-sm font-semibold tracking-wider text-[var(--amani-cream-on-dark)] uppercase mb-1">
        {label} {required && <span className="text-[var(--amani-turmeric)]">*</span>}
      </legend>
      <div className="flex flex-wrap items-center gap-6">
        {options.map((opt) => {
          const val = typeof opt === 'string' ? opt : opt.value;
          const lbl = typeof opt === 'string' ? opt : opt.label;
          const isSelected = value === val;

          return (
            <label
              key={val}
              className={`inline-flex items-center gap-3 px-5 py-3 rounded-lg border transition-all cursor-pointer select-none text-sm font-medium ${
                isSelected
                  ? 'bg-[rgba(201,151,50,0.15)] border-[var(--amani-turmeric)] text-[var(--amani-cream-on-dark)]'
                  : 'bg-[rgba(255,255,255,0.04)] border-[rgba(216,199,170,0.2)] text-[var(--amani-cream-muted)] hover:border-[rgba(216,199,170,0.4)]'
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
                className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                  isSelected ? 'border-[var(--amani-turmeric)] bg-[var(--amani-turmeric)]' : 'border-[rgba(216,199,170,0.4)]'
                }`}
              >
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#2E130B]" />}
              </span>
              <span>{lbl}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
