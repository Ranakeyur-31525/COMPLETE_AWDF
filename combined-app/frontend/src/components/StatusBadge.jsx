import React from 'react';

export default function StatusBadge({ type, value, label }) {
  const normalized = (value || label || '').toString().toLowerCase();

  let badgeClass = 'badge-indigo';
  if (['high', 'danger', '404', '500', 'error'].includes(normalized)) {
    badgeClass = 'badge-high';
  } else if (['medium', 'warning', 'pending'].includes(normalized)) {
    badgeClass = 'badge-medium';
  } else if (['low', 'success', '200', '201', 'completed', 'true'].includes(normalized)) {
    badgeClass = 'badge-low';
  } else if (['info', 'react', 'vite'].includes(normalized)) {
    badgeClass = 'badge-cyan';
  }

  return (
    <span className={`badge ${badgeClass}`}>
      {label || value}
    </span>
  );
}
