import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts = [], onRemove }) {
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        onRemove(toasts[0].id);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toasts, onRemove]);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        return (
          <div key={toast.id} className={`toast ${toast.type || 'info'}`}>
            {isSuccess && <CheckCircle2 size={20} color="#10b981" />}
            {isError && <AlertCircle size={20} color="#ef4444" />}
            {!isSuccess && !isError && <Info size={20} color="#6366f1" />}
            <span style={{ fontSize: '0.9rem', fontWeight: 500, flex: 1 }}>{toast.message}</span>
            <button
              className="action-btn"
              onClick={() => onRemove(toast.id)}
              style={{ width: 24, height: 24, border: 'none', background: 'transparent' }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
