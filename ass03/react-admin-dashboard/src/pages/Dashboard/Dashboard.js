import React from "react";
import "./Dashboard.css"; // Create this file for styles if you want

const Dashboard = () => {
  return (
    <div className="dashboard-container" style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          background: "#111827",
          color: "#fff",
          padding: "1rem",
        }}
      >
        <h2>Admin</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><a href="/" style={{ color: "#fff", textDecoration: "none" }}>Dashboard</a></li>
            <li><a href="/charts" style={{ color: "#fff", textDecoration: "none" }}>Charts</a></li>
            <li><a href="/kanban" style={{ color: "#fff", textDecoration: "none" }}>Kanban</a></li>
            <li><a href="/calendar" style={{ color: "#fff", textDecoration: "none" }}>Calendar</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem" }}>
        <h1>Dashboard Page</h1>
        <p>Welcome to your admin dashboard!</p>

        <div style={{ marginTop: "2rem" }}>
          <h3>Stats Summary</h3>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ padding: "1rem", background: "#f3f4f6", borderRadius: "8px" }}>📈 Users: 120</div>
            <div style={{ padding: "1rem", background: "#f3f4f6", borderRadius: "8px" }}>💼 Projects: 12</div>
            <div style={{ padding: "1rem", background: "#f3f4f6", borderRadius: "8px" }}>⏳ Tasks: 87</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
