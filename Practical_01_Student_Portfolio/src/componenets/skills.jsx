import React from 'react';
import { Cpu, Code2, Wrench, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../data/resumeData';

function Skills({ skillList = [] }) {
  const categorized = resumeData.skills;

  return (
    <section id="skills">
      <div className="container">
        <h2 className="section-title">
          <Cpu size={26} color="var(--accent-cyan)" /> Skills & Expertise
        </h2>
        <p className="section-subtitle">
          Core technical competencies across hardware, embedded software, and full-stack development
        </p>

        <div className="glass-card skills-container">
          {/* Categorized Skills Section */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            
            <div>
              <h3 className="skills-category-title">
                <Code2 size={18} /> Languages & Domains
              </h3>
              <ul className="skills-list">
                {categorized.languagesAndDomains.map((skill, index) => (
                  <li key={index} className="skill-pill">
                    <CheckCircle2 size={14} color="var(--accent-cyan)" /> {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="skills-category-title" style={{ color: 'var(--accent-indigo)' }}>
                <Cpu size={18} /> Hardware & Sensors
              </h3>
              <ul className="skills-list">
                {categorized.hardwareAndSensors.map((skill, index) => (
                  <li key={index} className="skill-pill" style={{ borderColor: 'rgba(99, 102, 241, 0.3)' }}>
                    <CheckCircle2 size={14} color="var(--accent-indigo)" /> {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="skills-category-title" style={{ color: 'var(--accent-purple)' }}>
                <Wrench size={18} /> Tools & Platforms
              </h3>
              <ul className="skills-list">
                {categorized.toolsAndPlatforms.map((skill, index) => (
                  <li key={index} className="skill-pill" style={{ borderColor: 'rgba(168, 85, 247, 0.3)' }}>
                    <CheckCircle2 size={14} color="var(--accent-purple)" /> {skill}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Dynamic Prop List rendering requirement from Practical 1 */}
          {skillList && skillList.length > 0 && (
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                All Technical Skills (Passed via Props):
              </h4>
              <div className="skills-list">
                {skillList.map((skill, idx) => (
                  <span key={idx} className="badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Skills;