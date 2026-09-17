import React from 'react';
import { NavLink } from 'react-router-dom';
import { Code2, Home, FolderKanban, Mail, Sun, Moon } from 'lucide-react';

function NavBar({ darkMode, toggleTheme }) {
  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="container nav-flex">
        <NavLink to="/" className="brand-logo">
          <Code2 size={28} />
          <span>Ranak<span className="gradient-text">.Dev</span></span>
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Home size={18} />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/projects" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <FolderKanban size={18} />
              <span>Projects</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Mail size={18} />
              <span>Contact</span>
            </NavLink>
          </li>
          <li>
            <button 
              onClick={toggleTheme} 
              className="theme-toggle-btn"
              title="Toggle Light/Dark Theme"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
              <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
