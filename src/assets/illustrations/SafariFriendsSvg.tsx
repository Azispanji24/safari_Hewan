import React from 'react';

interface SafariFriendsSvgProps {
  className?: string;
  size?: number | string;
}

export const SafariFriendsSvg: React.FC<SafariFriendsSvgProps> = ({
  className = '',
  size = '100%',
}) => {
  return (
    <svg
      viewBox="0 0 540 320"
      width={size}
      height={size}
      className={`safari-friends-svg ${className}`}
      role="img"
      aria-label="Empat sahabat hewan berkumpul di padang safari: Gajah, Kelinci, Bebek, dan Burung"
    >
      <defs>
        <radialGradient id="sunSoft" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF9C4" />
          <stop offset="100%" stopColor="#FFE082" />
        </radialGradient>
        <linearGradient id="hill1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C8E6C9" />
          <stop offset="100%" stopColor="#A5D6A7" />
        </linearGradient>
        <linearGradient id="hill2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#DCEDC8" />
          <stop offset="100%" stopColor="#C5E1A5" />
        </linearGradient>
      </defs>

      {/* Gentle Sun */}
      <circle cx="270" cy="90" r="50" fill="url(#sunSoft)" opacity="0.8" />

      {/* Gentle Rolling Green Hills */}
      <path d="M 0 240 Q 140 180 280 230 Q 420 280 540 230 L 540 320 L 0 320 Z" fill="url(#hill1)" />
      <path d="M 0 260 Q 200 220 380 250 Q 480 265 540 255 L 540 320 L 0 320 Z" fill="url(#hill2)" />

      {/* Little safari trees */}
      {/* Left Tree */}
      <rect x="50" y="160" width="12" height="70" rx="3" fill="#8D6E63" />
      <ellipse cx="56" cy="155" rx="36" ry="32" fill="#66BB6A" />
      <ellipse cx="56" cy="140" rx="28" ry="24" fill="#81C784" />

      {/* Right Tree */}
      <rect x="475" y="170" width="10" height="60" rx="3" fill="#8D6E63" />
      <ellipse cx="480" cy="165" rx="32" ry="28" fill="#66BB6A" />

      {/* Ground Meadow */}
      <ellipse cx="270" cy="295" rx="250" ry="25" fill="#81C784" opacity="0.4" />

      {/* 1. Baby Elephant (Center-Left) */}
      <g transform="translate(100, 110) scale(0.68)">
        {/* Feet */}
        <rect x="110" y="220" width="34" height="65" rx="14" fill="#587A8E" />
        <rect x="220" y="220" width="34" height="65" rx="14" fill="#587A8E" />
        {/* Body */}
        <ellipse cx="180" cy="195" rx="75" ry="60" fill="#7397AB" />
        <rect x="135" y="225" width="36" height="60" rx="14" fill="#85A7BA" />
        <rect x="185" y="225" width="36" height="60" rx="14" fill="#85A7BA" />
        {/* Ear */}
        <path d="M 120 85 C 70 80, 50 130, 60 170 C 75 210, 120 200, 125 170 Z" fill="#7397AB" stroke="#587A8E" strokeWidth="2.5" />
        <path d="M 115 95 C 80 95, 68 135, 78 165 C 88 190, 115 185, 120 165 Z" fill="#F8A5B2" opacity="0.8" />
        {/* Head */}
        <circle cx="150" cy="135" r="50" fill="#7397AB" />
        {/* Eye */}
        <circle cx="138" cy="125" r="9" fill="#1C3038" />
        <circle cx="135" cy="122" r="3" fill="#FFFFFF" />
        <ellipse cx="142" cy="142" rx="7" ry="5" fill="#F8A5B2" opacity="0.7" />
        {/* Trunk */}
        <path
          d="M 155 160 C 155 180, 140 200, 125 210 C 112 218, 98 220, 92 210 C 85 200, 95 185, 108 182 C 118 180, 125 195, 116 200"
          stroke="#7397AB"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* 2. Rabbit (Center-Right) */}
      <g transform="translate(260, 130) scale(0.62)">
        {/* Ears */}
        <path d="M 110 100 C 95 50, 95 10, 115 10 C 135 10, 135 50, 128 100 Z" fill="#FFF7ED" stroke="#CBB194" strokeWidth="2.5" />
        <path d="M 115 90 C 105 50, 105 25, 115 22 C 125 22, 125 50, 122 90 Z" fill="#FB6F92" opacity="0.8" />
        <path d="M 145 100 C 145 50, 155 10, 175 12 C 195 14, 185 50, 165 100 Z" fill="#FFF7ED" stroke="#CBB194" strokeWidth="2.5" />
        <path d="M 152 90 C 152 50, 160 25, 172 25 C 182 25, 175 50, 162 90 Z" fill="#FB6F92" opacity="0.8" />
        {/* Body */}
        <ellipse cx="140" cy="190" rx="55" ry="50" fill="#FFF7ED" stroke="#CBB194" strokeWidth="2.5" />
        {/* Paws */}
        <ellipse cx="110" cy="235" rx="28" ry="14" fill="#FFF7ED" stroke="#CBB194" strokeWidth="2.5" />
        <ellipse cx="170" cy="235" rx="28" ry="14" fill="#FFF7ED" stroke="#CBB194" strokeWidth="2.5" />
        {/* Head */}
        <circle cx="140" cy="130" r="40" fill="#FFF7ED" stroke="#CBB194" strokeWidth="2.5" />
        {/* Eyes */}
        <ellipse cx="125" cy="125" rx="6" ry="8" fill="#291811" />
        <circle cx="123" cy="122" r="2.5" fill="#FFFFFF" />
        <ellipse cx="155" cy="125" rx="6" ry="8" fill="#291811" />
        <circle cx="153" cy="122" r="2.5" fill="#FFFFFF" />
        {/* Cheeks & Nose */}
        <circle cx="118" cy="138" r="7" fill="#FFC2D1" opacity="0.7" />
        <circle cx="162" cy="138" r="7" fill="#FFC2D1" opacity="0.7" />
        <polygon points="137,135 143,135 140,140" fill="#FB6F92" />
      </g>

      {/* 3. Duck (Front-Right) */}
      <g transform="translate(380, 170) scale(0.55)">
        <ellipse cx="140" cy="190" rx="55" ry="42" fill="#FDD835" stroke="#E0A400" strokeWidth="2.5" />
        <circle cx="105" cy="135" r="34" fill="#FDD835" stroke="#E0A400" strokeWidth="2.5" />
        <ellipse cx="95" cy="128" rx="7" ry="9" fill="#1C2833" />
        <circle cx="93" cy="125" r="2.5" fill="#FFFFFF" />
        {/* Beak */}
        <path d="M 80 135 C 55 135, 48 145, 60 152 C 75 160, 88 152, 90 146 Z" fill="#FFB74D" stroke="#E65100" strokeWidth="2" />
        {/* Wing */}
        <path d="M 125 175 C 145 165, 175 180, 168 200 C 155 215, 125 210, 120 185 Z" fill="#FBC02D" stroke="#D48B00" strokeWidth="2" />
      </g>

      {/* 4. Little Bird perched or hovering near trees (Top-Right) */}
      <g transform="translate(350, 35) scale(0.48)">
        <ellipse cx="140" cy="130" rx="35" ry="38" fill="#29B6F6" stroke="#0277BD" strokeWidth="2" />
        <circle cx="140" cy="90" r="28" fill="#29B6F6" stroke="#0277BD" strokeWidth="2" />
        {/* Wings up */}
        <path d="M 110 120 C 80 90, 60 80, 50 100 C 45 120, 80 145, 110 140 Z" fill="#039BE5" stroke="#0277BD" strokeWidth="2" />
        <path d="M 170 120 C 200 90, 220 80, 230 100 C 235 120, 200 145, 170 140 Z" fill="#039BE5" stroke="#0277BD" strokeWidth="2" />
        <circle cx="132" cy="85" r="5" fill="#1C2833" />
        <circle cx="130" cy="83" r="2" fill="#FFFFFF" />
        <polygon points="135,92 145,92 140,100" fill="#FF9800" />
      </g>
    </svg>
  );
};
