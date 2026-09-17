import React, { useState, Suspense, lazy } from 'react';
import { Activity, PieChart } from 'lucide-react';
import LazyFallback from '../components/LazyFallback';

// Lazily load heavy Analytics Chart component on demand (Supplementary Problem 1)
const AnalyticsChart = lazy(() => import('../components/AnalyticsChart'));

export default function Analytics() {
  const [showChart, setShowChart] = useState(true);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 22, margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Activity size={22} color="#4f46e5" /> Performance & Analytics
          </h2>
          <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>
            Demonstrating nested component lazy-loading with React.lazy and Suspense.
          </p>
        </div>
        <button
          onClick={() => setShowChart(!showChart)}
          style={{
            padding: '8px 16px',
            background: showChart ? '#f1f5f9' : '#4f46e5',
            color: showChart ? '#334155' : '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {showChart ? 'Unmount Chart' : 'Load Heavy Chart Chunk'}
        </button>
      </div>

      {showChart && (
        <Suspense fallback={<LazyFallback message="Loading AnalyticsChart.chunk.js..." />}>
          <AnalyticsChart />
        </Suspense>
      )}
    </div>
  );
}
