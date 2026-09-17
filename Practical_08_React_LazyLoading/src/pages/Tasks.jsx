import React, { useState } from 'react';
import { CheckSquare, ListTodo, Plus } from 'lucide-react';

export default function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Analyze bundle size with rollup-plugin-visualizer', done: true },
    { id: 2, title: 'Apply React.lazy() to route components', done: true },
    { id: 3, title: 'Configure Suspense with minimum delay fallback', done: true },
    { id: 4, title: 'Profile render metrics using React DevTools', done: false }
  ]);
  const [newTitle, setNewTitle] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: newTitle, done: false }]);
    setNewTitle('');
  };

  return (
    <div>
      <h2 style={{ fontSize: 22, margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <ListTodo size={22} color="#4f46e5" /> Tasks Management (Lazy Chunk)
      </h2>
      <p style={{ color: '#64748b', fontSize: 14, margin: '0 0 20px' }}>
        Loaded via <code>Tasks.chunk.js</code> upon clicking the navigation link.
      </p>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input
          type="text"
          placeholder="New task..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1' }}
        />
        <button type="submit" style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
          Add
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {tasks.map((t) => (
          <div
            key={t.id}
            onClick={() => setTasks(tasks.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))}
            style={{
              padding: '14px 18px',
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}
          >
            <CheckSquare size={18} color={t.done ? '#10b981' : '#cbd5e1'} />
            <span style={{ textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#94a3b8' : '#1e293b' }}>
              {t.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
