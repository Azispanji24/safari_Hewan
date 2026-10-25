import React from 'react';

interface RabbitSvgProps {
  className?: string;
  size?: number | string;
}

export const RabbitSvg: React.FC<RabbitSvgProps> = ({
  className = '',
  size = '100%',
}) => {
  return (
    <svg
      viewBox="0 0 320 320"
      width={size}
      height={size}
      className={`animal-svg rabbit-svg ${className}`}
      role="img"
      aria-label="Ilustrasi Kelinci lucu berbulu putih krem, sepasang telinga panjang yang tegak, dan sepasang mata ramah"
    >
      <defs>
        {/* Soft, warm cream & pink gradients */}
        <radialGradient id="rabBodyGrad" cx="45%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="65%" stopColor="#FFF2E2" />
          <stop offset="100%" stopColor="#F0D9C2" />
        </radialGradient>
        <radialGradient id="rabEarPink" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD3DC" />
          <stop offset="70%" stopColor="#FFA6B9" />
          <stop offset="100%" stopColor="#F77292" />
        </radialGradient>
      </defs>

      {/* 1. Ground shadow / grass meadow base */}
      <ellipse cx="160" cy="292" rx="100" ry="14" fill="#DCE7D6" />
      <path
        d="M 65 292 Q 70 282 75 292 M 85 294 Q 90 284 95 294 M 235 292 Q 240 282 245 292"
        stroke="#7FA472"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* 2. Fluffy Tail — nestled naturally beside hip */}
      <g className="rabbit-tail">
        <path
          d="M 96 226 
             C 80 220, 68 232, 70 245 
             C 72 258, 86 264, 98 256 
             C 106 250, 104 234, 96 226 Z"
          fill="#FFFFFF"
          stroke="#7D5A40"
          strokeWidth="3"
        />
        {/* Fluffy inner tuft detail */}
        <path
          d="M 76 238 Q 84 232 90 242"
          stroke="#E2CAAF"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* 3. Back Paws (large, rounded hopping feet) */}
      <ellipse
        cx="115"
        cy="274"
        rx="38"
        ry="18"
        fill="url(#rabBodyGrad)"
        stroke="#7D5A40"
        strokeWidth="3.5"
      />
      <ellipse
        cx="195"
        cy="274"
        rx="38"
        ry="18"
        fill="url(#rabBodyGrad)"
        stroke="#7D5A40"
        strokeWidth="3.5"
      />
      {/* Back Paw toe divides */}
      <line x1="102" y1="272" x2="102" y2="284" stroke="#7D5A40" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="114" y1="272" x2="114" y2="285" stroke="#7D5A40" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="196" y1="272" x2="196" y2="285" stroke="#7D5A40" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="208" y1="272" x2="208" y2="284" stroke="#7D5A40" strokeWidth="2.5" strokeLinecap="round" />

      {/* 4. Body (plump, cuddly rabbit body) */}
      <ellipse
        cx="155"
        cy="212"
        rx="66"
        ry="60"
        fill="url(#rabBodyGrad)"
        stroke="#7D5A40"
        strokeWidth="3.5"
      />
      {/* Soft white belly patch */}
      <ellipse cx="155" cy="216" rx="42" ry="46" fill="#FFFFFF" opacity="0.9" />

      {/* 5. Cute Front Paws (tucked sweetly over chest) */}
      <ellipse
        cx="140"
        cy="216"
        rx="15"
        ry="20"
        fill="#FFFFFF"
        stroke="#7D5A40"
        strokeWidth="3"
        transform="rotate(-12 140 216)"
      />
      <ellipse
        cx="170"
        cy="216"
        rx="15"
        ry="20"
        fill="#FFFFFF"
        stroke="#7D5A40"
        strokeWidth="3"
        transform="rotate(12 170 216)"
      />
      {/* Front paw toe lines */}
      <line x1="136" y1="226" x2="134" y2="232" stroke="#7D5A40" strokeWidth="2" strokeLinecap="round" />
      <line x1="174" y1="226" x2="176" y2="232" stroke="#7D5A40" strokeWidth="2" strokeLinecap="round" />

      {/* 6. Long Expressive Ears */}
      {/* Left Ear */}
      <g transform="rotate(-8 122 110)">
        <path
          d="M 112 110 
             C 92 60, 92 10, 116 8 
             C 140 6, 144 60, 134 110 Z"
          fill="url(#rabBodyGrad)"
          stroke="#7D5A40"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M 118 96 
             C 106 60, 106 24, 118 20 
             C 130 18, 132 60, 126 96 Z"
          fill="url(#rabEarPink)"
          opacity="0.9"
        />
      </g>
      {/* Right Ear */}
      <g transform="rotate(10 188 110)">
        <path
          d="M 176 110 
             C 166 60, 170 10, 194 12 
             C 218 14, 208 60, 194 110 Z"
          fill="url(#rabBodyGrad)"
          stroke="#7D5A40"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M 184 96 
             C 176 60, 178 26, 190 28 
             C 202 30, 196 60, 188 96 Z"
          fill="url(#rabEarPink)"
          opacity="0.9"
        />
      </g>

      {/* 7. Head */}
      <circle
        cx="155"
        cy="135"
        r="50"
        fill="url(#rabBodyGrad)"
        stroke="#7D5A40"
        strokeWidth="3.5"
      />

      {/* 8. Forehead tuft */}
      <path
        d="M 152 86 Q 155 76 158 86 M 158 85 Q 162 74 165 86"
        stroke="#7D5A40"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* 9. Expressive Eyes (matching design system) */}
      {/* Left Eye */}
      <ellipse cx="134" cy="128" rx="8.5" ry="11.5" fill="#291811" />
      <circle cx="131.5" cy="124" r="3.8" fill="#FFFFFF" />
      <circle cx="137" cy="131" r="1.6" fill="#FFFFFF" />
      {/* Cute eyebrow */}
      <path d="M 127 114 Q 134 110 141 114" stroke="#7D5A40" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* Right Eye */}
      <ellipse cx="176" cy="128" rx="8.5" ry="11.5" fill="#291811" />
      <circle cx="173.5" cy="124" r="3.8" fill="#FFFFFF" />
      <circle cx="179" cy="131" r="1.6" fill="#FFFFFF" />
      {/* Cute eyebrow */}
      <path d="M 169 114 Q 176 110 183 114" stroke="#7D5A40" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* 10. Cheerful Rosy Cheeks */}
      <circle cx="122" cy="144" r="9.5" fill="#FFB4C4" opacity="0.65" />
      <circle cx="188" cy="144" r="9.5" fill="#FFB4C4" opacity="0.65" />

      {/* 11. Heart-shaped Pink Nose & Cheerful Mouth */}
      <path
        d="M 151 140 C 151 138, 153 136, 155 138 C 157 136, 159 138, 159 140 C 159 143, 155 146, 155 146 C 155 146, 151 143, 151 140 Z"
        fill="#FB6F92"
      />
      <path
        d="M 155 146 L 155 151 
           M 155 151 Q 148 157 142 153 
           M 155 151 Q 162 157 168 153"
        stroke="#7D5A40"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* 12. Gentle Curved Whiskers */}
      <path
        d="M 115 144 Q 95 140 82 143 
           M 115 150 Q 95 152 84 157 
           M 195 144 Q 215 140 228 143 
           M 195 150 Q 215 152 226 157"
        stroke="#A88B74"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};
