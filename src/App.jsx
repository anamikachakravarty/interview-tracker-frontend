import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import PixelPlant from "./components/PixelPlant";
import WindowControls from "./components/WindowControls";
import WindowAtmosphere from "./components/WindowAtmosphere";

import {
  getApplications,
  getLearningTopics,
  getLearningProgress,
} from "./services/api";

import "./App.css";
import "./WindowAtmosphere.css";

const TIME_STOPS = [
  { value: 0, tint: [235, 143, 125], tintOpacity: 0.30, sun: 0.38, moon: 0, stars: 0, birds: 0.45, night: 0 },
  { value: 20, tint: [255, 225, 166], tintOpacity: 0.10, sun: 1, moon: 0, stars: 0, birds: 1, night: 0 },
  { value: 52, tint: [255, 235, 190], tintOpacity: 0.07, sun: 0.82, moon: 0, stars: 0, birds: 0.78, night: 0 },
  { value: 75, tint: [192, 119, 145], tintOpacity: 0.32, sun: 0.12, moon: 0.34, stars: 0.25, birds: 0.08, night: 0.48 },
  { value: 100, tint: [19, 29, 62], tintOpacity: 0.58, sun: 0, moon: 1, stars: 1, birds: 0, night: 1 },
];

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function interpolateTime(value) {
  const upperIndex = TIME_STOPS.findIndex((stop) => stop.value >= value);

  if (upperIndex <= 0) return TIME_STOPS[0];
  if (upperIndex === -1) return TIME_STOPS[TIME_STOPS.length - 1];

  const lower = TIME_STOPS[upperIndex - 1];
  const upper = TIME_STOPS[upperIndex];
  const amount = (value - lower.value) / (upper.value - lower.value);

  const mix = (start, end) => start + (end - start) * amount;

  return {
    tint: lower.tint.map((channel, index) =>
      Math.round(mix(channel, upper.tint[index]))
    ),
    tintOpacity: mix(lower.tintOpacity, upper.tintOpacity),
    sun: mix(lower.sun, upper.sun),
    moon: mix(lower.moon, upper.moon),
    stars: mix(lower.stars, upper.stars),
    birds: mix(lower.birds, upper.birds),
    night: mix(lower.night, upper.night),
  };
}

function getSceneStyle(opening, timeOfDay, weather) {
  const time = interpolateTime(timeOfDay);
  const cloudiness = weather / 100;
  const rain = clamp((weather - 62) / 38);
  const storm = clamp((weather - 88) / 12);
  const clearFactor = 1 - cloudiness * 0.88;

  return {
    "--time-tint": time.tint.join(", "),
    "--time-tint-opacity": (time.tintOpacity + cloudiness * 0.10).toFixed(3),
    "--sun-opacity": (time.sun * (1 - cloudiness * 0.72)).toFixed(3),
    "--moon-opacity": (time.moon * (1 - cloudiness * 0.78)).toFixed(3),
    "--star-opacity": (time.stars * clearFactor).toFixed(3),
    "--bird-opacity": (time.birds * (1 - cloudiness)).toFixed(3),
    "--cloud-opacity": cloudiness.toFixed(3),
    "--rain-opacity": rain.toFixed(3),
    "--storm-opacity": storm.toFixed(3),
    "--night-level": time.night.toFixed(3),
    "--window-opening": opening,
    "--window-opening-angle": `${(opening / 100) * 78}deg`,
    "--window-opening-left-angle": `-${(opening / 100) * 78}deg`,
    "--window-glass-opacity": (0.18 - (opening / 100) * 0.09).toFixed(3),
  };
}

function App() {
  const [activePage, setActivePage] = useState("interviews");

  const [applications, setApplications] = useState([]);
  const [topics, setTopics] = useState([]);
  const [learningProgress, setLearningProgress] = useState([]);

  // Independent controls for the window and the view beyond it.
  const [windowOpening, setWindowOpening] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState(27);
  const [weather, setWeather] = useState(8);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        setError("");

        const [
          applicationsData,
          topicsData,
          progressData,
        ] = await Promise.all([
          getApplications(),
          getLearningTopics(),
          getLearningProgress(),
        ]);

        setApplications(applicationsData);
        setTopics(topicsData);
        setLearningProgress(progressData);
      } catch (err) {
        console.error("Dashboard loading error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const applicationCount = applications.length;
  const topicCount = topics.length;
  const sceneStyle = getSceneStyle(windowOpening, timeOfDay, weather);

  return (
    <div className="room-scene" style={sceneStyle}>
      <div className="room-vignette" />

      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main className="window-frame">
        <WindowVines />

        <div className="window-wood">
          <div className="window-inner">
            <WindowAtmosphere />

            <div className="window-header">
              <Topbar
                activePage={activePage}
                applicationCount={applicationCount}
                topicCount={topicCount}
              />
            </div>

            <div className="scene-controls-dock">
              <WindowControls
                opening={windowOpening}
                onOpeningChange={setWindowOpening}
                timeOfDay={timeOfDay}
                onTimeOfDayChange={setTimeOfDay}
                weather={weather}
                onWeatherChange={setWeather}
              />
            </div>

            <div className="window-content">
              {loading && (
                <div className="status-message">
                  Gathering your little victories...
                </div>
              )}

              {error && (
                <div className="error-message">
                  <strong>Couldn't reach your backend.</strong>
                  <p>{error}</p>
                </div>
              )}

              {!loading && !error && (
                <>
                  {activePage === "interviews" ? (
                    <section className="dashboard-section">
                      <div className="section-heading">
                        <div>
                          <span className="eyebrow">
                            CAREER TRACKER
                          </span>
                          <h3>Your applications</h3>
                        </div>
                        <span className="section-count">
                          {applicationCount} total
                        </span>
                      </div>

                      {applications.length === 0 ? (
                        <div className="empty-state">
                          <h4>Your next chapter starts here.</h4>
                          <p>
                            Your job applications will appear
                            here once you add your first one.
                          </p>
                        </div>
                      ) : (
                        <div className="data-list">
                          {applications.map((application) => (
                            <article
                              className="data-card"
                              key={application.id}
                            >
                              <div className="card-main">
                                <h4>{application.company_name}</h4>
                                <p>{application.job_role}</p>
                              </div>
                              <span className="status-pill">
                                {application.application_status}
                              </span>
                            </article>
                          ))}
                        </div>
                      )}
                    </section>
                  ) : (
                    <section className="dashboard-section">
                      <div className="section-heading">
                        <div>
                          <span className="eyebrow">
                            YOUR KNOWLEDGE GARDEN
                          </span>
                          <h3>Growing your skills</h3>
                        </div>
                        <span className="section-count">
                          {topicCount} topics
                        </span>
                      </div>

                      {topics.length === 0 ? (
                        <div className="empty-state">
                          <h4>A garden waiting to grow.</h4>
                          <p>
                            Add your first learning topic
                            to begin tracking your progress.
                          </p>
                        </div>
                      ) : (
                        <div className="data-list">
                          {topics.map((topic) => (
                            <article
                              className="data-card"
                              key={topic.id}
                            >
                              <div className="card-main">
                                <h4>{topic.title}</h4>
                                <p>
                                  {topic.category || "General"}
                                </p>
                              </div>
                              <span className="status-pill">
                                {topic.status}
                              </span>
                            </article>
                          ))}
                        </div>
                      )}
                    </section>
                  )}

                  <section className="dashboard-section progress-section">
                    <span className="eyebrow">YOUR PROGRESS</span>
                    <h3>A little further every day</h3>
                    <p className="muted-copy">
                      {learningProgress.length > 0
                        ? "Your learning progress summary is connected."
                        : "Your learning progress will grow as you complete milestones."}
                    </p>
                  </section>
                </>
              )}
            </div>

            <div className="window-sill">
              <PixelPlant variant="broad" className="sill-plant sill-plant-left" />
              <PixelPlant variant="trailing" className="sill-plant sill-plant-right" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
