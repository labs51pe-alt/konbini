import React from 'react';

interface KonbiniLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const KonbiniLogo: React.FC<KonbiniLogoProps> = ({
  className = '',
  size = 120,
  showText = true,
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Purple Circular Background */}
        <circle cx="200" cy="200" r="190" fill="#8B72B8" />

        {/* Mascot Sprout on top of head */}
        <g stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M200 78 C200 60 186 52 178 58 C172 63 174 74 198 76" fill="#FFFFFF" fillOpacity="0.2" />
          <path d="M200 78 C200 60 214 52 222 58 C228 63 226 74 202 76" fill="#FFFFFF" fillOpacity="0.2" />
          <path d="M200 78 V90" strokeWidth="5" />
        </g>

        {/* Bear Head and Ears */}
        {/* Left Ear */}
        <circle cx="160" cy="100" r="28" fill="#FFFFFF" />
        <circle cx="160" cy="100" r="16" fill="#8B72B8" fillOpacity="0.18" />

        {/* Right Ear */}
        <circle cx="240" cy="100" r="28" fill="#FFFFFF" />
        <circle cx="240" cy="100" r="16" fill="#8B72B8" fillOpacity="0.18" />

        {/* Main Bear Face */}
        <ellipse cx="200" cy="130" rx="55" ry="46" fill="#FFFFFF" />

        {/* Smiling Eyes (curved arcs) */}
        <path
          d="M178 126 C183 120 189 120 194 126"
          stroke="#8B72B8"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M206 126 C211 120 217 120 222 126"
          stroke="#8B72B8"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cute Nose and Smile */}
        <ellipse cx="200" cy="134" rx="4" ry="3" fill="#8B72B8" />
        <path
          d="M195 139 C197 143 203 143 205 139"
          stroke="#8B72B8"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cute blush cheeks */}
        <circle cx="170" cy="134" r="5" fill="#FFAAA6" fillOpacity="0.6" />
        <circle cx="230" cy="134" r="5" fill="#FFAAA6" fillOpacity="0.6" />

        {/* Bear Paws holding the cart */}
        <ellipse cx="174" cy="162" rx="16" ry="11" fill="#FFFFFF" stroke="#8B72B8" strokeWidth="3" />
        <ellipse cx="226" cy="162" rx="16" ry="11" fill="#FFFFFF" stroke="#8B72B8" strokeWidth="3" />

        {/* Shopping Cart Outline and Bars */}
        <g stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Cart handle */}
          <path d="M112 136 H132 L144 216 H256 L270 156 H146" />
          {/* Horizontal interior wire slats */}
          <line x1="148" y1="176" x2="264" y2="176" strokeWidth="7" />
          <line x1="152" y1="196" x2="258" y2="196" strokeWidth="7" />
        </g>

        {/* Cart Wheels */}
        <circle cx="160" cy="242" r="14" stroke="#FFFFFF" strokeWidth="8" fill="none" />
        <circle cx="228" cy="242" r="14" stroke="#FFFFFF" strokeWidth="8" fill="none" />

        {showText && (
          <>
            {/* Word "KONBINI" */}
            <text
              x="200"
              y="304"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif"
              fontWeight="900"
              fontSize="48"
              letterSpacing="2.5"
            >
              KONBINI
            </text>

            {/* Word "market" */}
            <text
              x="200"
              y="342"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
              fontWeight="800"
              fontSize="30"
              letterSpacing="1.2"
            >
              market
            </text>
          </>
        )}
      </svg>
    </div>
  );
};
