import React from 'react';
import { Sparkles, Phone, Mail, MapPin, Download, FileText } from 'lucide-react';
import { resumeData } from '../data/resumeData';

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

function Header({ name, tagline, onViewResume }) {
  const info = resumeData.personalInfo;

  return (
    <header className="hero-section" id="hero">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <span className="badge">
            <Sparkles size={14} /> Practical 1: React Component Architecture
          </span>
          <span className="badge" style={{ borderColor: 'var(--accent-indigo)', color: 'var(--accent-indigo)', background: 'rgba(99, 102, 241, 0.12)' }}>
            Hardware & Embedded Systems Engineer
          </span>
        </div>

        <h1 className="hero-title">
          Hi, I'm <span className="gradient-text">{name || info.fullName}</span>
        </h1>

        <p className="hero-subtitle">
          {tagline || info.tagline}
        </p>

        {/* Hero Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <a 
            href="/resume.pdf" 
            download="Keyur_Rana_Resume.pdf" 
            className="btn btn-primary"
            style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}
          >
            <Download size={20} /> Download Resume PDF
          </a>
          <button 
            onClick={onViewResume} 
            className="btn btn-secondary"
            style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}
          >
            <FileText size={20} /> View Resume Only Mode
          </button>
        </div>

        <div className="contact-quick-bar">
          <a href={`tel:${info.phone}`} className="contact-quick-item">
            <Phone size={15} color="var(--accent-cyan)" /> {info.phone}
          </a>
          <a href={`mailto:${info.email}`} className="contact-quick-item">
            <Mail size={15} color="var(--accent-cyan)" /> {info.email}
          </a>
          <span className="contact-quick-item">
            <MapPin size={15} color="var(--accent-cyan)" /> {info.location}
          </span>
          <a href={info.github} target="_blank" rel="noreferrer" className="contact-quick-item">
            <GithubIcon /> GitHub ({info.githubUsername})
          </a>
          <a href={info.linkedin} target="_blank" rel="noreferrer" className="contact-quick-item">
            <LinkedinIcon /> LinkedIn
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;