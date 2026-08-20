export default function Emblem({ className = "w-16 h-20 text-white" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* State Emblem of India (Ashoka Lion Capital with Satyamev Jayate) */}
      <svg
        viewBox="0 0 200 240"
        fill="currentColor"
        className="w-full h-full drop-shadow-md"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Emblem of India"
      >
        {/* Four Lions Head Profiles */}
        <g stroke="currentColor" strokeWidth="1.5" fill="currentColor">
          {/* Central Lion */}
          <path d="M100 25 C92 25 86 32 86 42 C86 52 90 58 87 64 C84 70 82 78 88 88 C94 98 100 102 100 106 C100 102 106 98 112 88 C118 78 116 70 113 64 C110 58 114 52 114 42 C114 32 108 25 100 25 Z" opacity="0.95" />
          {/* Lion Mane & Details */}
          <path d="M92 45 C88 48 88 56 93 58 C96 52 95 48 92 45 Z" fill="#fff" opacity="0.3" />
          <path d="M108 45 C112 48 112 56 107 58 C104 52 105 48 108 45 Z" fill="#fff" opacity="0.3" />
          {/* Eyes & Snout */}
          <circle cx="95" cy="42" r="2.5" fill="#fff" />
          <circle cx="105" cy="42" r="2.5" fill="#fff" />
          <path d="M97 50 Q100 54 103 50 Z" fill="#fff" />
          <path d="M93 58 Q100 66 107 58" fill="none" stroke="#fff" strokeWidth="1.5" />
          <path d="M88 72 Q100 82 112 72" fill="none" stroke="#fff" strokeWidth="1.5" />
          <path d="M85 86 Q100 96 115 86" fill="none" stroke="#fff" strokeWidth="1.5" />

          {/* Left Lion Profile */}
          <path d="M86 45 C78 40 68 45 66 56 C64 68 68 76 65 84 C62 92 68 102 78 106 C84 102 85 92 84 84 C85 75 84 60 86 45 Z" opacity="0.88" />
          <circle cx="72" cy="54" r="2" fill="#fff" />
          <path d="M68 62 Q74 66 78 60" fill="none" stroke="#fff" strokeWidth="1.2" />
          <path d="M66 74 Q74 80 80 74" fill="none" stroke="#fff" strokeWidth="1.2" />

          {/* Right Lion Profile */}
          <path d="M114 45 C122 40 132 45 134 56 C136 68 132 76 135 84 C138 92 132 102 122 106 C116 102 115 92 116 84 C115 75 116 60 114 45 Z" opacity="0.88" />
          <circle cx="128" cy="54" r="2" fill="#fff" />
          <path d="M132 62 Q126 66 122 60" fill="none" stroke="#fff" strokeWidth="1.2" />
          <path d="M134 74 Q126 80 120 74" fill="none" stroke="#fff" strokeWidth="1.2" />

          {/* Abacus Base Platform */}
          <rect x="52" y="112" width="96" height="26" rx="3" opacity="0.95" />
          
          {/* Central Ashoka Chakra on Abacus */}
          <circle cx="100" cy="125" r="10" fill="none" stroke="#fff" strokeWidth="1.5" />
          <circle cx="100" cy="125" r="2" fill="#fff" />
          {/* 24 spokes representation */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="100"
              y1="125"
              x2={100 + 10 * Math.cos((deg * Math.PI) / 180)}
              y2={125 + 10 * Math.sin((deg * Math.PI) / 180)}
              stroke="#fff"
              strokeWidth="0.8"
            />
          ))}

          {/* Galloping Horse on left */}
          <path d="M60 125 C64 121 70 121 73 125 C70 127 66 129 60 125 Z" fill="#fff" opacity="0.8" />
          {/* Bull on right */}
          <path d="M127 125 C130 121 136 121 140 125 C134 127 130 129 127 125 Z" fill="#fff" opacity="0.8" />

          {/* Bell shaped Lotus Base */}
          <path d="M62 138 Q100 152 138 138 L142 148 Q100 162 58 148 Z" opacity="0.9" />
          <path d="M68 148 Q100 168 132 148 L126 156 Q100 172 74 156 Z" opacity="0.75" />
        </g>

        {/* Motto: Satyamev Jayate in Devanagari */}
        <text
          x="100"
          y="188"
          textAnchor="middle"
          fill="currentColor"
          fontSize="17"
          fontFamily="'Noto Sans Devanagari', 'Noto Serif', serif"
          fontWeight="700"
          letterSpacing="1.5"
        >
          सत्यमेव जयते
        </text>
      </svg>
    </div>
  );
}
