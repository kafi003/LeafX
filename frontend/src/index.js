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

reportWebVitals();
