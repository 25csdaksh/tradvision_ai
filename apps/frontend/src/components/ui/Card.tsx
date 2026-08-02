import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-dark-card border border-dark-border rounded-xl p-5 shadow-lg hover:border-slate-700/80 transition-all ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
