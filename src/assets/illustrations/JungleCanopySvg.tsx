import React from 'react';

interface JungleCanopySvgProps {
  className?: string;
}

export const JungleCanopySvg: React.FC<JungleCanopySvgProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 1200 160"
      preserveAspectRatio="none"
      className={`jungle-canopy-svg ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id="canopyDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E4D32" />
          <stop offset="100%" stopColor="#2E6B47" />
        </linearGradient>
        <linearGradient id="canopyMid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#387D54" />
          <stop offset="100%" stopColor="#4FA06E" />
        </linearGradient>
        <linearGradient id="canopyLight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5DB37E" />
          <stop offset="100%" stopColor="#78C694" />
        </linearGradient>
      </defs>

      {/* Background canopy layer */}
      <path
        d="M 0 0 L 1200 0 L 1200 60 C 1120 75, 1060 40, 980 65 C 900 90, 840 45, 760 70 C 680 95, 610 50, 520 75 C 440 98, 380 45, 290 70 C 200 95, 120 50, 0 80 Z"
        fill="url(#canopyDark)"
      />

      {/* Hanging vines */}
      <path
        d="M 90 0 Q 100 80 85 110 M 240 0 Q 230 70 245 95 M 650 0 Q 665 90 645 125 M 920 0 Q 910 75 925 105 M 1080 0 Q 1095 85 1080 120"
        stroke="#2E6B47"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Tiny vine leaves */}
      <circle cx="85" cy="85" r="5" fill="#78C694" />
      <circle cx="240" cy="70" r="5" fill="#78C694" />
      <circle cx="652" cy="95" r="6" fill="#F4A261" />
      <circle cx="918" cy="80" r="5" fill="#78C694" />
      <circle cx="1088" cy="90" r="6" fill="#F4A261" />

      {/* Middle layered foliage (broad tropical leaves) */}
      {/* Left cluster */}
      <path
        d="M 0 0 C 40 40, 80 80, 70 120 C 50 110, 30 80, 0 60 Z"
        fill="url(#canopyMid)"
      />
      <path
        d="M 60 0 C 100 35, 150 75, 140 110 C 115 100, 90 70, 50 40 Z"
        fill="url(#canopyLight)"
      />
      <path
        d="M 130 0 C 180 40, 220 85, 200 115 C 180 100, 160 65, 120 30 Z"
        fill="url(#canopyMid)"
      />

      {/* Center leaves */}
      <path
        d="M 440 0 C 470 45, 510 80, 490 105 C 470 95, 450 65, 420 30 Z"
        fill="url(#canopyMid)"
      />
      <path
        d="M 500 0 C 540 50, 580 90, 570 115 C 545 105, 520 70, 485 35 Z"
        fill="url(#canopyLight)"
      />
      <path
        d="M 720 0 C 750 45, 790 85, 780 110 C 755 100, 735 65, 700 30 Z"
        fill="url(#canopyMid)"
      />

      {/* Right cluster */}
      <path
        d="M 1000 0 C 1040 45, 1090 90, 1070 120 C 1050 105, 1025 70, 980 35 Z"
        fill="url(#canopyMid)"
      />
      <path
        d="M 1080 0 C 1120 40, 1170 85, 1155 115 C 1135 105, 1110 70, 1070 30 Z"
        fill="url(#canopyLight)"
      />
      <path
        d="M 1150 0 C 1175 35, 1200 70, 1200 95 L 1200 0 Z"
        fill="url(#canopyDark)"
      />
    </svg>
  );
};
