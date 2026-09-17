import React from 'react';
import { Sparkles, ArrowRight, Mail, Code2, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

function Header({ name, role, themeColor = "#6366f1" }) {
  return (
    <header className="hero-section" style={{ borderTop: `3px solid ${themeColor}` }}>
      <div className="container">
        <div className="hero-badges">
          <span className="badge">
            <Sparkles size={14} /> Practical 2: Routing & State Management
          </span>
          <span className="badge" style={{ borderColor: themeColor, color: themeColor }}>
            CSPIT-IT 5th Semester
          </span>
        </div>

        <h1 className="hero-title">
          Hi, I'm <span className="gradient-text">{name}</span>
        </h1>
        
        <p className="hero-subtitle">
          {role} building responsive, scalable full-stack web applications with React, Express, and modern UI architectures.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/projects" className="btn btn-primary">
            View My Work <ArrowRight size={18} />
          </Link>
          <Link to="/contact" className="btn btn-secondary">
            Get In Touch
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
