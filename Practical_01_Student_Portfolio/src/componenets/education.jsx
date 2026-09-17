import React from 'react';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import { resumeData } from '../data/resumeData';

function Education() {
  const educationList = resumeData.education;

  return (
    <section id="education">
      <div className="container">
        <h2 className="section-title">
          <GraduationCap size={26} color="var(--accent-emerald)" /> Education
        </h2>
        <p className="section-subtitle">
          Academic background and achievements
        </p>

        <div className="education-grid">
          {educationList.map(edu => (
            <div key={edu.id} className="glass-card education-card">
              <h3 className="edu-degree">{edu.degree}</h3>
              <p className="edu-school">{edu.institution}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--border-color)' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Calendar size={13} /> {edu.period}
                </span>
                <span className="edu-score">{edu.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
