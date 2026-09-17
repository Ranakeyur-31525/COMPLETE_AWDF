import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

function NotFound() {
  return (
    <div className="container not-found-container">
      <div className="glass-card" style={{ padding: '3.5rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
        <AlertTriangle size={64} color="var(--warning)" style={{ marginBottom: '1rem' }} />
        <div className="not-found-code">404</div>
        <h2 style={{ fontSize: '1.8rem', marginTop: '0.5rem' }}>Page Not Found</h2>
        <p className="not-found-msg">
          Oops! The route you are trying to access does not exist in this single page application.
        </p>
        <Link to="/" className="btn btn-primary">
          <Home size={18} /> Return to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
