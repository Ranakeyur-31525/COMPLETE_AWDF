import React, { useState, useEffect } from 'react';
import { Box, Layers, Database, Globe, RefreshCw } from 'lucide-react';

export default function App() {
  const [backendData, setBackendData] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkBackend = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5011/');
      const data = await res.json();
      setBackendData(data);
    } catch (err) {
      setBackendData({ status: 'offline', error: 'Could not connect to port 5011' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkBackend();
  }, []);

  return (
    <div style={{ maxWidth: 850, margin: '40px auto', padding: '0 20px' }}>
      <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 16, padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ background: '#0284c7', color: '#fff', padding: 10, borderRadius: 10 }}>
            <Layers size={24} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 22, color: '#38bdf8' }}>Practical 11: Containerization & Docker Compose</h2>
            <p style="color: #94a3b8; margin: 0; font-size: 13px;">
              Multi-Stage Alpine Frontend (Port 5181) • Node Backend (Port 5011) • Mongo Data Volume
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, margin: '20px 0' }}>
          <div style={{ background: '#0f172a', padding: 16, borderRadius: 8, border: '1px solid #334155', textAlign: 'center' }}>
            <Globe size={28} style={{ color: '#38bdf8', marginBottom: 8 }} />
            <h4 style={{ margin: 0, color: '#f8fafc' }}>Frontend Tier</h4>
            <p style={{ margin: '4px 0 0 0', fontSize: 12, color: '#94a3b8' }}>Port 5181 (Nginx Alpine 22.4MB)</p>
          </div>
          <div style={{ background: '#0f172a', padding: 16, borderRadius: 8, border: '1px solid #334155', textAlign: 'center' }}>
            <Box size={28} style={{ color: '#34d399', marginBottom: 8 }} />
            <h4 style={{ margin: 0, color: '#f8fafc' }}>Backend Tier</h4>
            <p style={{ margin: '4px 0 0 0', fontSize: 12, color: '#94a3b8' }}>Port 5011 (Express REST API)</p>
          </div>
          <div style={{ background: '#0f172a', padding: 16, borderRadius: 8, border: '1px solid #334155', textAlign: 'center' }}>
            <Database size={28} style={{ color: '#fbbf24', marginBottom: 8 }} />
            <h4 style={{ margin: 0, color: '#f8fafc' }}>Database Tier</h4>
            <p style={{ margin: '4px 0 0 0', fontSize: 12, color: '#94a3b8' }}>Port 27017 (mongo-data volume)</p>
          </div>
        </div>

        <button
          onClick={checkBackend}
          style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 8, fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          <span>Ping Backend (Port 5011)</span>
        </button>

        <h3 style={{ marginTop: 24, fontSize: 16, color: '#cbd5e1' }}>Backend Health Status:</h3>
        <pre style={{ background: '#090d16', padding: 16, borderRadius: 8, color: '#7dd3fc', border: '1px solid #334155' }}>
          {JSON.stringify(backendData, null, 2)}
        </pre>
      </div>
    </div>
  );
}
