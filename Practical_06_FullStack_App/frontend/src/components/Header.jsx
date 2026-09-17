import React from 'react';
import { CheckSquare, Plus, Sun, Moon, Database, Activity } from 'lucide-react';

export default function Header({ backendHealth, theme, onToggleTheme, onOpenCreateModal }) {
  const isOnline = backendHealth?.status === 'online';

  return (
    <header className="header-glass">
      <div className="header-brand">
        <div className="brand-icon">
          <CheckSquare size={28} />
        </div>
        <div>
          <h1 className="brand-title">Full Stack Task Flow</h1>
          <p className="brand-subtitle">
            Practical 6 • React + Express + MongoDB Integration • ITUE301
          </p>
        </div>
      </div>

      <div className="header-controls">
        <div className="status-pill" title={`Backend Server: ${isOnline ? 'Connected' : 'Offline'}`}>
          <span className={`status-dot ${isOnline ? 'online' : 'offline'}`}></span>
          <Database size={14} style={{ color: isOnline ? '#10b981' : '#ef4444' }} />
          <span>{isOnline ? 'Backend Connected' : 'Backend Disconnected'}</span>
        </div>

        <button
          className="btn-icon"
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="btn btn-primary" onClick={onOpenCreateModal}>
          <Plus size={18} />
          <span>New Task</span>
        </button>
      </div>
    </header>
  );
}
