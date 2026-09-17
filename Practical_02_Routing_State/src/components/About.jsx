import React from 'react';
import { UserCheck, GraduationCap, MapPin, BookOpen } from 'lucide-react';
import { studentInfo } from '../data/studentData';

function About() {
  return (
    <section className="about-section">
      <h2 className="section-title">
        <UserCheck size={24} /> About Me
      </h2>

      <div className="about-grid">
        <div className="glass-card about-card">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.4rem' }}>Developer Profile</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            {studentInfo.bio}
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            Currently mastering Advanced Web Development Frameworks (ITUE301), focusing on single page application architectures, reactive state management using React hooks, REST APIs, and modern CSS design systems.
          </p>
        </div>

        <div className="glass-card about-card">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <GraduationCap size={20} color="var(--accent-primary)" /> Quick Facts
          </h3>
          <div className="about-info-item">
            <span className="about-info-label">University</span>
            <span className="about-info-value">CHARUSAT</span>
          </div>
          <div className="about-info-item">
            <span className="about-info-label">Department</span>
            <span className="about-info-value">CSPIT - IT</span>
          </div>
          <div className="about-info-item">
            <span className="about-info-label">Semester</span>
            <span className="about-info-value">5th Sem</span>
          </div>
          <div className="about-info-item">
            <span className="about-info-label">Course</span>
            <span className="about-info-value">ITUE301</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
