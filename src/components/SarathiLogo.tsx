interface SarathiLogoProps {
  size?: number;
  className?: string;
}

export default function SarathiLogo({
  size = 120,
  className = "",
}: SarathiLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Sarathi logo"
    >
      {/* Outer warm ring */}
      <circle
        cx="64"
        cy="64"
        r="60"
        stroke="#FF8C00"
        strokeWidth="4"
        fill="#FFF8F0"
      />

      {/* Chariot wheel */}
      <g className="origin-center animate-wheel-spin">
        <circle
          cx="64"
          cy="64"
          r="34"
          stroke="#E67E00"
          strokeWidth="5"
          fill="none"
        />
        <circle cx="64" cy="64" r="8" fill="#E67E00" />
        {/* 12 spokes */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 64 + 9 * Math.cos(angle);
          const y1 = 64 + 9 * Math.sin(angle);
          const x2 = 64 + 33 * Math.cos(angle);
          const y2 = 64 + 33 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#E67E00"
              strokeWidth="4"
              strokeLinecap="round"
            />
          );
        })}
      </g>

      {/* Guiding hand — simple stylized path in saffron */}
      <g transform="translate(86 78)">
        <path
          d="M0 18 C0 8 8 0 18 0 L26 0 C33 0 38 5 38 12 L38 22 C38 28 33 33 26 33 L14 33 C6 33 0 27 0 18 Z"
          fill="#FF8C00"
        />
        {/* Fingers */}
        <rect x="6" y="-6" width="5" height="10" rx="2.5" fill="#FF8C00" />
        <rect x="14" y="-8" width="5" height="12" rx="2.5" fill="#FF8C00" />
        <rect x="22" y="-6" width="5" height="10" rx="2.5" fill="#FF8C00" />
        <rect x="30" y="-2" width="5" height="8" rx="2.5" fill="#FF8C00" />
      </g>
    </svg>
  );
}
