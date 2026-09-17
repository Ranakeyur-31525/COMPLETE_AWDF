import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer({ toasts, onClose }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" role="region" aria-label="Notifications">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`toast ${isSuccess ? 'toast-success' : isError ? 'toast-error' : 'toast-info'}`}
          >
            {isSuccess && <CheckCircle2 size={18} color="var(--accent-emerald)" />}
            {isError && <AlertCircle size={18} color="var(--accent-rose)" />}
            {!isSuccess && !isError && <Info size={18} color="var(--accent-cyan)" />}
            
            <span style={{ flex: 1 }}>{toast.message}</span>

            <button
              onClick={() => onClose(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-dim)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label="Dismiss alert"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
