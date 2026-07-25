import React from 'react';

interface EtikaInformasiLogoProps {
  className?: string;
  isDark?: boolean;
}

export const EtikaInformasiLogo: React.FC<EtikaInformasiLogoProps> = ({
  className = "w-72 h-auto",
  isDark = true,
}) => {
  const primaryTextColor = isDark ? "#FFFFFF" : "#0B2B48";
  const strokeColor = isDark ? "#94A3B8" : "#0B2B48";
  const subtitleColor = isDark ? "#2DD4BF" : "#1C7C75";

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 500 450"
        className="w-full h-auto drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="blueTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B2B48" />
            <stop offset="50%" stopColor="#0E4A6F" />
            <stop offset="100%" stopColor="#1C7C75" />
          </linearGradient>
          <linearGradient id="tealGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00796B" />
            <stop offset="100%" stopColor="#004D40" />
          </linearGradient>
        </defs>

        {/* White circle background container for the emblem */}
        <circle cx="250" cy="180" r="148" fill="#FFFFFF" />

        {/* Outer Circular Ring (Navy to Teal Gradient) */}
        <circle
          cx="250"
          cy="180"
          r="142"
          stroke="url(#blueTealGrad)"
          strokeWidth="10"
          fill="none"
        />

        {/* Inner Dashed/Thin Accent Arc */}
        <circle
          cx="250"
          cy="180"
          r="128"
          stroke="#0B2B48"
          strokeWidth="2"
          strokeDasharray="10 6"
          strokeOpacity="0.35"
          fill="none"
        />

        {/* TOP CENTER: Shield with Padlock */}
        <g transform="translate(250, 78)">
          <path
            d="M 0 -20 C 16 -20, 22 -26, 24 -28 C 24 5, 16 18, 0 26 C -16 18, -24 5, -24 -28 C -22 -26, -16 -20, 0 -20 Z"
            fill="#0E4A6F"
          />
          <path
            d="M 0 -16 C 12 -16, 16 -21, 18 -23 C 18 2, 12 12, 0 19 C -12 12, -18 2, -18 -23 C -16 -21, -12 -16, 0 -16 Z"
            fill="#FFFFFF"
          />
          <rect x="-6" y="-1" width="12" height="10" rx="2" fill="#0B2B48" />
          <path
            d="M -4 -1 A 4 4 0 0 1 4 -1"
            stroke="#0B2B48"
            strokeWidth="2.5"
            fill="none"
          />
          <circle cx="0" cy="3" r="1.2" fill="#FFFFFF" />
        </g>

        {/* TOP LEFT: Magnifying Glass with Checkmark */}
        <g transform="translate(160, 115)">
          <circle cx="0" cy="0" r="16" stroke="#0B2B48" strokeWidth="4" fill="#FFFFFF" />
          <line x1="-9" y1="9" x2="-20" y2="20" stroke="#0B2B48" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M -5 0 L -1 4 L 6 -4" stroke="#0E4A6F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>

        {/* TOP RIGHT: Scales of Justice */}
        <g transform="translate(340, 115)">
          <line x1="0" y1="-18" x2="0" y2="16" stroke="#0B2B48" strokeWidth="3" />
          <line x1="-12" y1="16" x2="12" y2="16" stroke="#0B2B48" strokeWidth="3" />
          <circle cx="0" cy="-18" r="3" fill="#0B2B48" />
          <line x1="-20" y1="-10" x2="20" y2="-10" stroke="#0B2B48" strokeWidth="3" />
          <line x1="-20" y1="-10" x2="-26" y2="2" stroke="#0B2B48" strokeWidth="1.5" />
          <line x1="-20" y1="-10" x2="-14" y2="2" stroke="#0B2B48" strokeWidth="1.5" />
          <path d="M -29 2 Q -20 8 -11 2 Z" fill="#0B2B48" />
          <line x1="20" y1="-10" x2="14" y2="2" stroke="#0B2B48" strokeWidth="1.5" />
          <line x1="20" y1="-10" x2="26" y2="2" stroke="#0B2B48" strokeWidth="1.5" />
          <path d="M 11 2 Q 20 8 29 2 Z" fill="#0B2B48" />
        </g>

        {/* MIDDLE LEFT: Document with Green Checkmark */}
        <g transform="translate(150, 195)">
          <rect x="-14" y="-20" width="26" height="34" rx="3" fill="#FFFFFF" stroke="#0B2B48" strokeWidth="2.5" />
          <line x1="-9" y1="-12" x2="4" y2="-12" stroke="#0B2B48" strokeWidth="2" strokeLinecap="round" />
          <line x1="-9" y1="-6" x2="6" y2="-6" stroke="#0B2B48" strokeWidth="2" strokeLinecap="round" />
          <line x1="-9" y1="0" x2="-2" y2="0" stroke="#0B2B48" strokeWidth="2" strokeLinecap="round" />
          <circle cx="7" cy="7" r="9" fill="#00796B" />
          <path d="M 3 7 L 6 10 L 11 4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>

        {/* MIDDLE RIGHT: Hand Holding Two People Icons */}
        <g transform="translate(350, 195)">
          <circle cx="-5" cy="-10" r="3.5" fill="#0B2B48" />
          <path d="M -10 -2 C -10 -6, -1 -6, -1 -2 Z" fill="#0B2B48" />
          <circle cx="5" cy="-12" r="4.5" fill="#0B2B48" />
          <path d="M 0 -2 C 0 -7, 10 -7, 10 -2 Z" fill="#0B2B48" />
          <path
            d="M -18 8 Q -10 0 -2 3 Q 6 0 14 5 Q 18 7 16 12 Q 10 15 -2 15 Q -14 15 -18 8 Z"
            fill="#1C7C75"
          />
        </g>

        {/* CENTER: Head Silhouette facing right with 'i' info speech bubble */}
        <g transform="translate(250, 190)">
          <path
            d="M -5 -45 A 38 38 0 0 1 38 -7 C 38 11 28 25 14 32 L 14 42 L 0 34 A 38 38 0 0 1 -38 -7 A 38 38 0 0 1 -5 -45 Z"
            fill="url(#blueTealGrad)"
          />
          <circle cx="-2" cy="-22" r="4" fill="#FFFFFF" />
          <path
            d="M -4 -12 C -1 -12, 0 -10, -1 -6 L -4 8 C -5 12, -2 14, 1 14"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* BOTTOM: Open Book (Spanning across bottom of emblem) */}
        <g transform="translate(250, 235)">
          <path
            d="M 0 5 Q -45 -15 -95 0 L -90 25 Q -45 12 0 26 Q 45 12 90 25 L 95 0 Q 45 -15 0 5 Z"
            fill="#1C7C75"
          />
          <path
            d="M 0 0 Q -40 -16 -88 -4 L -84 20 Q -40 7 0 20 Q 40 7 84 20 L 88 -4 Q 40 -16 0 0 Z"
            fill="#0B2B48"
          />
          <path d="M -4 -2 Q -40 -16 -80 -5" stroke="#FFFFFF" strokeWidth="2" fill="none" />
          <path d="M 4 -2 Q 40 -16 80 -5" stroke="#FFFFFF" strokeWidth="2" fill="none" />
          <path d="M -4 4 Q -40 -10 -78 1" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
          <path d="M 4 4 Q 40 -10 78 1" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
        </g>

        {/* TYPOGRAPHY BELOW EMBLEM */}
        {/* Main Title: ETIKA INFORMASI */}
        <text
          x="250"
          y="355"
          textAnchor="middle"
          fill={primaryTextColor}
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontWeight="900"
          fontSize="32"
          letterSpacing="3"
        >
          ETIKA INFORMASI
        </text>

        {/* Decorative Line & Center Dot */}
        <line x1="50" y1="375" x2="225" y2="375" stroke={strokeColor} strokeWidth="2" />
        <circle cx="250" cy="375" r="4.5" fill={subtitleColor} />
        <line x1="275" y1="375" x2="450" y2="375" stroke={strokeColor} strokeWidth="2" />

        {/* Subtitle: AKURAT • ADIL • AMAN • BERTANGGUNG JAWAB */}
        <text
          x="250"
          y="400"
          textAnchor="middle"
          fill={subtitleColor}
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontWeight="800"
          fontSize="11.5"
          letterSpacing="2.2"
        >
          AKURAT • ADIL • AMAN • BERTANGGUNG JAWAB
        </text>
      </svg>
    </div>
  );
};
