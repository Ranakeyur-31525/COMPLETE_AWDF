import React, { useState } from 'react';
import { Bot, Plus, CheckCircle, Trash2 } from 'lucide-react';
import AITaskSuggester from './components/AITaskSuggester';

export default function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Setup GitHub Actions CI/CD Pipeline',
      description: 'Configure continuous integration workflow running automated test assertions on push to main.',
      priority: 'high',
      completed: true
    },
    {
      id: 2,
      title: 'Dockerize Fullstack Application',
      description: 'Create multi-stage Dockerfiles and docker-compose.yml for frontend, backend, and MongoDB.',
      priority: 'medium',
      completed: false
    }
  ]);

  const [form, setForm] = useState({ title: '', description: '', priority: 'medium' });

  const handleApplyAISuggestion = (suggestion) => {
    setForm({
      title: suggestion.taskTitle,
      description: suggestion.description,
      priority: suggestion.suggestedPriority
    });
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setTasks([
      {
        id: Date.now(),
        title: form.title,
        description: form.description,
        priority: form.priority,
        completed: false
      },
      ...tasks
    ]);
    setForm({ title: '', description: '', priority: 'medium' });
  };

  return (
    <div style={{ maxWidth: 880, margin: '40px auto', padding: '0 20px', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ marginBottom: 28 }}>
        <h1 style={{ margin: 0, fontSize: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Bot size={28} color="#6366f1" /> Practical 13: AI API Integration
        </h1>
        <p style={{ margin: '6px 0 0', color: '#64748b', fontSize: 14 }}>
          Auto-generating task descriptions, suggesting priority levels, and handling API failures gracefully.
        </p>
      </header>

      {/* AI Assistant Generator Section */}
      <section style={{ marginBottom: 32 }}>
        <AITaskSuggester onApplySuggestion={handleApplyAISuggestion} />
      </section>

      {/* Standard Task Form with AI pre-filled data */}
      <section style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, marginBottom: 32 }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 17 }}>Create Task (Pre-filled by AI)</h3>
        <form onSubmit={handleCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Task Title</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', boxSizing: 'border-box', fontFamily: 'inherit' }}
            />
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #cbd5e1' }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <button
              type="submit"
              style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600, marginTop: 20, display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Plus size={16} /> Save Task to List
            </button>
          </div>
        </form>
      </section>

      {/* Task List */}
      <section>
        <h3 style={{ margin: '0 0 16px', fontSize: 17 }}>Task Management Items ({tasks.length})</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 10
              }}
            >
              <div>
                <h4 style={{ margin: 0, fontSize: 15, color: '#1e293b' }}>{task.title}</h4>
                <p style={{ margin: '4px 0 6px', fontSize: 13, color: '#64748b' }}>{task.description}</p>
                <span style={{ fontSize: 11, background: task.priority === 'high' ? '#fee2e2' : task.priority === 'medium' ? '#fef3c7' : '#e0f2fe', color: task.priority === 'high' ? '#b91c1c' : task.priority === 'medium' ? '#b45309' : '#0369a1', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>
                  {task.priority.toUpperCase()}
                </span>
              </div>
              <button
                onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))}
                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
