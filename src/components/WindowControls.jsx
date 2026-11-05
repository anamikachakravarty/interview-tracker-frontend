function getTimeLabel(value) {
  if (value < 18) return "Dawn";
  if (value < 54) return "Daylight";
  if (value < 78) return "Dusk";
  return "Night";
}

function getWeatherLabel(value) {
  if (value < 28) return "Clear skies";
  if (value < 68) return "Partly cloudy";
  return "Overcast";
}

function getOpeningLabel(value) {
  if (value < 8) return "Closed";
  if (value < 38) return "Slightly open";
  if (value < 72) return "Half open";
  return "Wide open";
}

function SceneSlider({ id, label, value, onChange, minLabel, maxLabel, valueLabel, icon }) {
  return (
    <div className="scene-control">
      <div className="scene-control-heading">
        <span className="scene-control-icon" aria-hidden="true">{icon}</span>
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>{valueLabel}</output>
      </div>

      <input
        id={id}
        className="scene-range"
        type="range"
        min="0"
        max="100"
        step="1"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={label}
        aria-valuetext={valueLabel}
      />

      <div className="scene-control-scale" aria-hidden="true">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

export default function WindowControls({
  opening,
  onOpeningChange,
  timeOfDay,
  onTimeOfDayChange,
  weather,
  onWeatherChange,
}) {
  return (
    <section className="scene-controls" aria-label="Window and sky controls">
      <SceneSlider
        id="window-opening-control"
        label="Open the window"
        icon="▱"
        value={opening}
        onChange={onOpeningChange}
        minLabel="Closed"
        maxLabel="Open"
        valueLabel={getOpeningLabel(opening)}
      />

      <SceneSlider
        id="time-of-day-control"
        label="Time of day"
        icon={timeOfDay > 68 ? "☾" : timeOfDay > 52 ? "◒" : "☀"}
        value={timeOfDay}
        onChange={onTimeOfDayChange}
        minLabel="Dawn"
        maxLabel="Night"
        valueLabel={getTimeLabel(timeOfDay)}
      />

      <SceneSlider
        id="sky-weather-control"
        label="Sky & weather"
        icon={weather > 68 ? "☂" : weather > 28 ? "☁" : "☀"}
        value={weather}
        onChange={onWeatherChange}
        minLabel="Clear"
        maxLabel="Overcast"
        valueLabel={getWeatherLabel(weather)}
      />
    </section>
  );
}
