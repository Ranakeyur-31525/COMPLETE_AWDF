import React from 'react';
import { BarChart3, TrendingUp, CheckCircle2, Clock } from 'lucide-react';

/**
 * Heavy Analytics Chart Component (Supplementary Problem 1)
 * Lazily loaded on demand when visiting Analytics or clicking Show Metrics.
 */
export default function AnalyticsChart() {
  const data = [
    { day: 'Mon', completed: 12, pending: 4 },
    { day: 'Tue', completed: 18, pending: 2 },
    { day: 'Wed', completed: 15, pending: 6 },
    { day: 'Thu', completed: 22, pending: 3 },
    { day: 'Fri', completed: 28, pending: 5 },
    { day: 'Sat', completed: 14, pending: 1 },
    { day: 'Sun', completed: 9, pending: 2 }
  ];

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, marginTop: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 17, display: 'flex', alignItems: 'center', gap: 8 }}>
            <BarChart3 size={20} color="#4f46e5" /> Weekly Task Velocity (Heavy Module)
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>
            Code-split into separate bundle chunk: <code>AnalyticsChart.chunk.js</code>
          </p>
        </div>
        <span style={{ fontSize: 12, background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: 20, fontWeight: 600 }}>
          +18.4% this week
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', height: 160, gap: 16, padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
        {data.map((item) => (
          <div key={item.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
            <div style={{ width: '100%', display: 'flex', gap: 4, alignItems: 'flex-end', height: 120 }}>
              <div
                style={{
                  flex: 1,
                  background: '#6366f1',
                  height: `${(item.completed / 30) * 100}%`,
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.4s ease'
                }}
                title={`Completed: ${item.completed}`}
              />
              <div
                style={{
                  flex: 1,
                  background: '#f87171',
                  height: `${(item.pending / 30) * 100}%`,
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.4s ease'
                }}
                title={`Pending: ${item.pending}`}
              />
            </div>
            <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>{item.day}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 20, marginTop: 14, fontSize: 12, color: '#64748b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 10, height: 10, background: '#6366f1', borderRadius: 2 }} />
          <span>Completed Tasks</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 10, height: 10, background: '#f87171', borderRadius: 2 }} />
          <span>Pending Tasks</span>
        </div>
      </div>
    </div>
  );
}
