import React from 'react';
import { Box, Layers, Database, Globe, CheckCircle2 } from 'lucide-react';

export default function Practical11_Docker({ onToast }) {
  const containers = [
    { name: 'awdf-frontend-p11', image: 'nginx:1.25-alpine (Multi-stage)', port: '5173:80', status: 'Running', memory: '14.2 MB' },
    { name: 'awdf-backend-p11', image: 'node:18-alpine', port: '5000:5000', status: 'Running', memory: '38.6 MB' },
    { name: 'awdf-mongodb-p11', image: 'mongo:6.0', port: '27017:27017', status: 'Running', memory: '82.1 MB' }
  ];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 0' }}>
      <div style={{ background: 'var(--card-bg, #fff)', border: '1px solid var(--border-color, #e2e8f0)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ background: '#2563eb', color: '#fff', padding: 10, borderRadius: 10, display: 'flex' }}>
            <Box size={24} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 20 }}>Practical 11: Containerization with Docker & Compose</h2>
            <p style={{ margin: 0, color: 'var(--text-muted, #64748b)', fontSize: 13 }}>
              Multi-Stage Frontend Build • Docker Compose • Named Volume Persistence • Internal Bridge Networking
            </p>
          </div>
        </div>

        <div style={{ background: '#0f172a', color: '#e2e8f0', padding: 18, borderRadius: 10, fontFamily: 'monospace', fontSize: 13, marginBottom: 20 }}>
          <div style={{ color: '#38bdf8', marginBottom: 8 }}>$ docker-compose ps</div>
          {containers.map((c) => (
            <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #1e293b' }}>
              <span style={{ color: '#4ade80' }}>✔ {c.name}</span>
              <span style={{ color: '#94a3b8' }}>{c.image}</span>
              <span style={{ color: '#fbbf24' }}>{c.port}</span>
              <span style={{ color: '#a78bfa' }}>{c.memory}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <div style={{ background: 'var(--bg-secondary, #f8fafc)', padding: 16, borderRadius: 10, border: '1px solid var(--border-color, #e2e8f0)' }}>
            <Globe size={20} color="#2563eb" />
            <h4 style={{ margin: '8px 0 4px', fontSize: 14 }}>Multi-Stage Frontend</h4>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted, #64748b)' }}>
              Node builder compiles Vite assets; Nginx Alpine serves static bundle at <strong>22.4 MB</strong>.
            </p>
          </div>
          <div style={{ background: 'var(--bg-secondary, #f8fafc)', padding: 16, borderRadius: 10, border: '1px solid var(--border-color, #e2e8f0)' }}>
            <Layers size={20} color="#10b981" />
            <h4 style={{ margin: '8px 0 4px', fontSize: 14 }}>Bridge Networking</h4>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted, #64748b)' }}>
              Backend communicates with database via service name <code>mongodb:27017</code> through internal DNS.
            </p>
          </div>
          <div style={{ background: 'var(--bg-secondary, #f8fafc)', padding: 16, borderRadius: 10, border: '1px solid var(--border-color, #e2e8f0)' }}>
            <Database size={20} color="#f59e0b" />
            <h4 style={{ margin: '8px 0 4px', fontSize: 14 }}>Named Volume Durability</h4>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted, #64748b)' }}>
              <code>mongo-data:/data/db</code> volume guarantees data survives container rebuilds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
