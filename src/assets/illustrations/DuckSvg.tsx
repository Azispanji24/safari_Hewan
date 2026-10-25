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
      aria-label="Ilustrasi Bebek kuning berparuh pipih yang ceria dengan sayap berbulu lembut dan kaki berselaput"
    >
      <defs>
        {/* Warm, sunny storybook gradients */}
        <radialGradient id="duckBodyGrad" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFF9C4" />
          <stop offset="55%" stopColor="#FDD835" />
          <stop offset="100%" stopColor="#F9A825" />
        </radialGradient>
        <radialGradient id="duckWingGrad" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFE082" />
          <stop offset="60%" stopColor="#FBC02D" />
          <stop offset="100%" stopColor="#F57F17" />
        </radialGradient>
        <radialGradient id="duckBeakGrad" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFB74D" />
          <stop offset="70%" stopColor="#FB8C00" />
          <stop offset="100%" stopColor="#E65100" />
        </radialGradient>
        <radialGradient id="waterRippleGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E1F5FE" />
          <stop offset="70%" stopColor="#B3E5FC" />
          <stop offset="100%" stopColor="#81D4FA" />
        </radialGradient>
      </defs>

      {/* 1. Water pond / meadow ripple base */}
      <ellipse
        cx="160"
        cy="282"
        rx="110"
        ry="18"
        fill="url(#waterRippleGrad)"
        stroke="#4FC3F7"
        strokeWidth="2.5"
      />
      <ellipse cx="160" cy="290" rx="78" ry="10" fill="#81D4FA" opacity="0.6" />
      {/* Little water splashes */}
      <circle cx="65" cy="280" r="3.5" fill="#4FC3F7" opacity="0.8" />
      <circle cx="255" cy="282" r="3" fill="#4FC3F7" opacity="0.8" />
      <circle cx="270" cy="276" r="2" fill="#81D4FA" opacity="0.8" />

      {/* 2. Cute Orange Webbed Feet (Kaki Berselaput Bebek) */}
      <g className="duck-feet">
        {/* Left/Far foot */}
        <path
          d="M 148 245 L 144 265 L 132 274 L 144 272 L 154 274 L 152 265 Z"
          fill="url(#duckBeakGrad)"
          stroke="#C85A00"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Right/Near foot */}
        <path
          d="M 172 248 L 170 268 L 158 277 L 170 275 L 182 277 L 178 268 Z"
          fill="url(#duckBeakGrad)"
          stroke="#C85A00"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </g>

      {/* 3. Up-turned Tail feathers */}
      <path
        d="M 215 186 
           C 245 168, 268 160, 262 188 
           C 258 206, 235 220, 205 218 Z"
        fill="url(#duckBodyGrad)"
        stroke="#B26A00"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* 4. Duck Body with integrated neck connection */}
      {/* Main plump body */}
      <ellipse
        cx="168"
        cy="208"
        rx="72"
        ry="54"
        fill="url(#duckBodyGrad)"
        stroke="#B26A00"
        strokeWidth="3.5"
      />

      {/* Graceful Neck contour blending head and body */}
      <path
        d="M 120 155 
           C 125 178, 140 195, 160 200 
           C 135 198, 102 180, 98 152 Z"
        fill="url(#duckBodyGrad)"
      />

      {/* 5. Layered Wing (Sayap Indah) */}
      <g className="duck-wing">
        <path
          d="M 136 182 
             C 172 170, 212 186, 206 218 
             C 192 242, 148 238, 132 206 Z"
          fill="url(#duckWingGrad)"
          stroke="#B26A00"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Soft wing feather lines */}
        <path
          d="M 152 198 Q 174 204 186 218"
          stroke="#B26A00"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 144 210 Q 164 216 172 227"
          stroke="#B26A00"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* 6. Head */}
      <circle
        cx="114"
        cy="132"
        r="44"
        fill="url(#duckBodyGrad)"
        stroke="#B26A00"
        strokeWidth="3.5"
      />

      {/* 7. Cute Crest feather on head */}
      <path
        d="M 112 88 Q 110 74 118 70 Q 124 76 122 88"
        fill="url(#duckBodyGrad)"
        stroke="#B26A00"
        strokeWidth="2.5"
      />
      <path
        d="M 120 88 Q 126 76 132 78 Q 130 86 126 90"
        fill="url(#duckBodyGrad)"
        stroke="#B26A00"
        strokeWidth="2"
      />

      {/* 8. Expressive Duck Eye */}
      <ellipse cx="102" cy="120" rx="9" ry="12" fill="#1C2833" />
      <circle cx="99" cy="116" r="4" fill="#FFFFFF" />
      <circle cx="105" cy="123" r="1.8" fill="#FFFFFF" />
      {/* Cute eyebrow */}
      <path
        d="M 94 105 Q 102 100 110 105"
        stroke="#B26A00"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* 9. Soft Peach Blush Cheek */}
      <circle cx="118" cy="142" r="9" fill="#FF8A65" opacity="0.6" />

      {/* 10. Classic Flat Duck Beak (Paruh Pipih Bebek) */}
      <g className="duck-beak">
        {/* Upper & lower bill with friendly curve */}
        <path
          d="M 84 128 
             C 48 126, 36 140, 52 152 
             C 72 164, 88 154, 94 146 Z"
          fill="url(#duckBeakGrad)"
          stroke="#C85A00"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Friendly smile divide */}
        <path
          d="M 52 144 Q 72 148 90 142"
          stroke="#C85A00"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Cute nostril */}
        <circle cx="76" cy="136" r="2.2" fill="#8A3600" />
      </g>
    </svg>
  );
};
