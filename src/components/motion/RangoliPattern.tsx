/**
 * RangoliPattern & RangoliDivider — Original South Indian Kolam SVG linework.
 * Crafted with fine geometric symmetry: central lotus dot matrix, looped rice-flour curves.
 */
import type { SVGProps } from 'react';

export interface RangoliPatternProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  color?: string;
  strokeWidth?: number;
}

/**
 * Original 8-fold radial Kolam motif with central star & looped interlaces.
 */
export function RangoliPattern({
  size = 120,
  className = '',
  color = 'currentColor',
  strokeWidth = 1,
  ...props
}: RangoliPatternProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Concentric subtle guide rings */}
      <circle cx="100" cy="100" r="90" stroke={color} strokeWidth={strokeWidth * 0.5} strokeDasharray="3 3" opacity="0.3" />
      <circle cx="100" cy="100" r="50" stroke={color} strokeWidth={strokeWidth * 0.5} opacity="0.4" />
      <circle cx="100" cy="100" r="10" stroke={color} strokeWidth={strokeWidth} opacity="0.6" />

      {/* Central Kolam Dot Matrix (Pulli) */}
      <circle cx="100" cy="100" r="2.5" fill={color} opacity="0.8" />
      <circle cx="100" cy="65" r="2" fill={color} opacity="0.6" />
      <circle cx="100" cy="135" r="2" fill={color} opacity="0.6" />
      <circle cx="65" cy="100" r="2" fill={color} opacity="0.6" />
      <circle cx="135" cy="100" r="2" fill={color} opacity="0.6" />

      <circle cx="75" cy="75" r="2" fill={color} opacity="0.6" />
      <circle cx="125" cy="75" r="2" fill={color} opacity="0.6" />
      <circle cx="75" cy="125" r="2" fill={color} opacity="0.6" />
      <circle cx="125" cy="125" r="2" fill={color} opacity="0.6" />

      {/* Interlacing Kolam Loops (Sikku Kolam Curves) */}
      <path
        d="M 100 20 C 130 20, 180 70, 180 100 C 180 130, 130 180, 100 180 C 70 180, 20 130, 20 100 C 20 70, 70 20, 100 20 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        opacity="0.75"
      />
      <path
        d="M 100 40 C 120 40, 160 80, 160 100 C 160 120, 120 160, 100 160 C 80 160, 40 120, 40 100 C 40 80, 80 40, 100 40 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        opacity="0.85"
      />

      {/* 4 Diagonal Petal Loops */}
      <path
        d="M 100 100 Q 135 65 100 30 Q 65 65 100 100 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        opacity="0.6"
      />
      <path
        d="M 100 100 Q 135 135 170 100 Q 135 65 100 100 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        opacity="0.6"
      />
      <path
        d="M 100 100 Q 65 135 100 170 Q 135 135 100 100 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        opacity="0.6"
      />
      <path
        d="M 100 100 Q 65 65 30 100 Q 65 135 100 100 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        opacity="0.6"
      />
    </svg>
  );
}

/**
 * Fine Kolam Horizontal Section Divider with central flourish.
 */
export function RangoliDivider({ className = '', color = 'var(--amani-hairline)' }: { className?: string; color?: string }) {
  return (
    <div className={`w-full flex items-center justify-center py-6 pointer-events-none ${className}`} aria-hidden="true">
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[var(--amani-hairline)] to-transparent" />
      <div className="px-4 text-[var(--amani-maroon)] opacity-60">
        <RangoliPattern size={28} color={color} strokeWidth={1.2} />
      </div>
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[var(--amani-hairline)] to-transparent" />
    </div>
  );
}
