import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-container">
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
        <AlertTriangle size={28} />
      </div>
      <div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', color: '#ef4444' }}>API Connection Error</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: 460 }}>
          {message || 'Unable to connect to the backend server. Please verify Express is running on port 5000 and MongoDB is active.'}
        </p>
      </div>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry} style={{ marginTop: '0.5rem' }}>
          <RefreshCw size={16} /> Retry Connection
        </button>
      )}
    </div>
  );
}
