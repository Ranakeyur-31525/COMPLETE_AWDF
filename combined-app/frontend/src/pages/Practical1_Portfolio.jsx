import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Github, 
  Linkedin, 
  Download, 
  ExternalLink, 
  Code, 
  GraduationCap, 
  Briefcase, 
  CheckCircle,
  Sparkles,
  Award
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';

export default function Practical1_Portfolio({ onToast }) {
  const [activeTab, setActiveTab] = useState('skills');

  const skills = [
    { name: 'React & React Router', level: 90, category: 'Frontend', color: 'var(--accent-primary)' },
    { name: 'JavaScript (ES6+) / TypeScript', level: 88, category: 'Frontend', color: 'var(--accent-amber)' },
    { name: 'Node.js & Express.js', level: 85, category: 'Backend', color: 'var(--accent-emerald)' },
    { name: 'MongoDB & Mongoose ODM', level: 82, category: 'Database', color: 'var(--accent-emerald)' },
    { name: 'RESTful API Architecture', level: 88, category: 'Backend', color: 'var(--accent-cyan)' },
    { name: 'HTML5, CSS3 & Glassmorphism', level: 92, category: 'Frontend', color: 'var(--accent-rose)' },
    { name: 'Git & GitHub Version Control', level: 85, category: 'Tools', color: 'var(--accent-primary)' },
    { name: 'Python & Data Structures', level: 80, category: 'Languages', color: 'var(--accent-cyan)' }
  ];

  const projects = [
    {
      title: 'Full-Stack Task Manager (Practical 6)',
      desc: 'MERN stack decoupled task orchestration portal with real-time optimistic updates and MongoDB persistence.',
      tags: ['React', 'Node.js', 'Express', 'MongoDB'],
      link: '/p6'
    },
    {
      title: 'GitHub User & Repo Explorer (Practical 3)',
      desc: 'Live GitHub REST API v3 consumer with instant dynamic search, star counts, and error simulation tests.',
      tags: ['React', 'GitHub API', 'Async/Await'],
      link: '/p3'
    },
    {
      title: 'Task Management REST API (Practical 4 & 5)',
      desc: 'Production-ready Express server with custom logging, schema validation, and Mongoose pre-save hooks.',
      tags: ['Express', 'Mongoose', 'Middleware'],
      link: '/p5'
    }
  ];

  const handleDownloadResume = () => {
    onToast('Resume downloaded successfully!', 'success');
  };

  return (
    <div>
      {/* Header Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
              PRACTICAL 01
            </span>
            <StatusBadge label="Student Portfolio SPA" />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Student Developer Portfolio
          </h1>
        </div>

        <button className="btn btn-primary" onClick={handleDownloadResume}>
          <Download size={16} />
          <span>Download Resume</span>
        </button>
      </div>

      {/* Hero Profile Card */}
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{
            width: 110,
            height: 110,
            borderRadius: 'var(--radius-xl)',
            background: 'var(--gradient-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '2.5rem',
            fontWeight: 800,
            boxShadow: 'var(--glow-indigo)'
          }}>
            R
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Ranak (Keyur)</h2>
              <StatusBadge label="5th Semester IT" />
              <StatusBadge label="CHARUSAT CSPIT" />
            </div>

            <p style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
              Aspiring Full Stack Web Developer & Software Engineer
            </p>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '720px', lineHeight: 1.6 }}>
              Student at Charotar University of Science and Technology (CHARUSAT), specializing in modern web frameworks (React, Express, Node.js, MongoDB). Passionate about crafting high-performance, aesthetically pleasing digital experiences.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <a href="mailto:ranak@example.com" className="btn btn-secondary btn-sm">
                <Mail size={14} />
                <span>Contact Email</span>
              </a>
              <a href="https://github.com/Ranakeyur-31525" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
                <Github size={14} />
                <span>GitHub Profile</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
                <Linkedin size={14} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
        <button
          className={`btn ${activeTab === 'skills' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setActiveTab('skills')}
        >
          <Code size={15} />
          <span>Technical Skills</span>
        </button>
        <button
          className={`btn ${activeTab === 'projects' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setActiveTab('projects')}
        >
          <Sparkles size={15} />
          <span>Featured Projects</span>
        </button>
        <button
          className={`btn ${activeTab === 'education' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => setActiveTab('education')}
        >
          <GraduationCap size={15} />
          <span>Education & Academics</span>
        </button>
      </div>

      {/* Tab: Skills */}
      {activeTab === 'skills' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {skills.map((skill) => (
            <div key={skill.name} className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.925rem' }}>{skill.name}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>{skill.level}%</span>
              </div>
              <div style={{
                height: 8,
                borderRadius: 4,
                background: 'var(--bg-tertiary)',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${skill.level}%`,
                  height: '100%',
                  background: skill.color,
                  borderRadius: 4,
                  transition: 'width 1s ease'
                }} />
              </div>
              <span style={{ fontSize: '0.725rem', color: 'var(--text-dim)', marginTop: '0.5rem', display: 'inline-block' }}>
                Category: {skill.category}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Projects */}
      {activeTab === 'projects' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {projects.map((proj) => (
            <div key={proj.title} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>{proj.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem', flex: 1, lineHeight: 1.5 }}>
                {proj.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                {proj.tags.map((tag) => (
                  <span key={tag} style={{
                    fontSize: '0.725rem',
                    background: 'var(--bg-tertiary)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-dim)'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Education */}
      {activeTab === 'education' && (
        <div className="glass-card">
          <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-tertiary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)',
              border: '1px solid var(--border-subtle)'
            }}>
              <GraduationCap size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                B.Tech in Information Technology
              </h3>
              <p style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 600 }}>
                Charotar University of Science and Technology (CHARUSAT) — CSPIT
              </p>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                2022 – 2026 • Current Semester: 5th Semester
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.75rem', lineHeight: 1.5 }}>
                Key coursework: Advanced Web Development Frameworks (ITUE301), Database Management Systems, Data Structures & Algorithms, Software Engineering, Object-Oriented Programming.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
