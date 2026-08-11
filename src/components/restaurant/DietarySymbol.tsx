import type { Dietary } from '../../content/menu';

export interface DietarySymbolProps {
  dietary: Dietary | string;
  size?: number;
  showLabel?: boolean;
  className?: string;
}

export function DietarySymbol({
  dietary,
  size = 15,
  showLabel = true,
  className = '',
}: DietarySymbolProps) {
  const isVeg = dietary === 'veg';
  const isEgg = dietary === 'egg';
  const isNonVeg = dietary === 'non_veg';

  // Standard official Indian dietary symbol colors (FSSAI)
  const color = isVeg
    ? '#0F8A48' // Official Green
    : isNonVeg
    ? '#B91C1C' // Official Red
    : isEgg
    ? '#B45309' // Official Amber / Egg
    : '#6B7280'; // Neutral fallback

  const labelText = isVeg
    ? 'Vegetarian'
    : isNonVeg
    ? 'Non-vegetarian'
    : isEgg
    ? 'Contains egg'
    : 'Dietary info';

  const badgeClass = isVeg
    ? 'menu-diet--veg'
    : isNonVeg
    ? 'menu-diet--non_veg'
    : isEgg
    ? 'menu-diet--egg'
    : '';

  return (
    <span className={`menu-diet ${badgeClass} ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="dietary-symbol-icon"
        aria-hidden="true"
      >
        {/* Outer Square Box */}
        <rect
          x="1.25"
          y="1.25"
          width="13.5"
          height="13.5"
          rx="1.75"
          stroke={color}
          strokeWidth="1.75"
        />
        {/* Solid Circle Dot in Center */}
        <circle cx="8" cy="8" r="3.75" fill={color} />
      </svg>
      {showLabel && <span className="dietary-label">{labelText}</span>}
    </span>
  );
}
