const STAR_POSITIONS = [
  [8, 13, 3], [16, 29, 2], [25, 11, 2], [34, 22, 3],
  [43, 8, 2], [52, 18, 3], [62, 10, 2], [72, 25, 3],
  [83, 12, 2], [91, 32, 3], [12, 43, 2], [38, 39, 2],
  [68, 42, 2], [78, 7, 2], [57, 34, 2],
];

const RAIN_DROPS = Array.from({ length: 30 }, (_, index) => ({
  left: (index * 37 + 11) % 100,
  delay: -((index * 17) % 23) / 10,
  duration: 0.72 + ((index * 13) % 8) / 10,
  height: 10 + ((index * 7) % 10),
}));

function PixelCloud({ className = "" }) {
  return (
    <div className={`pixel-cloud ${className}`}>
      <span className="cloud-cap" />
      <span className="cloud-body" />
    </div>
  );
}

export default function WindowAtmosphere() {
  return (
    <div className="window-atmosphere" aria-hidden="true">
      <div className="sky-glow" />
      <div className="overcast-wash" />
      <div className="pixel-sun" />
      <div className="pixel-moon" />

      <div className="star-field">
        {STAR_POSITIONS.map(([left, top, size], index) => (
          <span
            className="pixel-star"
            key={index}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${-index * 0.37}s`,
            }}
          />
        ))}
      </div>

      <div className="cloud-field">
        <PixelCloud className="cloud-one" />
        <PixelCloud className="cloud-two" />
        <PixelCloud className="cloud-three" />
        <PixelCloud className="cloud-four" />
      </div>

      <svg className="bird-flock bird-flock-one" viewBox="0 0 90 34">
        <g className="bird bird-one">
          <path d="M2 16 Q8 7 15 16 Q22 7 29 16" />
        </g>
        <g className="bird bird-two">
          <path d="M34 22 Q40 13 47 22 Q54 13 61 22" />
        </g>
        <g className="bird bird-three">
          <path d="M60 9 Q66 0 73 9 Q80 0 87 9" />
        </g>
      </svg>

      <div className="rain-layer">
        {RAIN_DROPS.map((drop, index) => (
          <span
            className="rain-drop"
            key={index}
            style={{
              left: `${drop.left}%`,
              height: `${drop.height}px`,
              animationDelay: `${drop.delay}s`,
              animationDuration: `${drop.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="lightning-flash">
        <span className="lightning-bolt" />
      </div>

      <div className="window-sashes">
        <div className="window-sash window-sash-left" />
        <div className="window-sash window-sash-right" />
      </div>
    </div>
  );
}
