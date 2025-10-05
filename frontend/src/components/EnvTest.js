
function EnvTest() {
  return (
    <div style={{ 
      padding: '20px',
      margin: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2>Environment Variables Test</h2>
      <pre style={{ 
        backgroundColor: '#eee', 
        padding: '10px', 
        borderRadius: '5px',
        overflowX: 'auto' 
      }}>
        {`
REACT_APP_AUTH0_DOMAIN: ${process.env.REACT_APP_AUTH0_DOMAIN || 'not set'}
REACT_APP_AUTH0_CLIENT_ID: ${process.env.REACT_APP_AUTH0_CLIENT_ID ? '(set but hidden for security)' : 'not set'}
REACT_APP_API_URL: ${process.env.REACT_APP_API_URL || 'not set'}
NODE_ENV: ${process.env.NODE_ENV || 'not set'}
        `}
      </pre>
    </div>
  );
}

export default EnvTest;