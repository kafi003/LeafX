<<<<<<< HEAD
import { useCallback, useEffect, useState } from "react";
import './App.css';

function AuthControls() {
  // Only rendered when Auth0Provider is present
  const { loginWithRedirect, logout, isAuthenticated, user } =
    require("@auth0/auth0-react").useAuth0();

  const handleLogin = () => {
    const redirectUri = `${window.location.origin}/`;
    console.log("Auth login requested. redirect_uri=", redirectUri);
    console.log("Auth0 domain (env):", process.env.REACT_APP_AUTH0_DOMAIN);
    console.log("Auth0 client id (env):", process.env.REACT_APP_AUTH0_CLIENT_ID);
    // Explicitly pass redirect_uri to ensure the request uses the value we expect
    loginWithRedirect({ authorizationParams: { redirect_uri: redirectUri } }).catch((e) =>
      console.error("loginWithRedirect error:", e)
    );
  };

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={handleLogin}>Log In</button>
      ) : (
        <div>
          <h2>Welcome, {user?.name}</h2>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

function LoginHelp() {
  const callbackUrl = `${window.location.origin}/`;
  const copy = useCallback(() => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(callbackUrl);
      // eslint-disable-next-line no-alert
      alert(`Callback URL copied to clipboard:\n${callbackUrl}`);
    } else {
      // fallback
      // eslint-disable-next-line no-alert
      alert(`Please copy this callback URL:\n${callbackUrl}`);
    }
  }, [callbackUrl]);

  return (
    <div style={{ marginTop: 12 }}>
      <p>
        Auth0 is not configured. To enable login, create <code>frontend/.env.local</code> with:
      </p>
      <pre style={{ textAlign: "left", display: "inline-block", padding: 8, background: "#f3f3f3" }}>
        REACT_APP_AUTH0_DOMAIN=YOUR_DOMAIN
        <br />
        REACT_APP_AUTH0_CLIENT_ID=YOUR_CLIENT_ID
      </pre>
      <div style={{ marginTop: 8 }}>
        <button onClick={copy}>Copy callback URL ({callbackUrl})</button>
      </div>
    </div>
  );
}

function DebugAuthInfo() {
  // These are compiled in at build time by CRA (available as process.env)
  const domain = process.env.REACT_APP_AUTH0_DOMAIN || "(not set)";
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || "(not set)";
  const redirectUri = `${window.location.origin}/`;

  const copyRedirect = useCallback(() => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(redirectUri);
      // eslint-disable-next-line no-alert
      alert(`Redirect URI copied:\n${redirectUri}`);
    } else {
      // eslint-disable-next-line no-alert
      alert(`Please copy this redirect URI:\n${redirectUri}`);
    }
  }, [redirectUri]);

  return (
    <div style={{ marginTop: 16, textAlign: "left", display: "inline-block" }}>
      <h3>Auth debug info</h3>
      <div>Auth0 domain: <code>{domain}</code></div>
      <div>Auth0 client id: <code>{clientId}</code></div>
      <div>Redirect URI: <code>{redirectUri}</code></div>
      <div style={{ marginTop: 8 }}>
        <button onClick={copyRedirect}>Copy redirect URI</button>
      </div>
      <p style={{ color: "#666", marginTop: 8 }}>
        Add the exact Redirect URI above (including protocol and port) to your Auth0 Application's
        Allowed Callback URLs, then retry login.
      </p>
    </div>
  );
}

function LoginCard({ onLogin, authConfigured }) {
  return (
    <div className="login-viewport">
      <div className="login-card">
        <div className="bg-blobs">
          <div className="blob b1" />
          <div className="blob b2" />
          <div className="blob b3" />
        </div>
        <div className="login-left">
          <div className="brand-logo">LX</div>
          <div className="left-title">LeafX — Build Fast, Ship Faster</div>
          <div className="left-sub">A minimal, focused platform for prototype shipping and hackathon wins. Log in to continue to your workspace.</div>
          <div className="feature-list">
            <div className="feature-item"><div className="feature-dot" /> Instant prototypes</div>
            <div className="feature-item"><div className="feature-dot" /> Great defaults for demos</div>
            <div className="feature-item"><div className="feature-dot" /> Secure Auth powered by Auth0</div>
          </div>
        </div>
        <div className="login-right">
          <div>
            <div className="signin-title">Welcome back</div>
            <div className="signin-sub">Sign in to access your LeafX dashboard and demos.</div>
          </div>

          <div className="cta-wrap">
            <button
              className={`cta-btn ${!authConfigured ? 'secondary' : ''}`}
              onClick={onLogin}
              disabled={!authConfigured}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 2L12 22" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
                <path d="M5 11L12 4L19 11" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
              </svg>
              {authConfigured ? 'Log in to LeafX' : 'Auth not configured'}
            </button>
          </div>

          <div className="small-note">By continuing you agree to the LeafX demo terms. This is a developer preview.</div>
        </div>
      </div>
    </div>
  );
}

function App({ authEnabled = false }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/message")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setMessage(data.text))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMessage("Failed to load message from backend 😢");
      });
  }, []);

  return (
    <div>
      {authEnabled ? (
        <AuthControls />
      ) : (
        <>
          <LoginCard
            authConfigured={!!process.env.REACT_APP_AUTH0_DOMAIN && !!process.env.REACT_APP_AUTH0_CLIENT_ID}
            onLogin={() => {
              // If auth is configured, delegate to the AuthControls handler via loginWithRedirect
              if (process.env.REACT_APP_AUTH0_DOMAIN && process.env.REACT_APP_AUTH0_CLIENT_ID) {
                // Use the same method AuthControls uses (loginWithRedirect)
                // require the hook only when provider exists; this will be safe because index.js only wraps with provider when envs exist
                const { loginWithRedirect } = require('@auth0/auth0-react').useAuth0();
                const redirectUri = `${window.location.origin}/`;
                loginWithRedirect({ authorizationParams: { redirect_uri: redirectUri } }).catch((e) =>
                  console.error('loginWithRedirect error:', e)
                );
              } else {
                // Show helper so user can copy callback URL
                // eslint-disable-next-line no-alert
                alert('Auth0 is not configured. Please add REACT_APP_AUTH0_DOMAIN and REACT_APP_AUTH0_CLIENT_ID to frontend/.env.local');
              }
            }}
          />

          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <LoginHelp />
            <DebugAuthInfo />
          </div>
        </>
      )}

      <h1 style={{ textAlign: 'center', marginTop: 18 }}>{message || 'Loading...'}</h1>
    </div>
  );
=======
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import Dashboard from "./components/Dashboard";

function App() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

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
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return <Dashboard user={user} logout={logout} />;
>>>>>>> 75797b4 (Enhanced MongoDB Integration and API Testing)
}

export default App;
