import React from 'react';

interface IconProps {
  className?: string;
}

export const BridgeIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 10h16M4 14h16M6 10v4M10 10v4M14 10v4M18 10v4M4 10c0-2.21 3.582-4 8-4s8 1.79 8 4" />
  </svg>
);

export const MosqueIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3L4 9v12h16V9l-8-6z" />
    <path d="M12 3c2 2 8 3 8 6M12 3C10 5 4 6 4 9" />
    <path d="M12 12v9M8 21h8" />
    <circle cx="12" cy="7" r="1" />
  </svg>
);

export const WaterfallIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v3M12 9c0 3-4 6-4 9h8c0-3-4-6-4-9z" />
    <path d="M10 18c0 2 4 2 4 0" />
  </svg>
);

export const MonasteryIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3L4 9v12h16V9l-8-6z" />
    <path d="M8 21v-6a4 4 0 018 0v6" />
    <path d="M12 9v3" />
  </svg>
);

export const SpringIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3c-1.5 1.5-4 3-4 6 0 3 4 12 4 12s4-9 4-12c0-3-2.5-4.5-4-6z" />
    <path d="M12 9c-.5.5-2 1.5-2 3s2 6 2 6" />
  </svg>
);

export const FortressIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 21h16M6 21V11l-2-2V7l4-4 4 4v2l-2 2v10M18 21V11l2-2V7l-4-4-4 4" />
    <path d="M12 21v-6" />
  </svg>
);

export const BazaarIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 7h16M4 17h16M6 7v10M18 7v10M10 7v10M14 7v10" />
    <path d="M4 12h16" />
  </svg>
); 