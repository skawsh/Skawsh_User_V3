
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className,
  ...props
}) => {
  const isMobile = useIsMobile();
  
  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700',
    secondary: 'bg-secondary text-primary hover:bg-opacity-80 active:bg-opacity-70',
    outline: 'bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100',
    ghost: 'bg-transparent text-primary-500 hover:bg-primary-50 active:bg-primary-100'
  };

  const sizeClasses = {
    sm: isMobile ? 'text-sm py-2 px-3.5' : 'text-sm py-1.5 px-3',
    md: isMobile ? 'text-base py-2.5 px-5' : 'text-base py-2 px-4',
    lg: isMobile ? 'text-lg py-3 px-6' : 'text-lg py-2.5 px-5'
  };

  return (
    <button
      className={cn(
        'rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-2',
        'active:scale-[0.98] shadow-sm hover:shadow transform hover:translate-y-[-1px]',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        isMobile ? 'touch-manipulation' : '',
        className
      )}
      {...props}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  );
};

export default Button;
