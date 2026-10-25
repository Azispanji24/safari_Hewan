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
      aria-label="Ilustrasi Gajah ramah dengan dua telinga lebar, belalai panjang yang ceria, dan sepasang mata berbinar"
    >
      <defs>
        {/* Soft, warm storybook gradients */}
        <radialGradient id="eleGradMain" cx="45%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#A3C2D4" />
          <stop offset="65%" stopColor="#7E9FB3" />
          <stop offset="100%" stopColor="#608195" />
        </radialGradient>
        <radialGradient id="eleGradFar" cx="45%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#87A6B8" />
          <stop offset="100%" stopColor="#557588" />
        </radialGradient>
        <radialGradient id="earInnerPink" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#FCD3DA" />
          <stop offset="70%" stopColor="#F9BAC6" />
          <stop offset="100%" stopColor="#EDA2B0" />
        </radialGradient>
        <radialGradient id="trunkGrad" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#A3C2D4" />
          <stop offset="60%" stopColor="#7E9FB3" />
          <stop offset="100%" stopColor="#608195" />
        </radialGradient>
        <filter id="glowEffect" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. Ground shadow / grass meadow base */}
      <ellipse cx="170" cy="296" rx="125" ry="16" fill="#DCE7D6" />
      <path
        d="M 55 296 Q 60 286 65 296 M 75 298 Q 80 288 85 298 M 255 296 Q 260 286 265 296"
        stroke="#7FA472"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 2. Tail with cute tuft (peeking from back right) */}
      <path
        d="M 265 200 C 285 215, 292 235, 282 255"
        stroke="#608195"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 280 252 C 288 256, 292 265, 282 270 C 275 268, 276 258, 280 252 Z"
        fill="#43667A"
      />

      {/* 3. Far/Right Ear (in 3/4 perspective behind head) */}
      <g
        className={`far-ear-group ${isEarHighlighted ? 'highlight-active' : ''}`}
        filter={isEarHighlighted ? 'url(#glowEffect)' : undefined}
      >
        <path
          d="M 195 90 C 235 85, 265 110, 260 148 C 255 178, 225 188, 195 165 Z"
          fill="url(#eleGradFar)"
          stroke={isEarHighlighted ? '#F4A261' : '#43667A'}
          strokeWidth={isEarHighlighted ? '5' : '3.5'}
          strokeLinejoin="round"
        />
        <path
          d="M 200 102 C 228 100, 248 118, 244 142 C 240 162, 220 170, 200 152 Z"
          fill="url(#earInnerPink)"
          opacity="0.85"
        />
      </g>

      {/* 4. Back Feet (sturdy foundation) */}
      <rect x="95" y="215" width="46" height="75" rx="18" fill="url(#eleGradFar)" stroke="#43667A" strokeWidth="3" />
      <rect x="215" y="215" width="46" height="75" rx="18" fill="url(#eleGradFar)" stroke="#43667A" strokeWidth="3" />
      {/* Back toenails */}
      <circle cx="106" cy="284" r="3.5" fill="#FFFFFF" opacity="0.85" />
      <circle cx="118" cy="284" r="3.5" fill="#FFFFFF" opacity="0.85" />
      <circle cx="130" cy="284" r="3.5" fill="#FFFFFF" opacity="0.85" />
      <circle cx="226" cy="284" r="3.5" fill="#FFFFFF" opacity="0.85" />
      <circle cx="238" cy="284" r="3.5" fill="#FFFFFF" opacity="0.85" />
      <circle cx="250" cy="284" r="3.5" fill="#FFFFFF" opacity="0.85" />

      {/* 5. Plump, friendly body */}
      <ellipse
        cx="178"
        cy="192"
        rx="86"
        ry="72"
        fill="url(#eleGradMain)"
        stroke="#43667A"
        strokeWidth="3.5"
      />

      {/* 6. Front Feet (foreground pillars) */}
      <rect x="120" y="224" width="48" height="68" rx="18" fill="url(#eleGradMain)" stroke="#43667A" strokeWidth="3.5" />
      <rect x="185" y="224" width="48" height="68" rx="18" fill="url(#eleGradMain)" stroke="#43667A" strokeWidth="3.5" />
      {/* Front toenails */}
      <circle cx="132" cy="285" r="4.2" fill="#FFFFFF" />
      <circle cx="144" cy="285" r="4.2" fill="#FFFFFF" />
      <circle cx="156" cy="285" r="4.2" fill="#FFFFFF" />
      <circle cx="197" cy="285" r="4.2" fill="#FFFFFF" />
      <circle cx="209" cy="285" r="4.2" fill="#FFFFFF" />
      <circle cx="221" cy="285" r="4.2" fill="#FFFFFF" />

      {/* 7. Near/Left Ear (prominent foreground ear) */}
      <g
        className={`ear-group near-ear-group ${isEarHighlighted ? 'highlight-active' : ''}`}
        filter={isEarHighlighted ? 'url(#glowEffect)' : undefined}
      >
        <path
          d="M 125 76 C 65 72, 38 120, 50 172 C 64 218, 114 210, 126 172 Z"
          fill="url(#eleGradMain)"
          stroke={isEarHighlighted ? '#F4A261' : '#43667A'}
          strokeWidth={isEarHighlighted ? '5' : '3.5'}
          strokeLinejoin="round"
        />
        {/* Inner ear pink */}
        <path
          d="M 118 90 C 76 90, 56 128, 66 164 C 76 194, 108 190, 118 162 Z"
          fill="url(#earInnerPink)"
          opacity="0.9"
        />
      </g>

      {/* 8. Head */}
      <circle
        cx="155"
        cy="134"
        r="58"
        fill="url(#eleGradMain)"
        stroke="#43667A"
        strokeWidth="3.5"
      />

      {/* 9. Hair tuft on head */}
      <path
        d="M 150 78 Q 152 64 156 78 M 156 77 Q 161 60 164 79"
        stroke="#43667A"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* 10. BOTH Eyes (in 3/4 perspective, warm & joyful) */}
      {/* Near Eye (Left Eye) */}
      <g className="elephant-eye-near">
        <ellipse cx="132" cy="120" rx="10" ry="12" fill="#1C3038" />
        <circle cx="129" cy="116" r="4" fill="#FFFFFF" />
        <circle cx="135" cy="123" r="1.8" fill="#FFFFFF" />
        {/* Cute eyebrow */}
        <path
          d="M 123 104 Q 131 99 139 104"
          stroke="#43667A"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Rosy blush */}
        <ellipse cx="125" cy="138" rx="9" ry="6" fill="#F8A5B2" opacity="0.65" />
      </g>

      {/* Far Eye (Right Eye, visible in 3/4 perspective) */}
      <g className="elephant-eye-far">
        <ellipse cx="178" cy="120" rx="9" ry="11" fill="#1C3038" />
        <circle cx="176" cy="116" r="3.5" fill="#FFFFFF" />
        <circle cx="180" cy="123" r="1.5" fill="#FFFFFF" />
        {/* Cute eyebrow */}
        <path
          d="M 171 104 Q 178 99 186 104"
          stroke="#43667A"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Rosy blush */}
        <ellipse cx="184" cy="138" rx="8" ry="5.5" fill="#F8A5B2" opacity="0.65" />
      </g>

      {/* 11. Cute Baby Tusks */}
      {/* Left tusk */}
      <path
        d="M 134 152 Q 130 166 122 168 Q 128 174 138 162 Z"
        fill="#FFFFFF"
        stroke="#D5D0C2"
        strokeWidth="2"
      />
      {/* Right tusk */}
      <path
        d="M 176 152 Q 180 166 188 168 Q 182 174 172 162 Z"
        fill="#FFFFFF"
        stroke="#D5D0C2"
        strokeWidth="2"
      />

      {/* 12. Friendly Mouth smile (behind trunk) */}
      <path
        d="M 148 155 Q 155 162 162 155"
        stroke="#43667A"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* 13. Long Trunk (Belalai) — smooth, elegant, joyful upward salute */}
      <g
        className={`trunk-group ${isTrunkHighlighted ? 'highlight-active' : ''}`}
        filter={isTrunkHighlighted ? 'url(#glowEffect)' : undefined}
      >
        <path
          d="M 146 142 
             C 146 170, 134 195, 120 214 
             C 106 230, 86 238, 72 226 
             C 58 214, 62 192, 80 180 
             C 92 172, 102 182, 98 190 
             C 94 198, 84 198, 82 206 
             C 80 214, 94 220, 106 210 
             C 122 195, 136 170, 138 142 Z"
          fill="url(#trunkGrad)"
          stroke={isTrunkHighlighted ? '#E76F51' : '#43667A'}
          strokeWidth={isTrunkHighlighted ? '5' : '3.5'}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Natural trunk wrinkle folds */}
        <path
          d="M 132 168 Q 140 172 145 166"
          stroke="#43667A"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 122 188 Q 130 193 136 186"
          stroke="#43667A"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 108 206 Q 116 211 120 204"
          stroke="#43667A"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Joyful Water Droplets from trunk tip */}
        <circle cx="70" cy="165" r="4" fill="#64B5F6" opacity="0.85" />
        <circle cx="82" cy="155" r="3" fill="#90CAF9" opacity="0.85" />
        <circle cx="62" cy="178" r="2.5" fill="#64B5F6" opacity="0.75" />
      </g>
    </svg>
  );
};
