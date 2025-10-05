import Analytics from './Analytics';
import EnterpriseNavigation from './EnterpriseNavigation';

const Dashboard = ({ user, logout }) => {
  return (
    <div className="app">
      <div className="dashboard">
        <aside className="sidebar">
          <div className="sidebar-logo">LeafX</div>
          <nav className="nav-items">
            <a href="#dashboard" className="nav-item active">
              <span>📊</span> Dashboard
            </a>
            <a href="#analytics" className="nav-item">
              <span>📈</span> Analytics
            </a>
            <a href="#projects" className="nav-item">
              <span>📁</span> Projects
            </a>
            <a href="#settings" className="nav-item">
              <span>⚙️</span> Settings
            </a>
          </nav>
        </aside>

        <div className="dashboard-main">
          <EnterpriseNavigation user={user} logout={logout} />

          <div className="dashboard-grid">
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-title">Total Projects</div>
              <div className="stat-value">24</div>
              <div className="stat-change positive">
                <span>↑</span> 12% increase
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⚡️</div>
              <div className="stat-title">Active Tasks</div>
              <div className="stat-value">156</div>
              <div className="stat-change positive">
                <span>↑</span> 8% increase
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-title">Completed</div>
              <div className="stat-value">89%</div>
              <div className="stat-change positive">
                <span>↑</span> 5% increase
              </div>
            </div>
          </div>

          <div className="enterprise-nav">
            <a href="#overview" className="nav-tab active">Overview</a>
            <a href="#performance" className="nav-tab">Performance</a>
            <a href="#tasks" className="nav-tab">Tasks</a>
            <a href="#reports" className="nav-tab">Reports</a>
          </div>

          <Analytics />

          <footer className="footer">
            Made with ❤️ by <span className="credits">Dipto, Kafi & Anmol</span>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;