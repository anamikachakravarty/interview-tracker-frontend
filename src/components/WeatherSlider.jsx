const MODES = [
  { mode: "cloudy", label: "Cloudy", icon: "☁" },
  { mode: "sunlit", label: "Sunlit", icon: "☀" },
  { mode: "dusk", label: "Dusk", icon: "☾" },
];

function WeatherSlider({ value, onChange }) {
  const index = MODES.findIndex((item) => item.mode === value);

  return (
    <div className="weather-slider">
      <div className="weather-slider-control">
        <input
          type="range"
          min="0"
          max={MODES.length - 1}
          step="1"
          value={index}
          onChange={(event) => onChange(MODES[Number(event.target.value)].mode)}
          aria-label="Weather and window lighting"
          aria-valuetext={MODES[index].label}
        />
        <div className="weather-slider-notches" aria-hidden="true">
          {MODES.map(({ mode }) => (
            <span key={mode} />
          ))}
        </div>
      </div>

      <div className="weather-slider-labels">
        {MODES.map(({ mode, label, icon }) => (
          <button
            key={mode}
            type="button"
            className={mode === value ? "selected" : ""}
            onClick={() => onChange(mode)}
            tabIndex={-1}
            title={label}
          >
            <span aria-hidden="true">{icon}</span>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WeatherSlider;
