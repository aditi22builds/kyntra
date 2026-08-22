import React from 'react';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'prototype';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  icon,
  className = '',
  size = 'md',
}) => {
  const sizeStyles = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs font-semibold';

  const variantStyles = {
    default: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
    success: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    danger: 'bg-red-500/15 text-red-300 border border-red-500/30',
    info: 'bg-sky-500/15 text-sky-300 border border-sky-500/30',
    neutral: 'bg-slate-800 text-slate-300 border border-slate-700',
    prototype: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 tracking-wider uppercase text-[10px] font-bold',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeStyles} ${variantStyles} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
