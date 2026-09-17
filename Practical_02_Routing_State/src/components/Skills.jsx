import React from 'react';
import { Cpu, CheckCircle2 } from 'lucide-react';

function Skills({ skillList = [] }) {
  return (
    <section className="glass-card skills-container">
      <h2 className="section-title">
        <Cpu size={24} /> Technical Skills & Tools
      </h2>
      <p style={{ color: 'var(--text-secondary)' }}>
        Rendered dynamically via props array passed from parent component:
      </p>

      <ul className="skills-list">
        {skillList.map((skill, index) => {
          const skillName = typeof skill === 'string' ? skill : skill.name;
          const category = typeof skill === 'object' ? skill.category : null;
          
          return (
            <li key={index} className="skill-item">
              <CheckCircle2 size={16} color="var(--accent-primary)" />
              <span>{skillName}</span>
              {category && (
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.25rem' }}>
                  ({category})
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Skills;
