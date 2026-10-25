import React from 'react';

interface ElephantSvgProps {
  className?: string;
  highlightPart?: 'trunk' | 'ears' | 'all' | null;
  size?: number | string;
}

export const ElephantSvg: React.FC<ElephantSvgProps> = ({
  className = '',
  highlightPart = null,
  size = '100%',
}) => {
  const isTrunkHighlighted = highlightPart === 'trunk' || highlightPart === 'all';
  const isEarHighlighted = highlightPart === 'ears' || highlightPart === 'all';

  return (
    <svg
      viewBox="0 0 340 320"
      width={size}
      height={size}
      className={`animal-svg elephant-svg ${className}`}
      role="img"
      aria-label="Ilustrasi Gajah ramah dengan belalai panjang dan telinga lebar"
    >
      <defs>
        <radialGradient id="eleGrad" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#96B4C5" />
          <stop offset="70%" stopColor="#7397AB" />
          <stop offset="100%" stopColor="#587A8E" />
        </radialGradient>
        <radialGradient id="earInnerGrad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#F9CAD2" />
          <stop offset="100%" stopColor="#ECA5B2" />
        </radialGradient>
        <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ground shadow / grass patch */}
      <ellipse cx="170" cy="295" rx="120" ry="16" fill="#DDE8D8" />
      <path
        d="M 60 295 Q 65 285 70 295 M 80 298 Q 85 288 90 298 M 250 295 Q 255 285 260 295"
        stroke="#82A775"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Back tail */}
      <path
        d="M 270 200 C 290 220, 295 240, 285 255"
        stroke="#7397AB"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="285" cy="257" rx="5" ry="8" fill="#587A8E" />

      {/* Back Feet */}
      <rect x="220" y="220" width="42" height="75" rx="16" fill="#5D8094" />
      <rect x="110" y="220" width="42" height="75" rx="16" fill="#5D8094" />

      {/* Body */}
      <ellipse cx="190" cy="195" rx="85" ry="70" fill="url(#eleGrad)" />

      {/* Front Feet */}
      <rect x="190" y="225" width="44" height="70" rx="16" fill="#7397AB" />
      <rect x="135" y="225" width="44" height="70" rx="16" fill="#7397AB" />
      {/* Toenails */}
      <circle cx="147" cy="288" r="4" fill="#FFFFFF" opacity="0.9" />
      <circle cx="157" cy="288" r="4" fill="#FFFFFF" opacity="0.9" />
      <circle cx="167" cy="288" r="4" fill="#FFFFFF" opacity="0.9" />
      <circle cx="202" cy="288" r="4" fill="#FFFFFF" opacity="0.9" />
      <circle cx="212" cy="288" r="4" fill="#FFFFFF" opacity="0.9" />
      <circle cx="222" cy="288" r="4" fill="#FFFFFF" opacity="0.9" />

      {/* Large Ears (with interactive highlight pulse if active) */}
      <g
        className={`ear-group ${isEarHighlighted ? 'highlight-active' : ''}`}
        filter={isEarHighlighted ? 'url(#glowEffect)' : undefined}
      >
        <path
          d="M 120 75 C 60 70, 35 125, 50 175 C 65 220, 115 210, 128 175 Z"
          fill="#7397AB"
          stroke={isEarHighlighted ? '#F4A261' : '#587A8E'}
          strokeWidth={isEarHighlighted ? '5' : '3'}
        />
        {/* Inner ear pink */}
        <path
          d="M 115 90 C 75 90, 58 130, 68 165 C 78 195, 110 190, 120 165 Z"
          fill="url(#earInnerGrad)"
          opacity="0.85"
        />
      </g>

      {/* Head */}
      <circle cx="155" cy="135" r="58" fill="url(#eleGrad)" />

      {/* Happy cute eye */}
      <circle cx="140" cy="120" r="11" fill="#1C3038" />
      <circle cx="137" cy="116" r="4" fill="#FFFFFF" />
      <circle cx="144" cy="123" r="1.5" fill="#FFFFFF" />
      {/* Cheerful blush */}
      <ellipse cx="146" cy="142" rx="9" ry="6" fill="#F8A5B2" opacity="0.6" />

      {/* Trunk (Belalai) with interactive highlight pulse */}
      <g
        className={`trunk-group ${isTrunkHighlighted ? 'highlight-active' : ''}`}
        filter={isTrunkHighlighted ? 'url(#glowEffect)' : undefined}
      >
        <path
          d="M 160 160 C 160 180, 145 205, 130 220 C 115 235, 95 240, 85 225 C 75 210, 85 190, 100 185 C 108 182, 115 190, 112 195 C 108 200, 100 200, 96 210 C 94 215, 102 222, 112 216 C 125 208, 138 185, 140 165 Z"
          fill="url(#eleGrad)"
          stroke={isTrunkHighlighted ? '#E76F51' : '#587A8E'}
          strokeWidth={isTrunkHighlighted ? '5' : '3'}
          strokeLinejoin="round"
        />
        {/* Trunk wrinkles */}
        <path d="M 142 180 Q 148 183 152 178" stroke="#587A8E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 132 198 Q 138 202 142 196" stroke="#587A8E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>

      {/* Friendly little hair tuft */}
      <path
        d="M 150 78 Q 152 65 156 78 M 156 77 Q 160 62 163 79"
        stroke="#587A8E"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};
