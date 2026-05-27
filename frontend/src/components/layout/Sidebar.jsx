const navItems = [
  {
    section: "Tapal Management",
    items: [
      { key: "new", label: "New Tapals", icon: "📥" },
      { key: "assigned", label: "Assigned Tapals", icon: "📋" },
      { key: "completed", label: "Completed Tapals", icon: "✅" },
    ],
  },
  {
    section: "Tools",
    items: [
      { key: "view", label: "Tapal View", icon: "🔍" },
      { key: "search", label: "Tapal Search", icon: "🔎" },
    ],
  },
];

export default function Sidebar({ active, setActive, counts }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">C</div>
        <div>
          <h2>CSRC</h2>
          <p>Tapal System</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ section, items }) => (
          <div className="sidebar-section" key={section}>
            <p className="sidebar-section-label">{section}</p>

            {items.map(({ key, label, icon }) => (
              <button
                key={key}
                className={`sidebar-item ${active === key ? "active" : ""}`}
                onClick={() => setActive(key)}
              >
                <span className="sidebar-icon">{icon}</span>
                <span className="sidebar-text">{label}</span>

                {counts?.[key] > 0 && (
                  <span className="sidebar-badge">{counts[key]}</span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>Total Tapals</p>
        <strong>{counts?.total || 0}</strong>
      </div>
    </aside>
  );
}