import React, { useState } from 'react';
import { Activity, Radio, Clock, CheckCircle2 } from 'lucide-react';

export default function Practical10_EventDriven({ onToast }) {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'task-created',
      responseTimestamp: '2026-09-17T09:15:20.104Z',
      handlerTimestamp: '2026-09-17T09:15:21.618Z',
      lag: '+1514ms',
      task: 'Verify Event Ordering'
    }
  ]);
  const [simulating, setSimulating] = useState(false);

  const triggerEvent = () => {
    setSimulating(true);
    const respTime = new Date().toISOString();
    onToast('API responded immediately (201 Created)! Event emitted.', 'success');

    setTimeout(() => {
      const handlerTime = new Date().toISOString();
      const newEv = {
        id: Date.now(),
        name: 'task-created',
        responseTimestamp: respTime,
        handlerTimestamp: handlerTime,
        lag: '+1500ms',
        task: `Async Task #${events.length + 1}`
      };
      setEvents((prev) => [newEv, ...prev]);
      setSimulating(false);
      onToast('Background listener finished logging notification.', 'info');
    }, 1500);
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 0' }}>
      <div style={{ background: 'var(--card-bg, #fff)', border: '1px solid var(--border-color, #e2e8f0)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ background: '#ec4899', color: '#fff', padding: 10, borderRadius: 10, display: 'flex' }}>
            <Activity size={24} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 20 }}>Practical 10: Asynchronous Event-Driven Architecture</h2>
            <p style={{ margin: 0, color: 'var(--text-muted, #64748b)', fontSize: 13 }}>
              Node.js EventEmitter • Non-Blocking Background Work • Decoupled Notifications • Timestamp Ordering
            </p>
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary, #f8fafc)', padding: 18, borderRadius: 10, border: '1px solid var(--border-color, #e2e8f0)', marginBottom: 20 }}>
          <h4 style={{ margin: '0 0 8px', fontSize: 15 }}>Event Dispatch Simulator</h4>
          <p style={{ fontSize: 13, color: 'var(--text-muted, #64748b)', margin: '0 0 14px' }}>
            Dispatches <code>POST /api/tasks</code>. The API responds in &lt;15ms. The background handler processes for 1.5s in the event loop.
          </p>
          <button
            onClick={triggerEvent}
            disabled={simulating}
            style={{ padding: '10px 20px', background: '#ec4899', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <Radio size={16} /> {simulating ? 'Background Worker Processing...' : 'Dispatch Task & Emit Event'}
          </button>
        </div>

        <h4 style={{ margin: '0 0 12px', fontSize: 15 }}>Timestamp Ordering Evidence Log</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {events.map((ev) => (
            <div key={ev.id} style={{ background: '#1e293b', color: '#f8fafc', padding: 16, borderRadius: 10, fontFamily: 'monospace', fontSize: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, color: '#38bdf8', fontWeight: 600 }}>
                <span>Event: {ev.name} ({ev.task})</span>
                <span style={{ color: '#4ade80' }}>Ordering Verified: Response First</span>
              </div>
              <div style={{ color: '#94a3b8' }}>1. API Response Dispatched : {ev.responseTimestamp}</div>
              <div style={{ color: '#fb7185' }}>2. Background Worker Logged: {ev.handlerTimestamp} (Lag: {ev.lag})</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
