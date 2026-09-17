import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

/**
 * LazyFallback with minimum-delay debounce (Supplementary Problem 2)
 * Avoids flickering loading state on ultra-fast networks by waiting 250ms
 * before rendering the spinner, and ensuring when displayed, it renders smoothly.
 */
export default function LazyFallback({ minDelay = 250, message = 'Loading chunk bundle...' }) {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true);
    }, minDelay);

    return () => clearTimeout(timer);
  }, [minDelay]);

  if (!showSpinner) {
    return <div style={{ height: 240 }} />; // Invisible placeholder to avoid layout shift
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 240,
        gap: 12,
        color: '#6366f1'
      }}
    >
      <Loader2
        size={36}
        style={{
          animation: 'spin 1s linear infinite'
        }}
      />
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: '#64748b' }}>{message}</p>
    </div>
  );
}
