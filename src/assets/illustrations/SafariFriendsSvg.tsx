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
      aria-label="Empat sahabat hewan berkumpul di padang safari: Gajah dengan dua telinga lebar, Kelinci ceria, Bebek berparuh pipih, dan Burung bernyanyi"
    >
      <defs>
        <radialGradient id="sunSoftHero" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF9C4" />
          <stop offset="100%" stopColor="#FFE082" />
        </radialGradient>
        <linearGradient id="hillHero1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C8E6C9" />
          <stop offset="100%" stopColor="#A5D6A7" />
        </linearGradient>
        <linearGradient id="hillHero2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#DCEDC8" />
          <stop offset="100%" stopColor="#C5E1A5" />
        </linearGradient>
      </defs>

      {/* 1. Gentle Sun in the background */}
      <circle cx="270" cy="85" r="48" fill="url(#sunSoftHero)" opacity="0.85" />

      {/* 2. Gentle Rolling Green Hills */}
      <path d="M 0 235 Q 140 175 280 225 Q 420 275 540 225 L 540 320 L 0 320 Z" fill="url(#hillHero1)" />
      <path d="M 0 255 Q 200 215 380 245 Q 480 260 540 250 L 540 320 L 0 320 Z" fill="url(#hillHero2)" />

      {/* 3. Little Safari Trees in background */}
      {/* Left Tree */}
      <rect x="45" y="155" width="12" height="75" rx="3" fill="#8D6E63" />
      <ellipse cx="51" cy="150" rx="36" ry="32" fill="#66BB6A" />
      <ellipse cx="51" cy="135" rx="28" ry="24" fill="#81C784" />

      {/* Right Tree */}
      <rect x="480" y="165" width="10" height="65" rx="3" fill="#8D6E63" />
      <ellipse cx="485" cy="160" rx="32" ry="28" fill="#66BB6A" />
      <ellipse cx="485" cy="148" rx="24" ry="20" fill="#81C784" />

      {/* 4. Ground Meadow base */}
      <ellipse cx="270" cy="295" rx="250" ry="25" fill="#81C784" opacity="0.4" />

      {/* -------------------------------------------------------------
          1. BABY ELEPHANT (Center-Left) — Anatomically Complete!
          ------------------------------------------------------------- */}
      <g transform="translate(85, 95) scale(0.68)">
        {/* Tail */}
        <path d="M 260 195 C 280 210, 288 230, 278 248" stroke="#557588" strokeWidth="5" fill="none" strokeLinecap="round" />
        <ellipse cx="278" cy="250" rx="4" ry="6" fill="#43667A" />

        {/* Far/Right Ear (in 3/4 view) */}
        <path d="M 195 90 C 235 85, 260 110, 255 145 C 250 172, 222 180, 195 160 Z" fill="#6C8F9F" stroke="#43667A" strokeWidth="3" />
        <path d="M 200 102 C 224 100, 242 116, 238 138 C 234 156, 216 162, 200 148 Z" fill="#F8BAC6" opacity="0.85" />

        {/* Back Feet */}
        <rect x="100" y="215" width="44" height="70" rx="16" fill="#6C8F9F" stroke="#43667A" strokeWidth="3" />
        <rect x="215" y="215" width="44" height="70" rx="16" fill="#6C8F9F" stroke="#43667A" strokeWidth="3" />
        <circle cx="110" cy="280" r="3.5" fill="#FFFFFF" opacity="0.9" />
        <circle cx="122" cy="280" r="3.5" fill="#FFFFFF" opacity="0.9" />
        <circle cx="134" cy="280" r="3.5" fill="#FFFFFF" opacity="0.9" />
        <circle cx="225" cy="280" r="3.5" fill="#FFFFFF" opacity="0.9" />
        <circle cx="237" cy="280" r="3.5" fill="#FFFFFF" opacity="0.9" />
        <circle cx="249" cy="280" r="3.5" fill="#FFFFFF" opacity="0.9" />

        {/* Body */}
        <ellipse cx="178" cy="190" rx="84" ry="68" fill="#7FA1B4" stroke="#43667A" strokeWidth="3.5" />

        {/* Front Feet */}
        <rect x="122" y="224" width="46" height="66" rx="16" fill="#8BB0C3" stroke="#43667A" strokeWidth="3.5" />
        <rect x="185" y="224" width="46" height="66" rx="16" fill="#8BB0C3" stroke="#43667A" strokeWidth="3.5" />
        <circle cx="134" cy="284" r="4" fill="#FFFFFF" />
        <circle cx="145" cy="284" r="4" fill="#FFFFFF" />
        <circle cx="156" cy="284" r="4" fill="#FFFFFF" />
        <circle cx="197" cy="284" r="4" fill="#FFFFFF" />
        <circle cx="208" cy="284" r="4" fill="#FFFFFF" />
        <circle cx="219" cy="284" r="4" fill="#FFFFFF" />

        {/* Near/Left Ear (broad fan ear) */}
        <path d="M 125 78 C 65 74, 40 120, 52 170 C 66 215, 114 206, 126 170 Z" fill="#8BB0C3" stroke="#43667A" strokeWidth="3.5" />
        <path d="M 118 92 C 78 92, 58 128, 68 162 C 78 190, 108 186, 118 160 Z" fill="#F8BAC6" opacity="0.9" />

        {/* Head */}
        <circle cx="155" cy="134" r="56" fill="#8BB0C3" stroke="#43667A" strokeWidth="3.5" />
        {/* Hair tuft */}
        <path d="M 152 79 Q 154 66 157 79 M 157 78 Q 161 64 164 80" stroke="#43667A" strokeWidth="3" strokeLinecap="round" />

        {/* Both Eyes */}
        {/* Left eye */}
        <ellipse cx="134" cy="120" rx="9.5" ry="11.5" fill="#1C3038" />
        <circle cx="131.5" cy="116" r="3.8" fill="#FFFFFF" />
        <circle cx="137" cy="123" r="1.6" fill="#FFFFFF" />
        <ellipse cx="127" cy="138" rx="8" ry="5.5" fill="#F8A5B2" opacity="0.7" />

        {/* Right eye */}
        <ellipse cx="178" cy="120" rx="8.5" ry="10.5" fill="#1C3038" />
        <circle cx="176" cy="116" r="3.4" fill="#FFFFFF" />
        <circle cx="180" cy="123" r="1.4" fill="#FFFFFF" />
        <ellipse cx="184" cy="138" rx="7.5" ry="5" fill="#F8A5B2" opacity="0.7" />

        {/* Tusks */}
        <path d="M 134 150 Q 130 164 122 166 Q 128 172 138 160 Z" fill="#FFFFFF" stroke="#D5D0C2" strokeWidth="1.8" />
        <path d="M 176 150 Q 180 164 188 166 Q 182 172 172 160 Z" fill="#FFFFFF" stroke="#D5D0C2" strokeWidth="1.8" />

        {/* Curved Happy Trunk */}
        <path
          d="M 146 142 
             C 146 168, 134 192, 120 210 
             C 106 226, 86 234, 74 222 
             C 60 210, 64 190, 80 180 
             C 92 172, 100 182, 96 190 
             C 92 196, 84 196, 82 204 
             C 80 212, 94 218, 106 208 
             C 122 194, 136 170, 138 142 Z"
          fill="#8BB0C3"
          stroke="#43667A"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <circle cx="70" cy="165" r="3.5" fill="#64B5F6" opacity="0.85" />
      </g>

      {/* -------------------------------------------------------------
          2. RABBIT (Center-Right) — Harmonious & Complete
          ------------------------------------------------------------- */}
      <g transform="translate(250, 120) scale(0.64)">
        {/* Fluffy Tail */}
        <circle cx="94" cy="235" r="16" fill="#FFFFFF" stroke="#7D5A40" strokeWidth="3" />

        {/* Back Feet */}
        <ellipse cx="115" cy="272" rx="36" ry="16" fill="#FFF2E2" stroke="#7D5A40" strokeWidth="3.5" />
        <ellipse cx="195" cy="272" rx="36" ry="16" fill="#FFF2E2" stroke="#7D5A40" strokeWidth="3.5" />

        {/* Body */}
        <ellipse cx="155" cy="210" rx="64" ry="58" fill="#FFF7ED" stroke="#7D5A40" strokeWidth="3.5" />
        <ellipse cx="155" cy="214" rx="40" ry="44" fill="#FFFFFF" opacity="0.9" />

        {/* Front Paws */}
        <ellipse cx="140" cy="214" rx="14" ry="18" fill="#FFFFFF" stroke="#7D5A40" strokeWidth="3" transform="rotate(-10 140 214)" />
        <ellipse cx="170" cy="214" rx="14" ry="18" fill="#FFFFFF" stroke="#7D5A40" strokeWidth="3" transform="rotate(10 170 214)" />

        {/* Ears */}
        <g transform="rotate(-8 122 110)">
          <path d="M 112 110 C 92 60, 92 10, 116 8 C 140 6, 144 60, 134 110 Z" fill="#FFF7ED" stroke="#7D5A40" strokeWidth="3.5" />
          <path d="M 118 96 C 106 60, 106 24, 118 20 C 130 18, 132 60, 126 96 Z" fill="#FFA6B9" opacity="0.9" />
        </g>
        <g transform="rotate(10 188 110)">
          <path d="M 176 110 C 166 60, 170 10, 194 12 C 218 14, 208 60, 194 110 Z" fill="#FFF7ED" stroke="#7D5A40" strokeWidth="3.5" />
          <path d="M 184 96 C 176 60, 178 26, 190 28 C 202 30, 196 60, 188 96 Z" fill="#FFA6B9" opacity="0.9" />
        </g>

        {/* Head */}
        <circle cx="155" cy="135" r="48" fill="#FFF7ED" stroke="#7D5A40" strokeWidth="3.5" />

        {/* Both Eyes */}
        <ellipse cx="135" cy="128" rx="8" ry="11" fill="#291811" />
        <circle cx="132.5" cy="124" r="3.5" fill="#FFFFFF" />
        <ellipse cx="175" cy="128" rx="8" ry="11" fill="#291811" />
        <circle cx="172.5" cy="124" r="3.5" fill="#FFFFFF" />

        {/* Cheeks & Nose */}
        <circle cx="122" cy="144" r="9" fill="#FFB4C4" opacity="0.65" />
        <circle cx="188" cy="144" r="9" fill="#FFB4C4" opacity="0.65" />
        <polygon points="151,140 159,140 155,145" fill="#FB6F92" />
        <path d="M 155 145 L 155 150 Q 148 156 142 152 M 155 150 Q 162 156 168 152" stroke="#7D5A40" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Whiskers */}
        <path d="M 115 144 Q 95 140 84 144 M 195 144 Q 215 140 226 144" stroke="#A88B74" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>

      {/* -------------------------------------------------------------
          3. DUCK (Front-Right) — Smooth Neck & Webbed Feet
          ------------------------------------------------------------- */}
      <g transform="translate(370, 155) scale(0.58)">
        {/* Water / bank ripple */}
        <ellipse cx="160" cy="282" rx="100" ry="16" fill="#B3E5FC" stroke="#4FC3F7" strokeWidth="2.5" />

        {/* Webbed Feet */}
        <path d="M 148 248 L 144 266 L 132 274 L 144 272 L 154 274 L 152 266 Z" fill="#FB8C00" stroke="#C85A00" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 172 250 L 170 268 L 158 276 L 170 274 L 182 276 L 178 268 Z" fill="#FB8C00" stroke="#C85A00" strokeWidth="2.5" strokeLinejoin="round" />

        {/* Body & Tail */}
        <path d="M 215 186 C 245 168, 268 160, 262 188 C 258 206, 235 220, 205 218 Z" fill="#FDD835" stroke="#B26A00" strokeWidth="3.5" strokeLinejoin="round" />
        <ellipse cx="168" cy="208" rx="70" ry="52" fill="#FDD835" stroke="#B26A00" strokeWidth="3.5" />

        {/* Smooth Neck contour */}
        <path d="M 120 155 C 125 178, 140 195, 160 200 C 135 198, 102 180, 98 152 Z" fill="#FDD835" />

        {/* Wing */}
        <path d="M 136 182 C 172 170, 212 186, 206 218 C 192 242, 148 238, 132 206 Z" fill="#FBC02D" stroke="#B26A00" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M 152 198 Q 174 204 186 218" stroke="#B26A00" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Head */}
        <circle cx="114" cy="132" r="42" fill="#FDD835" stroke="#B26A00" strokeWidth="3.5" />
        <path d="M 112 88 Q 110 74 118 70 Q 124 76 122 88" fill="#FDD835" stroke="#B26A00" strokeWidth="2.5" />

        {/* Eye */}
        <ellipse cx="102" cy="120" rx="9" ry="12" fill="#1C2833" />
        <circle cx="99" cy="116" r="4" fill="#FFFFFF" />
        <circle cx="105" cy="123" r="1.8" fill="#FFFFFF" />
        <circle cx="118" cy="142" r="8" fill="#FF8A65" opacity="0.6" />

        {/* Flat Duck Beak */}
        <path d="M 84 128 C 48 126, 36 140, 52 152 C 72 164, 88 154, 94 146 Z" fill="#FF9800" stroke="#C85A00" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="76" cy="136" r="2.2" fill="#8A3600" />
      </g>

      {/* -------------------------------------------------------------
          4. BIRD (Top-Right) — Symmetrical Wings & BOTH Eyes
          ------------------------------------------------------------- */}
      <g transform="translate(340, 25) scale(0.50)">
        {/* Tail */}
        <path d="M 144 236 L 126 278 L 160 268 L 194 278 L 176 236 Z" fill="#0277BD" stroke="#014B75" strokeWidth="3" strokeLinejoin="round" />

        {/* Left Wing */}
        <path d="M 122 178 C 80 135, 48 116, 26 142 C 16 168, 58 212, 112 206 Z" fill="#039BE5" stroke="#014B75" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M 44 152 Q 74 168 102 194" stroke="#014B75" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Right Wing */}
        <path d="M 198 178 C 240 135, 272 116, 294 142 C 304 168, 262 212, 208 206 Z" fill="#039BE5" stroke="#014B75" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M 276 152 Q 246 168 218 194" stroke="#014B75" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Body & Belly */}
        <ellipse cx="160" cy="196" rx="54" ry="58" fill="#29B6F6" stroke="#014B75" strokeWidth="3.5" />
        <ellipse cx="160" cy="204" rx="34" ry="38" fill="#FFF9C4" />

        {/* Head & Crest */}
        <circle cx="160" cy="122" r="42" fill="#29B6F6" stroke="#014B75" strokeWidth="3.5" />
        <path d="M 154 78 Q 142 52 158 48 Q 168 62 164 78" fill="#0288D1" stroke="#014B75" strokeWidth="3" />
        <path d="M 162 78 Q 176 58 186 60 Q 180 74 170 80" fill="#039BE5" stroke="#014B75" strokeWidth="2.5" />

        {/* BOTH Eyes */}
        <ellipse cx="144" cy="116" rx="8" ry="11" fill="#1C2833" />
        <circle cx="141.5" cy="112" r="3.6" fill="#FFFFFF" />
        <ellipse cx="176" cy="116" rx="8" ry="11" fill="#1C2833" />
        <circle cx="173.5" cy="112" r="3.6" fill="#FFFFFF" />

        {/* Cheeks */}
        <circle cx="132" cy="128" r="7" fill="#FF8A80" opacity="0.65" />
        <circle cx="188" cy="128" r="7" fill="#FF8A80" opacity="0.65" />

        {/* Little Beak */}
        <path d="M 150 120 Q 160 114 170 120 L 160 134 Z" fill="#FF9800" stroke="#C85A00" strokeWidth="2" strokeLinejoin="round" />
        <line x1="152" y1="123" x2="168" y2="123" stroke="#8A3600" strokeWidth="1.5" strokeLinecap="round" />

        {/* Feet */}
        <path d="M 148 250 L 148 266 M 143 266 L 153 266" stroke="#E65100" strokeWidth="3" strokeLinecap="round" />
        <path d="M 172 250 L 172 266 M 167 266 L 177 266" stroke="#E65100" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
};
