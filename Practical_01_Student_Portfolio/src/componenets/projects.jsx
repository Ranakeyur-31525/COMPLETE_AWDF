import React from 'react';
import { Rocket, Cpu, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../data/resumeData';

function Projects() {
  const projects = resumeData.projects;

  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title">
          <Rocket size={26} color="var(--accent-cyan)" /> Featured Projects
        </h2>
        <p className="section-subtitle">
          Autonomous robotics systems, IoT hardware prototypes, and full-stack control dashboards
        </p>

        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="glass-card project-card">
              <div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                  {project.title}
                </h3>

                <div className="project-tags">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="project-tag">{tech}</span>
                  ))}
                </div>

                <ul style={{ listStyleType: 'disc', paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                  {project.highlights.map((point, idx) => (
                    <li key={idx} style={{ marginBottom: '0.5rem' }}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
