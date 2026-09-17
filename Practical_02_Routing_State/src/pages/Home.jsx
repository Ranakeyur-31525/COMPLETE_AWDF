import React from 'react';
import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';
import { studentInfo } from '../data/studentData';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  const featuredProjects = studentInfo.projects.filter(p => p.featured);

  return (
    <div className="home-page">
      <Header 
        name={studentInfo.name} 
        role={studentInfo.role} 
        themeColor="#6366f1"
      />

      <div className="container">
        <About />

        <Skills skillList={studentInfo.skills} />

        <section style={{ marginTop: '3rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 className="section-title" style={{ margin: 0 }}>
              <Star size={24} color="#f59e0b" /> Featured Projects
            </h2>
            <Link to="/projects" className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
              View All ({studentInfo.projects.length}) <ArrowRight size={16} />
            </Link>
          </div>

          <div className="projects-grid">
            {featuredProjects.map(project => (
              <div key={project.id} className="glass-card project-card">
                <div>
                  <span className="badge" style={{ marginBottom: '0.75rem' }}>{project.category}</span>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{project.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="project-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
