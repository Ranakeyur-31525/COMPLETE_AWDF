import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

export default function TaskFormModal({ isOpen, onClose, onSubmit, initialData = null, isSubmitting = false }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setPriority(initialData.priority || 'medium');
      setCompleted(initialData.completed || false);
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setCompleted(false);
    }
    setError('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required.');
      return;
    }
    if (title.trim().length < 2) {
      setError('Title must be at least 2 characters long.');
      return;
    }

    setError('');
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      completed
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: '8px', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Sparkles size={18} />
            </div>
            <h3 className="modal-title">{initialData ? 'Edit Task' : 'Create New Task'}</h3>
          </div>
          <button className="action-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.6rem 0.9rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem', fontWeight: 500 }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="task-title">
              Task Title <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              id="task-title"
              type="text"
              className="form-input"
              placeholder="e.g. Design responsive UI components"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="task-description">
              Description (Optional)
            </label>
            <textarea
              id="task-description"
              className="form-textarea"
              placeholder="Add details, objectives, or references..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: initialData ? '1fr 1fr' : '1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="task-priority">
                Priority Level
              </label>
              <select
                id="task-priority"
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">🟢 Low Priority</option>
                <option value="medium">🟡 Medium Priority</option>
                <option value="high">🔴 High Priority</option>
              </select>
            </div>

            {initialData && (
              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <label className="form-label">Completion Status</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-primary)', marginTop: '0.4rem' }}>
                  <input
                    type="checkbox"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: 'var(--accent-primary)' }}
                  />
                  Mark as completed
                </label>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : initialData ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
