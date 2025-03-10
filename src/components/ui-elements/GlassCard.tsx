
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  elevated?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className,
  interactive = true,
  elevated = false,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        "glass rounded-2xl p-4", 
        interactive && "glass-hover active:shadow-glass-pressed active:scale-[0.98] cursor-pointer",
        elevated && "shadow-glass-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
