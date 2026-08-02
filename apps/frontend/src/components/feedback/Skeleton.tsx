import React from 'react';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'circle';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text'
}) => {
  const baseStyles = 'animate-pulse bg-slate-800/60 rounded-xl';
  
  const variantStyles = {
    text: 'h-4 w-full',
    card: 'h-32 w-full',
    circle: 'h-10 w-10 rounded-full'
  };

  return <div className={`${baseStyles} ${variantStyles[variant]} ${className}`} />;
};
