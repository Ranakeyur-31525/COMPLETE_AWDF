import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Send, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  FileCode,
  Terminal
} from 'lucide-react';
import { getP4Tasks, createP4Task, updateP4Task, deleteP4Task, resetP4Tasks } from '../services/api';
import StatusBadge from '../components/StatusBadge';

export default function Practical4_Express({ onToast }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // API Workbench State
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('/api/p4/tasks');
  const [requestBody, setRequestBody] = useState('{\n  "title": "New In-Memory Task",\n  "description": "Created from REST Workbench",\n  "priority": "high",\n  "completed": false\n}');
  const [responseView, setResponseView] = useState({
    status: null,
    statusText: '',
    timeMs: null,
    data: null
  });

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await getP4Tasks();
      setTasks(data);
    } catch (err) {
      onToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleExecuteRequest = async () => {
    const startTime = performance.now();
    try {
      let result = null;
      let statusCode = 200;

      if (method === 'GET') {
        const res = await fetch(`http://localhost:5000${endpoint}`);
        statusCode = res.status;
        result = await res.json();
      } else if (method === 'POST') {
        const parsed = JSON.parse(requestBody);
        const res = await fetch(`http://localhost:5000${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed)
        });
        statusCode = res.status;
        result = await res.json();
      } else if (method === 'PUT') {
        const parsed = JSON.parse(requestBody);
        const res = await fetch(`http://localhost:5000${endpoint}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed)
        });
        statusCode = res.status;
        result = await res.json();
      } else if (method === 'DELETE') {
        const res = await fetch(`http://localhost:5000${endpoint}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });
        statusCode = res.status;
        result = await res.json();
      }

      const elapsed = Math.round(performance.now() - startTime);
      setResponseView({
        status: statusCode,
        statusText: statusCode >= 200 && statusCode < 300 ? 'OK' : 'Client/Server Response',
        timeMs: elapsed,
        data: result
      });

      onToast(`Request finished: HTTP ${statusCode} in ${elapsed}ms`, statusCode < 400 ? 'success' : 'error');
      loadTasks();
    } catch (err) {
      const elapsed = Math.round(performance.now() - startTime);
      setResponseView({
        status: 500,
        statusText: 'Client Error / Failed to Fetch',
        timeMs: elapsed,
        data: { error: err.message }
      });
      onToast(err.message, 'error');
    }
  };

  const handleResetStore = async () => {
    await resetP4Tasks();
    onToast('In-memory task store reset to defaults.', 'info');
    loadTasks();
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
              PRACTICAL 04
            </span>
            <StatusBadge label="Node.js & Express RESTful API" />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Express REST API & In-Memory Store
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '0.25rem' }}>
            In-memory CRUD routing, custom request logger, Content-Type verification, and centralized error handling middleware.
          </p>
        </div>

        <button className="btn btn-secondary" onClick={handleResetStore}>
          <RotateCcw size={16} />
          <span>Reset In-Memory Store</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        
        {/* Interactive REST API Workbench */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Terminal size={18} color="var(--accent-primary)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Interactive REST API Workbench</h2>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <select
              className="form-select"
              style={{ width: '130px', fontWeight: 700 }}
              value={method}
              onChange={(e) => {
                const m = e.target.value;
                setMethod(m);
                if (m === 'GET') setEndpoint('/api/p4/tasks');
                if (m === 'POST') setEndpoint('/api/p4/tasks');
                if (m === 'PUT') setEndpoint('/api/p4/tasks/1');
                if (m === 'DELETE') setEndpoint('/api/p4/tasks/1');
              }}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>

            <input
              type="text"
              className="form-input"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="/api/p4/tasks"
            />

            <button className="btn btn-primary" onClick={handleExecuteRequest}>
              <Send size={16} />
              <span>Send</span>
            </button>
          </div>

          {['POST', 'PUT'].includes(method) && (
            <div className="form-group">
              <label className="form-label">Request JSON Body</label>
              <textarea
                className="form-textarea"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', minHeight: '120px' }}
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
              />
            </div>
          )}

          {/* Response Inspector */}
          <div style={{ marginTop: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Response Output</span>
              {responseView.status && (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <StatusBadge label={`HTTP ${responseView.status}`} value={responseView.status.toString()} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={12} /> {responseView.timeMs}ms
                  </span>
                </div>
              )}
            </div>

            <div className="code-box" style={{ maxHeight: '220px' }}>
              {responseView.data ? JSON.stringify(responseView.data, null, 2) : '// Click "Send" to execute request and inspect response.'}
            </div>
          </div>
        </div>

        {/* Current In-Memory State Viewer */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileCode size={18} color="var(--accent-emerald)" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>In-Memory Tasks Store</h2>
            </div>
            <StatusBadge label={`${tasks.length} items`} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '420px', overflowY: 'auto', paddingRight: '0.25rem' }}>
            {tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  padding: '1rem',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>#{task.id}</span>
                    <strong style={{ fontSize: '0.925rem' }}>{task.title}</strong>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <StatusBadge label={task.priority} />
                    <StatusBadge label={task.completed ? 'Done' : 'Active'} value={task.completed ? 'completed' : 'pending'} />
                  </div>
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  {task.description || 'No description.'}
                </p>

                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setMethod('PUT');
                      setEndpoint(`/api/p4/tasks/${task.id}`);
                      setRequestBody(JSON.stringify({ completed: !task.completed }, null, 2));
                    }}
                  >
                    Quick Toggle
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      setMethod('DELETE');
                      setEndpoint(`/api/p4/tasks/${task.id}`);
                    }}
                  >
                    Delete ID
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
