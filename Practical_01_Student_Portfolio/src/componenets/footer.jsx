import React from 'react';
import { resumeData } from '../data/resumeData';

function Footer() {
  const info = resumeData.personalInfo;

  return (
    <footer className="footer">
      <div className="container">
        <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
          &copy; {new Date().getFullYear()} {info.fullName}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.35rem' }}>
          ITUE301: Advanced Web Development Frameworks — Practical 1: Introduction to React & Component Architecture
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
          <a href={info.github} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontWeight: 600 }}>
            GitHub ({info.githubUsername})
          </a>
          <a href={info.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontWeight: 600 }}>
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;