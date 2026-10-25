import React from 'react';

interface SafariGateSvgProps {
  className?: string;
  size?: number | string;
}

export const SafariGateSvg: React.FC<SafariGateSvgProps> = ({
  className = '',
  size = '100%',
}) => {
  return (
    <svg
      viewBox="0 0 420 300"
      width={size}
      height={size}
      className={`safari-gate-svg ${className}`}
      role="img"
      aria-label="Gerbang Safari Hewan yang ramah dengan dedaunan hijau dan matahari bersinar"
    >
      <defs>
        <linearGradient id="woodPost" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8D5B4C" />
          <stop offset="50%" stopColor="#A06958" />
          <stop offset="100%" stopColor="#794C3F" />
        </linearGradient>
        <linearGradient id="woodSign" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E29578" />
          <stop offset="100%" stopColor="#D47A5B" />
        </linearGradient>
      </defs>

      {/* Warm gentle sun in the background */}
      <circle cx="210" cy="85" r="45" fill="#FFE082" opacity="0.65" />
      <circle cx="210" cy="85" r="32" fill="#FFD54F" />

      {/* Fluffy clouds */}
      <path
        d="M 50 70 Q 60 50 80 55 Q 95 45 110 60 Q 120 70 110 80 L 50 80 Z"
        fill="#FFFFFF"
        opacity="0.8"
      />
      <path
        d="M 300 65 Q 315 45 335 50 Q 350 40 365 55 Q 375 65 365 75 L 300 75 Z"
        fill="#FFFFFF"
        opacity="0.8"
      />

      {/* Safari Arch Wooden Posts */}
      {/* Left Post */}
      <rect x="55" y="60" width="30" height="230" rx="6" fill="url(#woodPost)" />
      {/* Right Post */}
      <rect x="335" y="60" width="30" height="230" rx="6" fill="url(#woodPost)" />

      {/* Top Beam */}
      <rect x="40" y="50" width="340" height="28" rx="6" fill="url(#woodPost)" />

      {/* Hanging Sign "SAFARI HEWAN" */}
      {/* Ropes */}
      <line x1="120" y1="78" x2="120" y2="105" stroke="#794C3F" strokeWidth="3" />
      <line x1="300" y1="78" x2="300" y2="105" stroke="#794C3F" strokeWidth="3" />

      {/* Wooden Sign Board */}
      <rect x="95" y="100" width="230" height="60" rx="14" fill="url(#woodSign)" stroke="#8D5B4C" strokeWidth="3" />
      <text
        x="210"
        y="138"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontWeight="800"
        fontSize="22"
        fill="#FFFFFF"
        letterSpacing="2"
      >
        SAFARI HEWAN
      </text>

      {/* Tropical Green Leaves on Posts */}
      {/* Left foliage */}
      <path d="M 35 60 C 20 40, 50 20, 65 40 Z" fill="#4CAF50" />
      <path d="M 45 75 C 20 70, 30 100, 60 85 Z" fill="#81C784" />
      <path d="M 50 110 C 25 105, 30 135, 60 120 Z" fill="#388E3C" />

      {/* Right foliage */}
      <path d="M 385 60 C 400 40, 370 20, 355 40 Z" fill="#4CAF50" />
      <path d="M 375 75 C 400 70, 390 100, 360 85 Z" fill="#81C784" />
      <path d="M 370 110 C 395 105, 390 135, 360 120 Z" fill="#388E3C" />

      {/* Hanging Vine with Flowers */}
      <path
        d="M 60 65 Q 120 90 170 75 Q 240 60 300 80 Q 340 70 360 65"
        stroke="#43A047"
        strokeWidth="4"
        fill="none"
      />
      {/* Little yellow blossoms */}
      <circle cx="115" cy="82" r="5" fill="#FFF176" />
      <circle cx="210" cy="74" r="5" fill="#FFF176" />
      <circle cx="280" cy="80" r="5" fill="#FFF176" />

      {/* Ground Safari Path */}
      <ellipse cx="210" cy="275" rx="160" ry="22" fill="#E8D5B5" />
      <path
        d="M 120 290 Q 210 260 300 290"
        stroke="#D4BA91"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />

      {/* Friendly little footprints */}
      <ellipse cx="180" cy="270" rx="4" ry="3" fill="#BFA075" />
      <ellipse cx="230" cy="275" rx="4" ry="3" fill="#BFA075" />
    </svg>
  );
};
