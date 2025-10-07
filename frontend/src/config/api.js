// API Configuration for LeafX
const API_CONFIG = {
  // For GitHub Pages deployment, we'll use a fallback message since backend won't be available
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://leafx-backend.vercel.app' // Fallback backend URL if deployed separately
    : 'http://localhost:5001',
  
  // GitHub Pages is static hosting, so we'll show demo mode
  IS_GITHUB_PAGES: process.env.PUBLIC_URL === '/LeafX',
  
  // Demo mode responses for GitHub Pages
  DEMO_MODE: process.env.PUBLIC_URL === '/LeafX'
};

export default API_CONFIG;