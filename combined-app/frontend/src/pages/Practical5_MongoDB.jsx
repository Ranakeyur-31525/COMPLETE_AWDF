import React, { useState, useEffect } from 'react';
import { 
  Database, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  RefreshCw, 
  Layers, 
  FileText, 
  AlertCircle,
  CheckCircle2,
  Terminal
} from 'lucide-react';
import { getP5Tasks, createP5Task, deleteP5Task, getP5SchemaInfo } from '../services/api';
import StatusBadge from '../components/StatusBadge';

export default function Practical5_MongoDB({ onToast }) {
  const [tasks, setTasks] = useState([]);
  const [schemaInfo, setSchemaInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form State for testing schema validation
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    completed: false
  });
  const [validationResult, setValidationResult] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [tasksData, infoData] = await Promise.all([getP5Tasks(), getP5SchemaInfo()]);
      setTasks(tasksData);
      setSchemaInfo(infoData);
    } catch (err) {
      onToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateDocument = async (e) => {
    e.preventDefault();
    try {
      const created = await createP5Task(taskForm);
      setValidationResult({
        success: true,
        message: 'Document successfully validated by Mongoose Schema & inserted into MongoDB taskdb!',
        document: created.data
      });
      onToast('Saved to MongoDB taskdb successfully!', 'success');
      setTaskForm({ title: '', description: '', priority: 'medium', completed: false });
      loadData();
    } catch (err) {
      setValidationResult({
        success: false,
        message: err.message
      });
      onToast(`Validation Failed: ${err.message}`, 'error');
    }
  };

  const handleTestInvalidTitle = () => {
    setTaskForm({
      title: 'A', // Violates minlength 2
      description: 'Testing minlength 2 validation',
      priority: 'high',
      completed: false
    });
    onToast('Loaded invalid payload (Title < 2 chars). Click "Save Document" to test Mongoose validation.', 'info');
  };

  const handleDeleteDoc = async (id) => {
    try {
      await deleteP5Task(id);
      onToast('Document removed from MongoDB.', 'success');
      loadData();
    } catch (err) {
      onToast(err.message, 'error');
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-primary)' }}>
              PRACTICAL 05
            </span>
            <StatusBadge label="MongoDB & Mongoose Schema Design" />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            MongoDB Integration & Schema Validation
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '0.25rem' }}>
            Mongoose ODM schema definition, pre-save title-trimming hook, enum constraints, and MongoDB Compass integration.
          </p>
        </div>

        <button className="btn btn-secondary" onClick={loadData}>
          <RefreshCw size={16} />
          <span>Refresh Database</span>
        </button>
      </div>

      {/* MongoDB Compass Connection Instructions */}
      <div className="glass-card" style={{ marginBottom: '2rem', background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <Database size={20} color="var(--accent-emerald)" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
            Live MongoDB Compass Connection
          </h3>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          You can inspect this live database in <strong>MongoDB Compass</strong> by connecting to:
        </p>
        <div className="code-box" style={{ margin: '0.75rem 0' }}>
          mongodb://127.0.0.1:27017/taskdb
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          Database: <strong>taskdb</strong> | Collection: <strong>tasks</strong> | Pre-Save Hook: <code>trim()</code> active
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
        
        {/* Schema Validation Test Form */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={18} color="var(--accent-primary)" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Schema Validation Tester</h2>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleTestInvalidTitle}
              title="Quickly fill an invalid title to demonstrate Mongoose rejection"
            >
              Test Invalid
            </button>
          </div>

          <form onSubmit={handleCreateDocument}>
            <div className="form-group">
              <label className="form-label" htmlFor="doc-title">
                Task Title (Min 2 chars) <span style={{ color: 'var(--accent-rose)' }}>*</span>
              </label>
              <input
                id="doc-title"
                type="text"
                className="form-input"
                placeholder="Enter title (will be trimmed by pre-save hook)"
                value={taskForm.title}
                onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="doc-desc">
                Description
              </label>
              <textarea
                id="doc-desc"
                className="form-textarea"
                placeholder="Optional notes..."
                value={taskForm.description}
                onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="doc-priority">
                Priority (Mongoose Enum: low, medium, high)
              </label>
              <select
                id="doc-priority"
                className="form-select"
                value={taskForm.priority}
                onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              <Plus size={16} />
              <span>Save Document to MongoDB</span>
            </button>
          </form>

          {/* Validation Feedback Result Box */}
          {validationResult && (
            <div style={{
              marginTop: '1.25rem',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${validationResult.success ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
              background: validationResult.success ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                {validationResult.success ? (
                  <CheckCircle2 size={16} color="var(--accent-emerald)" />
                ) : (
                  <AlertCircle size={16} color="var(--accent-rose)" />
                )}
                <strong style={{ fontSize: '0.875rem', color: validationResult.success ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                  {validationResult.success ? 'Mongoose Validation Passed' : 'Mongoose Validation Error'}
                </strong>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {validationResult.message}
              </p>
            </div>
          )}
        </div>

        {/* Live MongoDB Documents Viewer */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={18} color="var(--accent-emerald)" />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>MongoDB taskdb Documents</h2>
            </div>
            <StatusBadge label={`${tasks.length} docs`} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '480px', overflowY: 'auto', paddingRight: '0.25rem' }}>
            {tasks.map((doc) => (
              <div
                key={doc._id}
                style={{
                  padding: '1rem',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
                      ObjectId("{doc._id}")
                    </span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '0.1rem' }}>
                      {doc.title}
                    </h4>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <StatusBadge label={doc.priority} />
                    <button
                      className="btn btn-danger btn-sm btn-icon"
                      onClick={() => handleDeleteDoc(doc._id)}
                      title="Delete from MongoDB"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  {doc.description || 'No description.'}
                </p>

                <div style={{ fontSize: '0.725rem', color: 'var(--text-dim)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Created: {new Date(doc.createdAt).toLocaleTimeString()}</span>
                  <span>Completed: {doc.completed ? 'True' : 'False'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
