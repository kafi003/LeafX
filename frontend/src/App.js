import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import AuthDebug from "./components/AuthDebug";
import Dashboard from "./components/Dashboard";
import EnvTest from "./components/EnvTest";

function App() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading, error } = useAuth0();

  // Handle Auth0 errors
  if (error) {
    return (
      <div style={{ 
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh",
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
      }}>
        <h1 style={{ color: "#d32f2f", marginBottom: "1rem" }}>Authentication Error</h1>
        <p style={{ fontSize: "16px", marginBottom: "1rem" }}>
          There was a problem with the Auth0 authentication:
        </p>
        <div style={{ 
          backgroundColor: "#ffebee", 
          padding: "1rem", 
          borderRadius: "4px", 
          color: "#c62828",
          fontFamily: "monospace",
          marginBottom: "2rem",
          width: "100%",
          overflow: "auto"
        }}>
          {error.message}
        </div>
        <h2>Troubleshooting steps:</h2>
        <ol style={{ textAlign: "left", lineHeight: "1.6" }}>
          <li>Check that your <code>.env</code> file has the correct Auth0 domain and client ID</li>
          <li>Ensure your Auth0 application settings have the correct callback URLs:
            <ul>
              <li>Allowed Callback URLs: {window.location.origin}</li>
              <li>Allowed Logout URLs: {window.location.origin}</li>
              <li>Allowed Web Origins: {window.location.origin}</li>
            </ul>
          </li>
          <li>Make sure your Auth0 application type is set to "Single Page Application"</li>
        </ol>
        <EnvTest />
        <AuthDebug />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ 
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh",
        fontSize: "18px",
        gap: "1rem"
      }}>
        <div>Loading LeafX...</div>
        <div style={{ fontSize: "14px", color: "#666" }}>
          Please wait...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="landing-page">
        <div className="hero-section">
          <div className="bg-blobs">
            <div className="blob b1" />
            <div className="blob b2" />
            <div className="blob b3" />
          </div>
          <div className="hero-content">
            <div className="brand-logo slide-in">LX</div>
            <h1 className="hero-title slide-in">Enterprise Solutions with LeafX</h1>
            <p className="hero-subtitle slide-in">
              Transform your business with our enterprise-grade platform. Built for scalability,
              security, and success.
            </p>
            <div className="hero-cta slide-in">
              <button className="cta-btn cta-primary" onClick={() => loginWithRedirect()}>
                🚀 Get Started Now
              </button>
              <a href="#features" className="cta-btn cta-secondary">
                Learn More
              </a>
            </div>
          </div>
        </div>

        <div className="features-section">
          <h2 className="section-title">Enterprise Features</h2>
          <div className="features-grid">
            <div className="feature-card slide-in">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Advanced Analytics</h3>
              <p className="feature-description">
                Get real-time insights with powerful data visualization tools and customizable dashboards.
              </p>
            </div>

            <div className="feature-card slide-in">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Enterprise Security</h3>
              <p className="feature-description">
                Industry-leading security with Auth0 integration, role-based access, and encryption.
              </p>
            </div>

            <div className="feature-card slide-in">
              <div className="feature-icon">⚡️</div>
              <h3 className="feature-title">High Performance</h3>
              <p className="feature-description">
                Built for scale with optimized performance and reliable infrastructure.
              </p>
            </div>

            <div className="feature-card slide-in">
              <div className="feature-icon">🤝</div>
              <h3 className="feature-title">Team Collaboration</h3>
              <p className="feature-description">
                Seamless team workflows with real-time updates and collaborative tools.
              </p>
            </div>

            <div className="feature-card slide-in">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Multi-Device Support</h3>
              <p className="feature-description">
                Access your dashboard from any device with responsive design.
              </p>
            </div>

            <div className="feature-card slide-in">
              <div className="feature-icon">🔄</div>
              <h3 className="feature-title">Automated Workflows</h3>
              <p className="feature-description">
                Streamline processes with customizable automation and integrations.
              </p>
            </div>
          </div>
        </div>

        <footer className="footer">
          <div className="login-card">
            <div className="login-right" style={{ width: "100%", maxWidth: "480px", margin: "0 auto" }}>
              <div>
                <div className="signin-title">Welcome to LeafX Enterprise</div>
                <div className="signin-sub">Sign in to access your enterprise dashboard and features.</div>
              </div>
              <div className="cta-wrap">
                <button className="cta-btn" onClick={() => loginWithRedirect()}>
                  Continue with Auth0
                </button>
              </div>
              <div style={{ marginTop: "40px", textAlign: "center" }}>
                <details style={{ display: "inline-block", textAlign: "left" }}>
                  <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
                    🔍 Authentication Diagnostics (click to expand)
                  </summary>
                  <EnvTest />
                  <AuthDebug />
                </details>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return <Dashboard user={user} logout={logout} />;
}

export default App;
