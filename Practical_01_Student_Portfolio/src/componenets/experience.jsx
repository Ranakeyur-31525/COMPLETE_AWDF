import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../data/resumeData';

function Experience() {
  const experiences = resumeData.experience;

  return (
    <section id="experience">
      <div className="container">
        <h2 className="section-title">
          <Briefcase size={26} color="var(--accent-cyan)" /> Work Experience
        </h2>
        <p className="section-subtitle">
          Hands-on internship background in embedded systems, IoT development, and Python programming
        </p>

        <div className="timeline">
          {experiences.map(exp => (
            <div key={exp.id} className="glass-card experience-card">
              <div className="exp-header">
                <div>
                  <h3 className="exp-role">{exp.role}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
                    <span className="exp-company">{exp.company}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <MapPin size={13} /> {exp.location}
                    </span>
                  </div>
                </div>
                <span className="exp-period">
                  <Calendar size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                  {exp.period}
                </span>
              </div>

              <ul className="exp-list">
                {exp.highlights.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
