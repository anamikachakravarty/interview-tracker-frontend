
import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import PixelPlant from "./components/PixelPlant";
import WindowVines from "./components/WindowVines";

import {
  getApplications,
  getLearningTopics,
  getLearningProgress,
} from "./services/api";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("interviews");

  const [applications, setApplications] = useState([]);
  const [topics, setTopics] = useState([]);
  const [learningProgress, setLearningProgress] = useState([]);
  const [weatherMode, setWeatherMode] = useState("cloudy");
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

  return (
    <div className="room-scene">
      <div className="room-vignette" />

      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <section className="welcome-banner">
        <div>
          <span className="welcome-eyebrow">
            YOUR LITTLE CORNER OF THE WORLD
          </span>

          <h3>
            One step at a time.
            <br />
            <span>You've got this.</span>
          </h3>

          <p>
            Keep track of where you've been
            and where you're headed.
          </p>
        </div>
      </section>

      <main className="window-frame">
        <WindowVines />
        <div className="window-wood">
          <div className={`window-inner weather-${weatherMode}`}>
            <div className="window-header">
              <Topbar
                activePage={activePage}
                applicationCount={applicationCount}
                topicCount={topicCount}
              />
            </div>

            <div className="window-content">
              <div className="window-weather">
                <div className="weather-description">
                  <span className="weather-icon" aria-hidden="true">
                    {weatherMode === "sunlit" ? "☀" : weatherMode === "dusk" ? "☾" : "☁"}
                  </span>
                  <span className="weather-text">
                    {weatherMode === "sunlit"
                      ? "A warm little patch of sunshine"
                      : weatherMode === "dusk"
                        ? "Evening light, gentle progress"
                        : "A little rain, a lot of growth"}
                  </span>
                  <span className="weather-sparkle" aria-hidden="true"></span>
                </div>

                <div className="weather-controls" role="group" aria-label="Weather and window lighting">
                  {[
                    { mode: "cloudy", label: "Cloudy" },
                    { mode: "sunlit", label: "Sunlit day" },
                    { mode: "dusk", label: "Dusk" },
                  ].map(({ mode, label }) => (
                    <button
                      key={mode}
                      type="button"
                      className={weatherMode === mode ? "selected" : ""}
                      onClick={() => setWeatherMode(mode)}
                      aria-pressed={weatherMode === mode}
                    >
                      {label}
                    </button>
                  ))}

                </div>
              </div>

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
              <div className="sill-decoration">✿</div>
              <PixelPlant variant="trailing" className="sill-plant sill-plant-right" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );

}

export default App;
