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
      aria-label="Ilustrasi Kelinci lucu bertelinga panjang yang lincah"
    >
      <defs>
        <radialGradient id="rabBodyGrad" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#FFF7ED" />
          <stop offset="70%" stopColor="#F5E6D3" />
          <stop offset="100%" stopColor="#E2CAAF" />
        </radialGradient>
        <radialGradient id="rabEarPink" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFC2D1" />
          <stop offset="100%" stopColor="#FB6F92" />
        </radialGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="160" cy="290" rx="95" ry="14" fill="#DDE8D8" />

      {/* Fluffy Tail */}
      <circle cx="70" cy="235" r="24" fill="#FFFFFF" stroke="#E2CAAF" strokeWidth="2.5" />

      {/* Back Paw */}
      <ellipse cx="120" cy="275" rx="38" ry="18" fill="url(#rabBodyGrad)" stroke="#CBB194" strokeWidth="2.5" />
      <ellipse cx="195" cy="275" rx="38" ry="18" fill="url(#rabBodyGrad)" stroke="#CBB194" strokeWidth="2.5" />
      {/* Paw toes */}
      <line x1="105" y1="272" x2="105" y2="286" stroke="#CBB194" strokeWidth="2" strokeLinecap="round" />
      <line x1="115" y1="272" x2="115" y2="286" stroke="#CBB194" strokeWidth="2" strokeLinecap="round" />
      <line x1="200" y1="272" x2="200" y2="286" stroke="#CBB194" strokeWidth="2" strokeLinecap="round" />
      <line x1="210" y1="272" x2="210" y2="286" stroke="#CBB194" strokeWidth="2" strokeLinecap="round" />

      {/* Body */}
      <ellipse cx="150" cy="210" rx="65" ry="60" fill="url(#rabBodyGrad)" stroke="#CBB194" strokeWidth="2.5" />

      {/* Cute Front Paws */}
      <ellipse cx="138" cy="215" rx="14" ry="20" fill="#FFFFFF" stroke="#CBB194" strokeWidth="2" transform="rotate(-10 138 215)" />
      <ellipse cx="165" cy="215" rx="14" ry="20" fill="#FFFFFF" stroke="#CBB194" strokeWidth="2" transform="rotate(10 165 215)" />

      {/* Ears */}
      {/* Left Ear */}
      <g transform="rotate(-8 125 110)">
        <path
          d="M 115 110 C 95 60, 95 10, 118 8 C 140 6, 145 60, 135 110 Z"
          fill="url(#rabBodyGrad)"
          stroke="#CBB194"
          strokeWidth="2.5"
        />
        <path
          d="M 120 95 C 108 60, 108 25, 120 22 C 132 20, 134 60, 128 95 Z"
          fill="url(#rabEarPink)"
          opacity="0.85"
        />
      </g>
      {/* Right Ear */}
      <g transform="rotate(12 185 110)">
        <path
          d="M 175 110 C 165 60, 170 10, 192 12 C 215 14, 205 60, 192 110 Z"
          fill="url(#rabBodyGrad)"
          stroke="#CBB194"
          strokeWidth="2.5"
        />
        <path
          d="M 182 95 C 175 60, 178 26, 190 28 C 202 30, 196 60, 188 95 Z"
          fill="url(#rabEarPink)"
          opacity="0.85"
        />
      </g>

      {/* Head */}
      <circle cx="155" cy="135" r="48" fill="url(#rabBodyGrad)" stroke="#CBB194" strokeWidth="2.5" />

      {/* Eyes */}
      <ellipse cx="135" cy="128" rx="8" ry="11" fill="#291811" />
      <circle cx="133" cy="124" r="3.5" fill="#FFFFFF" />
      <ellipse cx="175" cy="128" rx="8" ry="11" fill="#291811" />
      <circle cx="173" cy="124" r="3.5" fill="#FFFFFF" />

      {/* Cute Cheeks */}
      <circle cx="125" cy="145" r="9" fill="#FFC2D1" opacity="0.6" />
      <circle cx="185" cy="145" r="9" fill="#FFC2D1" opacity="0.6" />

      {/* Nose and Mouth */}
      <polygon points="151,142 159,142 155,147" fill="#FB6F92" />
      <path
        d="M 155 147 L 155 152 M 155 152 Q 148 158 142 154 M 155 152 Q 162 158 168 154"
        stroke="#8C6D53"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Whiskers */}
      <path d="M 115 145 L 85 142 M 115 150 L 88 154 M 195 145 L 225 142 M 195 150 L 222 154" stroke="#CBB194" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
};
