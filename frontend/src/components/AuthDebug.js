import { useEffect, useState } from 'react';

function AuthDebug() {
  const [apiStatus, setApiStatus] = useState('Checking...');
  
  useEffect(() => {
    // Test API connection
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5002'}/api/users`)
      .then(response => {
        if (response.ok) {
          return response.json().then(data => {
            setApiStatus(`Connected (${response.status} OK) - ${Array.isArray(data) ? data.length : 0} users found`);
          });
        } else {
          setApiStatus(`Error (${response.status} ${response.statusText})`);
        }
      })
      .catch(err => {
        setApiStatus(`Connection failed: ${err.message}`);
      });
  }, []);

  return (
    <div style={{ 
      padding: '20px',
      margin: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f5f5f5'
    }}>
      <h2>Authentication Diagnostics</h2>
      
      <h3>API Connection</h3>
      <div style={{
        backgroundColor: apiStatus.includes('Connected') ? '#e8f5e9' : '#ffebee',
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        Status: {apiStatus}
      </div>

      <h3>Browser Storage Check</h3>
      <div>
        <h4>Local Storage Keys:</h4>
        <pre style={{backgroundColor: '#eee', padding: '10px', borderRadius: '4px'}}>
          {Object.keys(localStorage).filter(key => key.includes('auth0')).join('\n') || 'No Auth0 items found'}
        </pre>
      </div>

      <h3>Environment</h3>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <tbody>
          <tr>
            <td style={{padding: '8px', borderBottom: '1px solid #ddd'}}><strong>API URL</strong></td>
            <td style={{padding: '8px', borderBottom: '1px solid #ddd'}}>{process.env.REACT_APP_API_URL || 'http://localhost:5002'}</td>
          </tr>
          <tr>
            <td style={{padding: '8px', borderBottom: '1px solid #ddd'}}><strong>Auth0 Domain</strong></td>
            <td style={{padding: '8px', borderBottom: '1px solid #ddd'}}>{process.env.REACT_APP_AUTH0_DOMAIN || 'Not set'}</td>
          </tr>
          <tr>
            <td style={{padding: '8px', borderBottom: '1px solid #ddd'}}><strong>Auth0 Client ID</strong></td>
            <td style={{padding: '8px', borderBottom: '1px solid #ddd'}}>{process.env.REACT_APP_AUTH0_CLIENT_ID ? 'Set (hidden)' : 'Not set'}</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Troubleshooting</h3>
      <ol style={{lineHeight: '1.5'}}>
        <li>Try clearing local storage and cache</li>
        <li>Verify Auth0 credentials in .env file</li>
        <li>Check browser console for errors</li>
      </ol>
      
      <button 
        onClick={() => {
          localStorage.clear();
          sessionStorage.clear();
          window.location.reload();
        }}
        style={{
          backgroundColor: '#f44336',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        Clear Storage & Reload
      </button>
    </div>
  );
}

export default AuthDebug;