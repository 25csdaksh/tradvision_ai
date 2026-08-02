import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'bullish' | 'bearish' | 'neutral' | 'ai' | 'brand';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md'
}) => {
  const sizeStyles = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';
  
  const variantStyles = {
    bullish: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    bearish: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    neutral: 'bg-slate-500/10 text-slate-400 border border-slate-500/20',
    ai: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    brand: 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${sizeStyles} ${variantStyles[variant]}`}>
      {children}
    </span>
  );
};
