
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/custom-animations.css'

// Wait for the DOM to be fully loaded before mounting React
const mountApp = () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    // Check if we already have a React root instance
    if (!rootElement.hasChildNodes()) {
      ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      );
    }
  }
};

// Try to mount immediately if DOM is already loaded
mountApp();

// Also ensure mounting when DOM content is fully loaded
document.addEventListener('DOMContentLoaded', mountApp);
