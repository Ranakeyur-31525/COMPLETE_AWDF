import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  ToggleLeft, 
  Github, 
  Server, 
  Database, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  Code2, 
  Sparkles,
  Cpu,
  Globe,
  Lock,
  Zap,
  Activity,
  Box,
  GitBranch,
  Bot
} from 'lucide-react';
import { getSystemHealth, getP6Stats } from '../services/api';
import StatusBadge from '../components/StatusBadge';

export default function Dashboard() {
  const [health, setHealth] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [healthData, statsData] = await Promise.all([getSystemHealth(), getP6Stats()]);
      setHealth(healthData);
      setStats(statsData);
      setLoading(false);
    }
    loadData();
  }, []);

  const practicals = [
    {
      id: 'p1',
      number: '01',
      title: 'Student Portfolio SPA',
      desc: 'Responsive developer portfolio built with React components, custom layout, skill proficiency bars, and downloadable resume.',
      icon: User,
      tech: ['React 18', 'Vite', 'Components', 'CSS3'],
      route: '/p1',
      badge: 'Frontend'
    },
    {
      id: 'p2',
      number: '02',
      title: 'State Management & Routing',
      desc: 'Multi-page client-side routing with React Router v6, dynamic character counters, controlled contact forms, and category filtering.',
      icon: ToggleLeft,
      tech: ['React Router v6', 'useState', 'Controlled Form', 'Theme Toggle'],
      route: '/p2',
      badge: 'Frontend SPA'
    },
    {
      id: 'p3',
      number: '03',
      title: 'GitHub REST API Integration',
      desc: 'Asynchronous data fetching with useEffect & Fetch API, search filter, loading spinners, and an interactive error simulator with retry mechanism.',
      icon: Github,
      tech: ['GitHub API v3', 'useEffect', 'Async/Await', 'Error Handling'],
      route: '/p3',
      badge: 'REST Client'
    },
    {
      id: 'p4',
      number: '04',
      title: 'Node.js & Express RESTful API',
      desc: 'In-memory CRUD REST endpoints with request logger middleware, Content-Type validation, numeric ID verification, and centralized error handling.',
      icon: Server,
      tech: ['Node.js', 'Express', 'Custom Middleware', 'In-Memory Store'],
      route: '/p4',
      badge: 'Backend API'
    },
    {
      id: 'p5',
      number: '05',
      title: 'MongoDB & Mongoose Schema Design',
      desc: 'Connection to local MongoDB taskdb, Mongoose schema with data types, pre-save title-trimming hook, enum validation, and database operations.',
      icon: Database,
      tech: ['MongoDB', 'Mongoose ODM', 'Pre-Save Hooks', 'Schema Validation'],
      route: '/p5',
      badge: 'Database ODM'
    },
    {
      id: 'p6',
      number: '06',
      title: 'Integrated Full Stack Task Manager',
      desc: 'Complete decoupled application wiring React UI with Express & MongoDB backend, real-time filters, stats, toast alerts, and modal dialogs.',
      icon: Layers,
      tech: ['Full Stack', 'CORS', 'Optimistic UI', 'Toast System', 'CRUD'],
      route: '/p6',
      badge: 'Full Stack App'
    },
    {
      id: 'p7',
      number: '07',
      title: 'Authentication & Middleware Pipeline',
      desc: 'User registration/login with bcrypt password hashing, JWT signing, route protection middleware, input validation, and /me endpoint.',
      icon: Lock,
      tech: ['JWT', 'bcryptjs', 'Auth Middleware', 'Input Validation'],
      route: '/p7',
      badge: 'Security & Auth'
    },
    {
      id: 'p8',
      number: '08',
      title: 'Performance Optimization & Lazy Loading',
      desc: 'Route code splitting with React.lazy & Suspense, debounced minimum-delay loading fallbacks, and on-demand heavy chart analytics.',
      icon: Zap,
      tech: ['React.lazy', 'Suspense', 'Code Splitting', 'Rollup Chunks'],
      route: '/p8',
      badge: 'Performance'
    },
    {
      id: 'p9',
      number: '09',
      title: 'In-Memory Caching & Query Optimization',
      desc: 'High-speed caching using node-cache with 60s TTL, automatic write invalidation, and real-time hit/miss metrics reporting.',
      icon: Server,
      tech: ['node-cache', 'In-Memory TTL', 'Query Invalidation', 'Benchmark'],
      route: '/p9',
      badge: 'Backend Optimization'
    },
    {
      id: 'p10',
      number: '10',
      title: 'Asynchronous Event-Driven Processing',
      desc: 'Decoupled background notification processing using native Node.js EventEmitter, proven response-before-handler timestamp ordering.',
      icon: Activity,
      tech: ['EventEmitter', 'Non-blocking IO', 'Event Loop', 'Audit Logs'],
      route: '/p10',
      badge: 'Event Architecture'
    },
    {
      id: 'p11',
      number: '11',
      title: 'Containerization with Docker & Compose',
      desc: 'Multi-stage React frontend container (Nginx Alpine), lightweight Express backend container, MongoDB service, named volumes, and bridge network.',
      icon: Box,
      tech: ['Docker', 'Docker Compose', 'Multi-Stage Build', 'Nginx Alpine'],
      route: '/p11',
      badge: 'DevOps Containers'
    },
    {
      id: 'p12',
      number: '12',
      title: 'CI/CD Pipeline with GitHub Actions',
      desc: 'Automated continuous integration pipeline with automated test assertions, ESLint code checks, failure demonstration, and status badge.',
      icon: GitBranch,
      tech: ['GitHub Actions', 'CI/CD Workflows', 'Automated Tests', 'Linters'],
      route: '/p12',
      badge: 'DevOps CI/CD'
    },
    {
      id: 'p13',
      number: '13',
      title: 'AI API Integration into Web Application',
      desc: 'Server-side integration with Google Gemini AI for automated task descriptions, suggested priority, graceful degradation, and rate limiting.',
      icon: Bot,
      tech: ['Gemini 1.5 API', 'Server Secrets', 'Graceful Fallback', 'Rate Limit'],
      route: '/p13',
      badge: 'Full Stack AI'
    }
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-pill">
          <Sparkles size={14} />
          <span>Advanced Web Development Frameworks (ITUE301)</span>
        </div>
        
        <h1 className="hero-title">
          AWDF Practicals <span className="brand-text">Master Portal</span>
        </h1>
        
        <p className="hero-subtitle">
          CHARUSAT CSPIT (IT) • Semester 5 • All 6 practical assignments consolidated into a single unified interactive workspace.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/p6" className="btn btn-primary">
            <Layers size={18} />
            <span>Launch Full-Stack App (P6)</span>
          </Link>
          <Link to="/p1" className="btn btn-secondary">
            <User size={18} />
            <span>View Student Portfolio (P1)</span>
          </Link>
        </div>
      </section>

      {/* System Status Metrics */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          
          {/* Backend Health Card */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>API Server</span>
              <Server size={18} color="var(--accent-primary)" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
              {health?.status === 'online' ? 'Port 5000 Active' : 'Offline'}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              Express Unified REST Backend with CORS
            </p>
          </div>

          {/* MongoDB Database Card */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Database</span>
              <Database size={18} color="var(--accent-emerald)" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
              {health?.database?.status === 'Connected' ? 'MongoDB Connected' : 'Connecting...'}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              mongodb://127.0.0.1:27017/taskdb
            </p>
          </div>

          {/* Frontend SPA Card */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Frontend Client</span>
              <Globe size={18} color="var(--accent-cyan)" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
              React 18 + Vite
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              Port 5180 • Multi-Route Single Page App
            </p>
          </div>

          {/* Total Tasks Seeded */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Full-Stack Tasks</span>
              <CheckCircle2 size={18} color="var(--accent-amber)" />
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
              {stats ? `${stats.total} Documents` : '5 Tasks'}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              {stats ? `${stats.completed} Completed • ${stats.pending} Pending` : 'Persistent in MongoDB'}
            </p>
          </div>

        </div>
      </section>

      {/* Practicals Cards Grid */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Course Practicals Directory
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Click any practical to enter its interactive dedicated workspace
            </p>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
            6 of 6 Completed
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
          {practicals.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.id} className="glass-card interactive" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: 42,
                      height: 42,
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--accent-primary)'
                    }}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                        PRACTICAL {p.number}
                      </span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '0.1rem' }}>
                        {p.title}
                      </h3>
                    </div>
                  </div>
                  <StatusBadge label={p.badge} />
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem', flex: 1, lineHeight: 1.5 }}>
                  {p.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: '0.75rem',
                        background: 'var(--bg-tertiary)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-dim)'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Link to={p.route} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'space-between' }}>
                  <span>Open Practical {p.number}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Project Structure Reference */}
      <section className="glass-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <Terminal size={20} color="var(--accent-emerald)" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Workspace Organization & Execution</h3>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          All 6 practicals are integrated into this combined full-stack application and also maintained as clean standalone projects in this repository:
        </p>

        <div className="code-box">
{`# Run the Combined Master Application (Frontend on 5180 + Backend on 5000):
npm run dev

# Run individual standalone practicals anytime:
npm run p1          # Practical 1: Student Portfolio (React + Vite)
npm run p2          # Practical 2: Routing & State (React Router v6)
npm run p3          # Practical 3: GitHub REST API Integration
npm run p4          # Practical 4: Node.js Express REST API (Port 4000)
npm run p5          # Practical 5: MongoDB Mongoose API (Port 5000)
npm run p6:backend  # Practical 6 Backend (Express + MongoDB)
npm run p6:frontend # Practical 6 Frontend (React + Vite)
npm run p6:seed     # Reset & Seed MongoDB taskdb`}
        </div>
      </section>
    </div>
  );
}
