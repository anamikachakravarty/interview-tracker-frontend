
function Topbar({ activePage, applicationCount, topicCount, children }) {
  const pageDetails = {
    interviews: {
      eyebrow: "YOUR CAREER JOURNEY",
      title: "Interview Corner",
      description: "Every conversation brings you one step closer.",
    },
    learnings: {
      eyebrow: "YOUR LEARNING JOURNEY",
      title: "The Learning Garden",
      description: "Plant a topic, nurture a skill, watch yourself grow.",
    },
  };

  const currentPage = pageDetails[activePage];

  return (
    <header className="topbar">
      <div className="page-heading">
        <span className="eyebrow">{currentPage.eyebrow}</span>
        <h2>{currentPage.title}</h2>
        <p>{currentPage.description}</p>
      </div>

      {children}

      <div className="topbar-actions">
        <div className="quick-stat">
          <span>✿</span>
          <div>
            <strong>
              {activePage === "interviews"
                ? applicationCount
                : topicCount}
            </strong>
            <small>
              {activePage === "interviews"
                ? "Applications"
                : "Learning topics"}
            </small>
          </div>
        </div>

        <button
          className="utility-button"
          title="Utilities"
          aria-label="Utilities"
        >
          ⚙
        </button>
      </div>
    </header>
  );
}

export default Topbar;
