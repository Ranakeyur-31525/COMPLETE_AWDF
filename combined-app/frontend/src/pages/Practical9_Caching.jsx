import React, { useState } from 'react';
import { Server, Zap, RefreshCw, Trash2, Database } from 'lucide-react';

export default function Practical9_Caching({ onToast }) {
  const [cacheStats, setCacheStats] = useState({ hits: 14, misses: 3, hitRate: '82.4%', activeKeys: 5 });
  const [latencyLog, setLatencyLog] = useState([
    { id: 1, type: 'MISS', source: 'MongoDB Disk Query', latency: '26.8ms' },
    { id: 2, type: 'HIT', source: 'node-cache In-Memory', latency: '1.4ms' },
    { id: 3, type: 'HIT', source: 'node-cache In-Memory', latency: '1.6ms' }
  ]);

  const simulateFetch = (cached) => {
    const lat = cached ? (Math.random() * 1.5 + 1.0).toFixed(1) : (Math.random() * 10 + 22).toFixed(1);
    const item = {
      id: Date.now(),
      type: cached ? 'HIT' : 'MISS',
      source: cached ? 'node-cache In-Memory' : 'MongoDB Disk Query',
      latency: `${lat}ms`
    };
    setLatencyLog((prev) => [item, ...prev.slice(0, 7)]);
    setCacheStats((prev) => ({
      ...prev,
      hits: cached ? prev.hits + 1 : prev.hits,
      misses: cached ? prev.misses : prev.misses + 1
    }));
    onToast(`GET /tasks: ${item.type} (${item.latency})`, cached ? 'success' : 'info');
  };

  const simulateInvalidate = () => {
    setCacheStats((prev) => ({ ...prev, activeKeys: 0 }));
    onToast('Write operation detected! In-memory cache invalidated.', 'warning');
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 0' }}>
      <div style={{ background: 'var(--card-bg, #fff)', border: '1px solid var(--border-color, #e2e8f0)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ background: '#0284c7', color: '#fff', padding: 10, borderRadius: 10, display: 'flex' }}>
            <Server size={24} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 20 }}>Practical 9: In-Memory Caching & Query Optimization</h2>
            <p style={{ margin: 0, color: 'var(--text-muted, #64748b)', fontSize: 13 }}>
              node-cache • 60s TTL • Write-through Invalidation • Latency Reduction Benchmarking
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
          <div style={{ background: 'var(--bg-secondary, #f8fafc)', padding: 16, borderRadius: 10, textAlign: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted, #64748b)' }}>Cache Hits</span>
            <h3 style={{ margin: '6px 0 0', color: '#16a34a', fontSize: 22 }}>{cacheStats.hits}</h3>
          </div>
          <div style={{ background: 'var(--bg-secondary, #f8fafc)', padding: 16, borderRadius: 10, textAlign: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted, #64748b)' }}>Cache Misses</span>
            <h3 style={{ margin: '6px 0 0', color: '#dc2626', fontSize: 22 }}>{cacheStats.misses}</h3>
          </div>
          <div style={{ background: 'var(--bg-secondary, #f8fafc)', padding: 16, borderRadius: 10, textAlign: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted, #64748b)' }}>Avg Speedup</span>
            <h3 style={{ margin: '6px 0 0', color: '#0284c7', fontSize: 22 }}>16.3x</h3>
          </div>
          <div style={{ background: 'var(--bg-secondary, #f8fafc)', padding: 16, borderRadius: 10, textAlign: 'center' }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted, #64748b)' }}>Standard TTL</span>
            <h3 style={{ margin: '6px 0 0', color: '#6366f1', fontSize: 22 }}>60s</h3>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <button
            onClick={() => simulateFetch(true)}
            style={{ padding: '10px 18px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <Zap size={16} /> Simulate Cache HIT (1.5ms)
          </button>
          <button
            onClick={() => simulateFetch(false)}
            style={{ padding: '10px 18px', background: '#e0f2fe', color: '#0369a1', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <Database size={16} /> Simulate Cache MISS (26ms)
          </button>
          <button
            onClick={simulateInvalidate}
            style={{ padding: '10px 18px', background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <Trash2 size={16} /> Invalidate on POST/PUT
          </button>
        </div>

        <div style={{ border: '1px solid var(--border-color, #e2e8f0)', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ background: 'var(--bg-secondary, #f8fafc)', padding: '10px 16px', fontWeight: 600, fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
            <span>Request Log (Last Calls)</span>
            <span>Response Time</span>
          </div>
          {latencyLog.map((log) => (
            <div key={log.id} style={{ padding: '10px 16px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color, #e2e8f0)', fontSize: 13 }}>
              <div>
                <span style={{ fontWeight: 700, padding: '2px 6px', borderRadius: 4, marginRight: 8, background: log.type === 'HIT' ? '#dcfce7' : '#fee2e2', color: log.type === 'HIT' ? '#16a34a' : '#b91c1c', fontSize: 11 }}>
                  {log.type}
                </span>
                <span style={{ color: 'var(--text-muted, #64748b)' }}>{log.source}</span>
              </div>
              <strong style={{ color: log.type === 'HIT' ? '#16a34a' : '#0284c7' }}>{log.latency}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
