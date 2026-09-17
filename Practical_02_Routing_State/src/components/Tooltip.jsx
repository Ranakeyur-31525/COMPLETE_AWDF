import React from 'react';
import { HelpCircle, X, Info } from 'lucide-react';

function Tooltip({ isVisible, onClose }) {
  if (!isVisible) return null;

  return (
    <div className="tooltip-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <h4 style={{ color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Info size={18} /> How State Management Works
        </h4>
        <button 
          onClick={onClose} 
          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
          aria-label="Close Tooltip"
        >
          <X size={18} />
        </button>
      </div>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
        This box toggles visibility dynamically using a <code>useState</code> boolean variable. When you type in the form inputs below, another <code>useState</code> hook updates the component state on every keystroke, enabling real-time live previewing and character counting without reloading the page!
      </p>
    </div>
  );
}

export default Tooltip;
