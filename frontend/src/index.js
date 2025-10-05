import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

// Ensure we have the required configuration
if (!domain || !clientId) {
  console.warn('Auth0 configuration missing or incomplete. Authentication will not work properly.');
  console.warn('Please create a .env file in the frontend directory with your Auth0 credentials.');
  console.warn('You can use .env.example as a template.');
} else {
  // Validate domain format
  if (!domain.includes('.auth0.com')) {
    console.warn('WARNING: Auth0 domain may be incorrect. It should end with ".auth0.com"');
    console.warn('Current domain:', domain);
  }
}

// Log configuration for debugging (redacted for security)
console.log('Auth0 Configuration:', { 
  domain: domain ? `${domain.substring(0, 5)}...` : 'not set', 
  clientId: clientId ? `${clientId.substring(0, 5)}...` : 'not set', 
  redirectUri: window.location.origin,
  currentUrl: window.location.href 
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain || ''}
      clientId={clientId || ''}
      authorizationParams={{
        redirect_uri: window.location.origin,
        scope: 'openid profile email'
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
      onRedirectCallback={(appState) => {
        console.log('Auth0 Redirect Callback:', { appState, currentUrl: window.location.href });
        window.history.replaceState(
          {},
          document.title,
          appState?.returnTo || window.location.pathname
        );
      }}
      onError={(error) => {
        console.error('Auth0 Error:', error); // Debug log
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
reportWebVitals();
