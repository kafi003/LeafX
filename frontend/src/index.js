<<<<<<< HEAD
import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

// Read Auth0 config from environment variables for safety
const domain = process.env.REACT_APP_AUTH0_DOMAIN || ""; // e.g. 'dev-xxxxx.us.auth0.com'
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || "";

const root = ReactDOM.createRoot(document.getElementById('root'));

if (domain && clientId) {
  // Properly configured — wrap app with Auth0Provider
  root.render(
    <React.StrictMode>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{ redirect_uri: window.location.origin }}
      >
        <App authEnabled={true} />
      </Auth0Provider>
    </React.StrictMode>
  );
} else {
  // Avoid redirecting to an invalid placeholder domain which causes "This site can't be reached"
  console.warn(
    'Auth0 is not configured. To enable login set REACT_APP_AUTH0_DOMAIN and REACT_APP_AUTH0_CLIENT_ID in frontend/.env.local'
  );

  root.render(
    <React.StrictMode>
      <App authEnabled={false} />
    </React.StrictMode>
  );
}

=======
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
  console.error('Missing Auth0 configuration. Please check your .env file.');
}

console.log('Auth0 Configuration:', { 
  domain, 
  clientId, 
  redirectUri: window.location.origin,
  currentUrl: window.location.href 
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: 'http://localhost:3003',
        scope: 'openid profile email'
      }}
      cacheLocation="localstorage"
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

>>>>>>> 75797b4 (Enhanced MongoDB Integration and API Testing)
reportWebVitals();
