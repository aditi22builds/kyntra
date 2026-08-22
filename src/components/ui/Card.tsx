import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  highlightBorder?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  highlightBorder = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-[#0F172A]/90 backdrop-blur-sm border rounded-2xl p-5 md:p-6 transition-all duration-200 ${
        highlightBorder ? 'border-blue-500/40 shadow-lg shadow-blue-950/30' : 'border-slate-800/80 shadow-md shadow-black/40'
      } ${hoverEffect ? 'hover:border-slate-700 hover:bg-[#131D33] hover:shadow-xl cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
