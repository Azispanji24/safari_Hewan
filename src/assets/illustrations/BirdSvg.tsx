import React from 'react';

interface BirdSvgProps {
  className?: string;
  highlightPart?: 'wings' | 'beak' | 'all' | null;
  size?: number | string;
}

export const BirdSvg: React.FC<BirdSvgProps> = ({
  className = '',
  highlightPart = null,
  size = '100%',
}) => {
  const isWingHighlighted = highlightPart === 'wings' || highlightPart === 'all';
  const isBeakHighlighted = highlightPart === 'beak' || highlightPart === 'all';

  return (
    <svg
      viewBox="0 0 320 320"
      width={size}
      height={size}
      className={`animal-svg bird-svg ${className}`}
      role="img"
      aria-label="Ilustrasi Burung biru lucu dengan sayap terbentang siap terbang, paruh ramah, dan sepasang mata berbinar"
    >
      <defs>
        {/* Soft, vibrant storybook blue gradients */}
        <radialGradient id="birdBlueGrad" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#81D4FA" />
          <stop offset="55%" stopColor="#29B6F6" />
          <stop offset="100%" stopColor="#0288D1" />
        </radialGradient>
        <radialGradient id="birdBellyGrad" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#FFFDE7" />
          <stop offset="65%" stopColor="#FFF9C4" />
          <stop offset="100%" stopColor="#FFE082" />
        </radialGradient>
        <radialGradient id="birdBeakGrad" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFB74D" />
          <stop offset="70%" stopColor="#FF9800" />
          <stop offset="100%" stopColor="#E65100" />
        </radialGradient>
        <filter id="birdGlowEffect" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. Cloud shadow below */}
      <ellipse cx="160" cy="290" rx="85" ry="14" fill="#DCE7D6" />
      <path
        d="M 90 290 Q 95 280 100 290 M 220 290 Q 225 280 230 290"
        stroke="#7FA472"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 2. Tail feathers */}
      <g className="bird-tail">
        <path
          d="M 144 236 L 126 278 L 160 268 L 194 278 L 176 236 Z"
          fill="#0277BD"
          stroke="#014B75"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <line x1="160" y1="236" x2="160" y2="266" stroke="#014B75" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* 3 & 4. Wings (flapping upwards in flight) */}
      <g
        className={`bird-wings-group ${isWingHighlighted ? 'highlight-active' : ''}`}
        filter={isWingHighlighted ? 'url(#birdGlowEffect)' : undefined}
      >
        {/* Left Wing */}
        <g className="bird-wing-left">
          <path
            d="M 122 178 
               C 80 135, 48 116, 26 142 
               C 16 168, 58 212, 112 206 Z"
            fill="#039BE5"
            stroke={isWingHighlighted ? '#E27D18' : '#014B75'}
            strokeWidth={isWingHighlighted ? '5.5' : '3.5'}
            strokeLinejoin="round"
          />
          {/* Soft feather divide */}
          <path
            d="M 44 152 Q 74 168 102 194"
            stroke={isWingHighlighted ? '#E27D18' : '#014B75'}
            strokeWidth={isWingHighlighted ? '3.5' : '2.5'}
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 62 174 Q 86 186 104 200"
            stroke={isWingHighlighted ? '#E27D18' : '#014B75'}
            strokeWidth={isWingHighlighted ? '3.5' : '2.5'}
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Right Wing */}
        <g className="bird-wing-right">
          <path
            d="M 198 178 
               C 240 135, 272 116, 294 142 
               C 304 168, 262 212, 208 206 Z"
            fill="#039BE5"
            stroke={isWingHighlighted ? '#E27D18' : '#014B75'}
            strokeWidth={isWingHighlighted ? '5.5' : '3.5'}
            strokeLinejoin="round"
          />
          {/* Soft feather divide */}
          <path
            d="M 276 152 Q 246 168 218 194"
            stroke={isWingHighlighted ? '#E27D18' : '#014B75'}
            strokeWidth={isWingHighlighted ? '3.5' : '2.5'}
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 258 174 Q 234 186 216 200"
            stroke={isWingHighlighted ? '#E27D18' : '#014B75'}
            strokeWidth={isWingHighlighted ? '3.5' : '2.5'}
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* 5. Plump Bird Body */}
      <ellipse
        cx="160"
        cy="196"
        rx="56"
        ry="60"
        fill="url(#birdBlueGrad)"
        stroke="#014B75"
        strokeWidth="3.5"
      />

      {/* 6. Soft Warm Yellow Belly */}
      <ellipse
        cx="160"
        cy="206"
        rx="36"
        ry="42"
        fill="url(#birdBellyGrad)"
        stroke="#FBC02D"
        strokeWidth="1.5"
      />

      {/* 7. Head */}
      <circle
        cx="160"
        cy="122"
        r="44"
        fill="url(#birdBlueGrad)"
        stroke="#014B75"
        strokeWidth="3.5"
      />

      {/* 8. Head Feather Crest (Jambul Burung Lucu) */}
      <path
        d="M 154 78 Q 142 52 158 48 Q 168 62 164 78"
        fill="#0288D1"
        stroke="#014B75"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M 162 78 Q 176 58 186 60 Q 180 74 170 80"
        fill="#039BE5"
        stroke="#014B75"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* 9. Expressive Eyes (matching design system) */}
      {/* Left Eye */}
      <ellipse cx="144" cy="116" rx="8" ry="11" fill="#1C2833" />
      <circle cx="141.5" cy="112" r="3.6" fill="#FFFFFF" />
      <circle cx="146.5" cy="119" r="1.5" fill="#FFFFFF" />
      {/* Eyebrow */}
      <path d="M 136 102 Q 143 98 150 102" stroke="#014B75" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* Right Eye */}
      <ellipse cx="176" cy="116" rx="8" ry="11" fill="#1C2833" />
      <circle cx="173.5" cy="112" r="3.6" fill="#FFFFFF" />
      <circle cx="178.5" cy="119" r="1.5" fill="#FFFFFF" />
      {/* Eyebrow */}
      <path d="M 170 102 Q 177 98 184 102" stroke="#014B75" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* 10. Cheerful Rosy Cheeks */}
      <circle cx="132" cy="128" r="7" fill="#FF8A80" opacity="0.65" />
      <circle cx="188" cy="128" r="7" fill="#FF8A80" opacity="0.65" />

      {/* 11. Friendly Little Conical Beak */}
      <g
        className={`bird-beak ${isBeakHighlighted ? 'highlight-active' : ''}`}
        filter={isBeakHighlighted ? 'url(#birdGlowEffect)' : undefined}
      >
        {/* Upper mandible */}
        <path
          d="M 150 120 Q 160 114 170 120 L 160 134 Z"
          fill="url(#birdBeakGrad)"
          stroke={isBeakHighlighted ? '#E27D18' : '#C85A00'}
          strokeWidth={isBeakHighlighted ? '4.5' : '2'}
          strokeLinejoin="round"
        />
        {/* Beak smile divide */}
        <line x1="152" y1="123" x2="168" y2="123" stroke="#8A3600" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* 12. Cute 3-Toed Little Feet (Kaki Burung Ramah) */}
      <g className="bird-feet">
        {/* Left Foot */}
        <path
          d="M 148 248 L 148 266 
             M 148 266 L 140 274 
             M 148 266 L 148 275 
             M 148 266 L 156 274"
          stroke="#E65100"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right Foot */}
        <path
          d="M 172 248 L 172 266 
             M 172 266 L 164 274 
             M 172 266 L 172 275 
             M 172 266 L 180 274"
          stroke="#E65100"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
