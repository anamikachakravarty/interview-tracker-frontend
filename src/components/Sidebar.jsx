
import PixelPlant from "./PixelPlant";

function Sidebar({ activePage, onNavigate }) {
  const navigationItems = [
    {
      id: "interviews",
      label: "Interviews",
      description: "Career & conversations",
    },
    {
      id: "learnings",
      label: "Learnings",
      description: "Skills & discoveries",
    },
  ];

  return (
    <aside className="room-sidebar">
      <div className="brand">
        <div className="brand-mark">✦</div>
        <div>
          <h1>Little Progress</h1>
          <span>YOUR GROWTH JOURNAL</span>
        </div>
      </div>

      <div className="sidebar-divider" />

      <p className="sidebar-label">YOUR LITTLE CORNER</p>

      <nav className="sidebar-nav">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${
              activePage === item.id ? "active" : ""
            }`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-plant-icon">
              {item.id === "interviews" ? "▤" : "✿"}
            </span>

            <span className="nav-copy">
              <strong>{item.label}</strong>
              <small>{item.description}</small>
            </span>
          </button>
        ))}
      </nav>

      <div className="sidebar-garden">
        <PixelPlant variant="fern" className="sidebar-plant plant-small" />
        <PixelPlant variant="broad" className="sidebar-plant plant-large" />
        <PixelPlant variant="flower" className="sidebar-plant plant-small plant-third" />
      </div>

      <div className="sidebar-note">
        <span>☾</span>
        <p>
          Take a breath.
          <br />
          You're growing.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
