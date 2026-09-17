import React from 'react';
import { NavLink } from 'react-router-dom';
import { FolderGit2, BookOpen, Code2 } from 'lucide-react';

function NavBar() {
  return (
    <nav className="navbar" role="navigation">
      <div className="container nav-flex">
        <NavLink to="/" className="brand-logo">
          <FolderGit2 size={26} color="var(--accent-primary)" />
          <span>GitHub<span style={{ color: 'var(--accent-purple)' }}>API</span> Explorer</span>
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Code2 size={16} /> Repositories
            </NavLink>
          </li>
          <li>
            <NavLink to="/about-api" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <BookOpen size={16} /> API Concepts
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
