import React from 'react';

export default function Spinner({ message = 'Loading tasks from MongoDB...' }) {
  return (
    <div className="spinner-container">
      <div className="spinner-glow"></div>
      <p style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.95rem' }}>{message}</p>
    </div>
  );
}
