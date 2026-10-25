import React from 'react';

interface DuckSvgProps {
  className?: string;
  size?: number | string;
}

export const DuckSvg: React.FC<DuckSvgProps> = ({
  className = '',
  size = '100%',
}) => {
  return (
    <svg
      viewBox="0 0 320 320"
      width={size}
      height={size}
      className={`animal-svg duck-svg ${className}`}
      role="img"
      aria-label="Ilustrasi Bebek kuning berparuh pipih yang suka berenang"
    >
      <defs>
        <radialGradient id="duckYellowGrad" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFF176" />
          <stop offset="65%" stopColor="#FDD835" />
          <stop offset="100%" stopColor="#FBC02D" />
        </radialGradient>
        <radialGradient id="duckOrangeGrad" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFB74D" />
          <stop offset="100%" stopColor="#F57C00" />
        </radialGradient>
      </defs>

      {/* Water ripple / pond shadow */}
      <ellipse cx="160" cy="275" rx="105" ry="18" fill="#E1F5FE" stroke="#81D4FA" strokeWidth="2.5" />
      <ellipse cx="160" cy="285" rx="75" ry="12" fill="#B3E5FC" opacity="0.6" />

      {/* Tail feathers */}
      <path
        d="M 220 185 Q 265 165 255 195 Q 240 215 210 215 Z"
        fill="url(#duckYellowGrad)"
        stroke="#E0A400"
        strokeWidth="2.5"
      />

      {/* Duck Body */}
      <ellipse cx="165" cy="205" rx="70" ry="52" fill="url(#duckYellowGrad)" stroke="#E0A400" strokeWidth="2.5" />

      {/* Wing */}
      <path
        d="M 140 185 C 170 175, 205 190, 200 220 C 185 240, 145 235, 135 205 Z"
        fill="#FBC02D"
        stroke="#D48B00"
        strokeWidth="2.5"
      />
      {/* Wing feather lines */}
      <path d="M 155 200 Q 175 205 185 220" stroke="#D48B00" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 148 210 Q 165 215 172 225" stroke="#D48B00" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Duck Neck and Head */}
      <circle cx="115" cy="130" r="42" fill="url(#duckYellowGrad)" stroke="#E0A400" strokeWidth="2.5" />

      {/* Big Duck Eye */}
      <ellipse cx="102" cy="120" rx="9" ry="12" fill="#1C2833" />
      <circle cx="99" cy="116" r="3.5" fill="#FFFFFF" />
      <circle cx="105" cy="122" r="1.5" fill="#FFFFFF" />

      {/* Blush */}
      <circle cx="115" cy="142" r="8" fill="#FF8A65" opacity="0.5" />

      {/* Duck Flat Beak (Paruh Pipih) */}
      <path
        d="M 85 130 C 50 130, 42 142, 55 152 C 72 162, 88 152, 92 146 Z"
        fill="url(#duckOrangeGrad)"
        stroke="#E65100"
        strokeWidth="2.5"
      />
      {/* Nostril */}
      <circle cx="78" cy="138" r="2" fill="#BF360C" />

      {/* Head feather tuft */}
      <path
        d="M 112 88 Q 110 75 116 72 Q 120 78 122 88"
        fill="url(#duckYellowGrad)"
        stroke="#E0A400"
        strokeWidth="2"
      />
    </svg>
  );
};
