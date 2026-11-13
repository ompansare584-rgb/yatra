import s from "./Hero.module.scss";

const PIERS = Array.from({ length: 16 }, (_, i) => i * 108 + 40);
const COACHES = [0, 1, 2, 3, 4];

/**
 * The opening scene: dawn over a viaduct. Pure SVG, rendered on the server.
 * Scrolling is the journey — a CSS scroll timeline (see Hero.module.scss) raises the sun and
 * pulls the train away. No JavaScript, no idle animation; with reduced motion the scene is still.
 */
export default function HeroScene() {
  return (
    <div className={s.scene} aria-hidden="true">
      <svg viewBox="0 0 1600 360" preserveAspectRatio="xMidYMax slice" focusable="false">
        {/* Sun, low on the horizon (starts partly hidden behind the hills) */}
        <g transform="translate(0 52)">
          <g className={s.sun}>
            <circle cx="1130" cy="215" r="170" fill="#ffc857" opacity="0.1" />
            <circle cx="1130" cy="215" r="110" fill="#ffc857" opacity="0.22" />
            <circle cx="1130" cy="215" r="64" fill="#ffe3a0" />
          </g>
        </g>

        {/* Far hills */}
        <path
          d="M0 250 C200 200 380 200 560 240 S900 280 1100 230 S1450 190 1600 235 V360 H0 Z"
          fill="#5f8296"
          opacity="0.9"
        />
        {/* Middle hills */}
        <path d="M0 280 C220 240 420 250 620 275 S1000 310 1250 268 S1520 250 1600 270 V360 H0 Z" fill="#2e5671" />

        {/* Viaduct */}
        <rect x="0" y="262" width="1600" height="12" fill="#0f2238" />
        {PIERS.map((x) => (
          <rect key={x} x={x} y="274" width="26" height="90" fill="#0f2238" />
        ))}

        {/* Train: coaches with lit windows, a small locomotive at the front (right) */}
        <g transform="translate(180 186)">
          <g className={s.train}>
            {COACHES.map((c) => (
              <g key={c} transform={`translate(${c * 150} 0)`}>
                <rect x="0" y="22" width="142" height="46" rx="7" fill="#0b1a36" />
                {[0, 1, 2, 3, 4].map((w) => (
                  <rect key={w} x={12 + w * 25} y="32" width="15" height="14" rx="2" fill="#ffc857" opacity="0.92" />
                ))}
              </g>
            ))}
            <g transform="translate(755 0)">
              <rect x="0" y="14" width="42" height="54" rx="4" fill="#0b1a36" />
              <rect x="42" y="30" width="86" height="38" rx="16" fill="#0b1a36" />
              <rect x="104" y="10" width="14" height="22" fill="#0b1a36" />
              <circle cx="78" cy="30" r="9" fill="#0b1a36" />
              <rect x="10" y="24" width="20" height="14" rx="2" fill="#ffc857" opacity="0.92" />
              <circle cx="132" cy="48" r="7" fill="#ffe3a0" />
              <circle cx="132" cy="48" r="16" fill="#ffc857" opacity="0.28" />
            </g>
            {[20, 110, 230, 380, 530, 680, 780, 850].map((x) => (
              <circle key={x} cx={x} cy="68" r="7" fill="#0b1a36" />
            ))}
          </g>
        </g>

        {/* Foreground hill */}
        <path d="M0 332 C200 312 400 320 600 334 S1000 352 1300 328 S1520 320 1600 332 V360 H0 Z" fill="#09162b" />
      </svg>
    </div>
  );
}
