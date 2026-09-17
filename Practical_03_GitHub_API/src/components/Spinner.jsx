import React from 'react';

function Spinner({ message = "Fetching repositories from GitHub API..." }) {
  return (
    <div className="spinner-container" role="status">
      <div className="spinner-ring"></div>
      <p className="spinner-text">{message}</p>
    </div>
  );
}

export default Spinner;
