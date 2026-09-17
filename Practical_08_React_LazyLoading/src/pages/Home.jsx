import React from 'react';
import { Zap, Layers, Cpu, Compass } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', borderRadius: 16, padding: 36, color: '#fff', marginBottom: 28 }}>
        <span style={{ fontSize: 12, background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: 20, fontWeight: 600 }}>
          Code Splitting & Performance
        </span>
        <h2 style={{ fontSize: 26, margin: '12px 0 8px' }}>Practical 8: React.lazy() & Suspense</h2>
        <p style={{ margin: 0, opacity: 0.9, maxWidth: 600, fontSize: 15, lineHeight: 1.5 }}>
          Explore modern route-based and component-level code splitting. Assets and page chunks are dynamically fetched only when requested by the user, drastically lowering initial bundle weight and improving Time to Interactive (TTI).
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
          <Zap size={24} color="#eab308" />
          <h3 style={{ margin: '10px 0 6px', fontSize: 16 }}>Dynamic Import Chunks</h3>
          <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>
            Routes are split into separate JavaScript chunks using Webpack/Rollup dynamic import boundaries.
          </p>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
          <Layers size={24} color="#6366f1" />
          <h3 style={{ margin: '10px 0 6px', fontSize: 16 }}>Suspense Fallback UI</h3>
          <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>
            Graceful loading indicators with minimum-delay debounce to prevent UI flash on fast 5G networks.
          </p>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
          <Cpu size={24} color="#10b981" />
          <h3 style={{ margin: '10px 0 6px', fontSize: 16 }}>Component Code Splitting</h3>
          <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>
            Heavy visualization and analytics widgets are loaded asynchronously on-demand.
          </p>
        </div>
      </div>
    </div>
  );
}
