import React, { useState } from 'react';
import { FolderKanban, Filter } from 'lucide-react';
import { studentInfo } from '../data/studentData';

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'React', 'React Router', 'Backend'];

  const filteredProjects = activeCategory === 'All' 
    ? studentInfo.projects 
    : studentInfo.projects.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="container">
      <div className="projects-header">
        <h1 className="section-title" style={{ fontSize: '2.5rem' }}>
          <FolderKanban size={32} /> My Projects & Portfolio
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Demonstrating modular React architecture, stateful components, routing, and REST services.
        </p>

        {/* Filter bar using useState */}
        <div className="filter-bar">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem' }}>
            <Filter size={16} /> Filter by:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.map(project => (
          <div key={project.id} className="glass-card project-card">
            <div>
              <span className="badge" style={{ marginBottom: '0.75rem' }}>{project.category}</span>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{project.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1rem' }}>
                {project.description}
              </p>
              <div className="project-tags">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ flex: 1, padding: '0.5rem' }}>
                <GithubIcon /> Repository
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
