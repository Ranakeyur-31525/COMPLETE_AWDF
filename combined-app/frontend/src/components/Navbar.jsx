import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Layers, 
  User, 
  ToggleLeft, 
  Github, 
  Server, 
  Database, 
  LayoutGrid, 
  Sun, 
  Moon, 
  Activity 
} from 'lucide-react';
import { getSystemHealth } from '../services/api';

export default function Navbar({ theme, onToggleTheme }) {
  const [serverOnline, setServerOnline] = useState(false);
  const [dbConnected, setDbConnected] = useState(false);

  useEffect(() => {
    async function checkHealth() {
      const data = await getSystemHealth();
      if (data && data.status === 'online') {
        setServerOnline(true);
        setDbConnected(data.database?.status === 'Connected');
      } else {
        setServerOnline(false);
        setDbConnected(false);
      }
    }
    checkHealth();
    const interval = setInterval(checkHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { to: '/', label: 'Overview', icon: LayoutGrid },
    { to: '/p1', label: 'P1: Portfolio', icon: User },
    { to: '/p2', label: 'P2: Routing', icon: ToggleLeft },
    { to: '/p3', label: 'P3: GitHub API', icon: Github },
    { to: '/p4', label: 'P4: Express API', icon: Server },
    { to: '/p5', label: 'P5: MongoDB', icon: Database },
    { to: '/p6', label: 'P6: Full-Stack', icon: Layers }
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="nav-brand">
          <div className="brand-badge">
            <Layers size={18} />
          </div>
          <div>
            <span className="brand-text">AWDF</span>
            <span className="brand-sub">Master Portal</span>
          </div>
        </NavLink>

        <nav className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="nav-actions">
          {/* Live Server / MongoDB status pill */}
          <div 
            className="status-pill" 
            title={serverOnline ? `Backend Online | MongoDB: ${dbConnected ? 'Connected' : 'Connecting'}` : 'Backend Offline'}
            style={serverOnline ? {} : { background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent-rose)', borderColor: 'rgba(244, 63, 94, 0.3)' }}
          >
            <span 
              className="status-dot" 
              style={serverOnline ? {} : { background: 'var(--accent-rose)', boxShadow: '0 0 8px var(--accent-rose)' }}
            />
            <span>{serverOnline ? (dbConnected ? 'Live & DB Ready' : 'Backend Ready') : 'Offline'}</span>
          </div>

          {/* Theme Toggle */}
          <button 
            className="theme-btn" 
            onClick={onToggleTheme} 
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
          </button>
        </div>
      </div>
    </header>
  );
}
