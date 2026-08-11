import { type ReactNode, type ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
  asAnchor?: boolean;
  href?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  asAnchor = false,
  href,
  type = 'button',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none cursor-pointer';

  const variantStyles = {
    primary: 'bg-[var(--amani-maroon)] hover:bg-[var(--amani-maroon-dark)] text-[#F8F2E5] shadow-md hover:shadow-lg',
    secondary: 'bg-[var(--amani-sand)] text-[var(--amani-ink)] hover:bg-[#c9b493]',
    outline: 'border border-[var(--amani-turmeric)] text-[var(--amani-cream-on-dark)] hover:bg-[var(--amani-turmeric)] hover:text-[var(--amani-ink)]',
    gold: 'bg-[var(--amani-turmeric)] text-[var(--amani-ink)] hover:bg-[#b08226] font-semibold',
  };

  const sizeStyles = {
    sm: 'px-5 py-2 text-xs tracking-wider uppercase',
    md: 'px-7 py-3.5 text-sm tracking-widest uppercase',
    lg: 'px-9 py-4 text-base tracking-widest uppercase',
  };

  const combinedClasses = `amani-button amani-button--${variant} ${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

  if (asAnchor && href) {
    return (
      <a href={href} className={combinedClasses}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={combinedClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
