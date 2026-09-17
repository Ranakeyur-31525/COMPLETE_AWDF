import React from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';

function ErrorMessage({ message = "Failed to load repository data.", onRetry }) {
  return (
    <div className="error-container" role="alert">
      <h3 className="error-title">
        <AlertOctagon size={28} /> API Request Error
      </h3>
      <p className="error-desc">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-danger">
          <RotateCcw size={16} /> Retry Fetch Request
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
