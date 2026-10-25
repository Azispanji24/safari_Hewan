import React from 'react';

interface BirdSvgProps {
  className?: string;
  size?: number | string;
}

export const BirdSvg: React.FC<BirdSvgProps> = ({
  className = '',
  size = '100%',
}) => {
  return (
    <svg
      viewBox="0 0 320 320"
      width={size}
      height={size}
      className={`animal-svg bird-svg ${className}`}
      role="img"
      aria-label="Ilustrasi Burung biru lucu dengan sayap terbentang siap terbang"
    >
      <defs>
        <radialGradient id="birdBlueGrad" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#81D4FA" />
          <stop offset="65%" stopColor="#29B6F6" />
          <stop offset="100%" stopColor="#0288D1" />
        </radialGradient>
        <radialGradient id="birdBellyGrad" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#FFF9C4" />
          <stop offset="100%" stopColor="#FFF176" />
        </radialGradient>
      </defs>

      {/* Cloud shadow below */}
      <ellipse cx="160" cy="285" rx="80" ry="12" fill="#E0F2F1" />

      {/* Left Wing (flapping pose) */}
      <path
        d="M 120 180 C 80 140, 50 120, 30 145 C 20 170, 60 210, 110 205 Z"
        fill="#039BE5"
        stroke="#0277BD"
        strokeWidth="2.5"
      />
      <path d="M 45 155 Q 75 170 100 195" stroke="#0277BD" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Right Wing (flapping pose) */}
      <path
        d="M 200 180 C 240 140, 270 120, 290 145 C 300 170, 260 210, 210 205 Z"
        fill="#039BE5"
        stroke="#0277BD"
        strokeWidth="2.5"
      />
      <path d="M 275 155 Q 245 170 220 195" stroke="#0277BD" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Tail feathers */}
      <path
        d="M 145 240 L 130 280 L 160 270 L 190 280 L 175 240 Z"
        fill="#0277BD"
        stroke="#01579B"
        strokeWidth="2"
      />

      {/* Bird Body */}
      <ellipse cx="160" cy="195" rx="55" ry="58" fill="url(#birdBlueGrad)" stroke="#0277BD" strokeWidth="2.5" />

      {/* Belly */}
      <ellipse cx="160" cy="205" rx="35" ry="38" fill="url(#birdBellyGrad)" />

      {/* Head */}
      <circle cx="160" cy="120" r="42" fill="url(#birdBlueGrad)" stroke="#0277BD" strokeWidth="2.5" />

      {/* Head Feather Crest */}
      <path
        d="M 155 78 Q 145 55 160 50 Q 170 65 165 78"
        fill="#0288D1"
        stroke="#0277BD"
        strokeWidth="2"
      />
      <path
        d="M 163 78 Q 175 60 185 62 Q 180 75 170 80"
        fill="#039BE5"
        stroke="#0277BD"
        strokeWidth="2"
      />

      {/* Big Eyes */}
      <ellipse cx="145" cy="115" rx="7" ry="10" fill="#1C2833" />
      <circle cx="143" cy="112" r="3" fill="#FFFFFF" />
      <ellipse cx="175" cy="115" rx="7" ry="10" fill="#1C2833" />
      <circle cx="173" cy="112" r="3" fill="#FFFFFF" />

      {/* Cheerful Blushes */}
      <circle cx="135" cy="128" r="6" fill="#FF8A80" opacity="0.6" />
      <circle cx="185" cy="128" r="6" fill="#FF8A80" opacity="0.6" />

      {/* Little Orange Beak */}
      <polygon points="152,122 168,122 160,134" fill="#FF9800" stroke="#F57C00" strokeWidth="1.5" />

      {/* Little Feet */}
      <path d="M 148 245 L 148 260 M 143 260 L 153 260" stroke="#F57C00" strokeWidth="3" strokeLinecap="round" />
      <path d="M 172 245 L 172 260 M 167 260 L 177 260" stroke="#F57C00" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};
