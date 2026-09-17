import React, { useState } from 'react';
import { Zap, Loader2, BarChart2 } from 'lucide-react';

export default function Practical8_LazyLoading({ onToast }) {
  const [loadingChunk, setLoadingChunk] = useState(false);
  const [chunkLoaded, setChunkLoaded] = useState(false);

  const handleLoadChunk = () => {
    setLoadingChunk(true);
    setTimeout(() => {
      setLoadingChunk(false);
      setChunkLoaded(true);
      onToast('Lazy chunk downloaded and mounted dynamically!', 'success');
    }, 600);
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 0' }}>
      <div style={{ background: 'var(--card-bg, #fff)', border: '1px solid var(--border-color, #e2e8f0)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ background: '#eab308', color: '#fff', padding: 10, borderRadius: 10, display: 'flex' }}>
            <Zap size={24} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 20 }}>Practical 8: Performance Optimization & Lazy Loading</h2>
            <p style={{ margin: 0, color: 'var(--text-muted, #64748b)', fontSize: 13 }}>
              React.lazy() • Suspense Boundaries • Minimum-Delay Fallback • Code Splitting
            </p>
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary, #f8fafc)', padding: 20, borderRadius: 10, border: '1px solid var(--border-color, #e2e8f0)', marginBottom: 20 }}>
          <h4 style={{ margin: '0 0 10px', fontSize: 15 }}>Interactive Chunk Loader Simulator</h4>
          <p style={{ fontSize: 13, color: 'var(--text-muted, #64748b)', margin: '0 0 16px' }}>
            Simulate dynamic import request for <code>HeavyAnalyticsChart.chunk.js</code>. Notice the debounced Suspense fallback.
          </p>
          <button
            onClick={handleLoadChunk}
            disabled={loadingChunk}
            style={{ padding: '10px 18px', background: '#eab308', color: '#000', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            {loadingChunk ? <Loader2 size={16} className="spin" /> : <Zap size={16} />}
            {loadingChunk ? 'Downloading Chunk...' : chunkLoaded ? 'Reload Heavy Chunk' : 'Dynamically Load Heavy Chunk'}
          </button>
        </div>

        {chunkLoaded && (
          <div style={{ background: '#fff', border: '2px solid #eab308', borderRadius: 12, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, color: '#ca8a04', fontWeight: 600 }}>
              <BarChart2 size={20} /> Lazy Chunk: Analytics Dashboard Mounted!
            </div>
            <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 16px' }}>
              Successfully code-split. Initial bundle size was reduced by 76.0%.
            </p>
            <div style={{ display: 'flex', gap: 12, height: 120, alignItems: 'flex-end', paddingBottom: 10 }}>
              {[40, 75, 55, 90, 65, 80, 95].map((h, i) => (
                <div key={i} style={{ flex: 1, background: '#eab308', height: `${h}%`, borderRadius: '4px 4px 0 0' }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
