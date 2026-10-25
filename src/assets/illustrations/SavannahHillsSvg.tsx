import React from 'react';

interface SavannahHillsSvgProps {
  className?: string;
  variant?: 'meadow' | 'sunset' | 'water';
}

export const SavannahHillsSvg: React.FC<SavannahHillsSvgProps> = ({
  className = '',
  variant = 'meadow',
}) => {
  return (
    <svg
      viewBox="0 0 1200 180"
      preserveAspectRatio="none"
      className={`savannah-hills-svg ${className} variant-${variant}`}
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id="hillBack" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={variant === 'sunset' ? '#F7D08A' : '#C2E59C'} />
          <stop offset="100%" stopColor={variant === 'sunset' ? '#EAA35B' : '#9DC870'} />
        </linearGradient>
        <linearGradient id="hillMid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={variant === 'sunset' ? '#E39158' : '#8EBF65'} />
          <stop offset="100%" stopColor={variant === 'sunset' ? '#B86D43' : '#699942'} />
        </linearGradient>
        <linearGradient id="hillFront" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={variant === 'sunset' ? '#C27346' : '#5C8C35'} />
          <stop offset="100%" stopColor={variant === 'sunset' ? '#8F4E2E' : '#456D24'} />
        </linearGradient>
      </defs>

      {/* Back gentle hill */}
      <path
        d="M 0 95 Q 320 40 680 80 Q 980 115 1200 65 L 1200 180 L 0 180 Z"
        fill="url(#hillBack)"
        opacity="0.7"
      />

      {/* Mid hill */}
      <path
        d="M 0 120 Q 220 70 540 100 Q 880 130 1200 90 L 1200 180 L 0 180 Z"
        fill="url(#hillMid)"
      />

      {/* Front grassy bank */}
      <path
        d="M 0 145 Q 380 110 780 135 Q 1020 150 1200 130 L 1200 180 L 0 180 Z"
        fill="url(#hillFront)"
      />

      {/* Grass tufts on foreground */}
      <path
        d="M 120 145 Q 125 130 130 145 M 130 145 Q 137 128 142 145 M 142 145 Q 146 133 150 145
           M 460 135 Q 465 120 470 135 M 470 135 Q 477 118 482 135
           M 860 140 Q 865 125 870 140 M 870 140 Q 877 122 882 140 M 882 140 Q 887 128 892 140"
        stroke="#78AB46"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
