import React from 'react';
import { UserCheck, GraduationCap, Cpu, Layers } from 'lucide-react';
import { resumeData } from '../data/resumeData';

function About() {
  const info = resumeData.personalInfo;

  return (
    <section id="about">
      <div className="container">
        <h2 className="section-title">
          <UserCheck size={26} color="var(--accent-cyan)" /> About Me
        </h2>
        <p className="section-subtitle">
          Professional summary and engineering focus
        </p>

        <div className="about-grid">
          <div className="glass-card about-card">
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Professional Summary
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
              {info.summary}
            </p>
          </div>

          <div className="glass-card about-card">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <GraduationCap size={20} color="var(--accent-cyan)" /> Academic Quick Facts
            </h3>
            <div className="info-row">
              <span className="info-label">Degree</span>
              <span className="info-value">B.Tech Computer Eng.</span>
            </div>
            <div className="info-row">
              <span className="info-label">University</span>
              <span className="info-value">CHARUSAT</span>
            </div>
            <div className="info-row">
              <span className="info-label">Diploma</span>
              <span className="info-value">GP Kheda (7.91 CPI)</span>
            </div>
            <div className="info-row">
              <span className="info-label">Focus</span>
              <span className="info-value">IoT & Embedded Systems</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;