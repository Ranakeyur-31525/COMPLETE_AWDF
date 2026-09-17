import React from 'react';
import { Check, Edit2, Trash2, Calendar, AlertCircle } from 'lucide-react';

export default function TaskCard({ task, onToggleStatus, onEdit, onDelete }) {
  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div>
        <div className="task-card-header">
          <button
            className={`checkbox-toggle ${task.completed ? 'checked' : ''}`}
            onClick={() => onToggleStatus(task)}
            title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
            aria-label="Toggle task status"
          >
            {task.completed && <Check size={16} strokeWidth={3} />}
          </button>
          <h3 className={`task-title ${task.completed ? 'strikethrough' : ''}`}>{task.title}</h3>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>

      <div className="task-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span className={`priority-badge ${task.priority || 'medium'}`}>
            <AlertCircle size={12} />
            {task.priority || 'medium'}
          </span>
          <span className="task-time" title="Created date">
            <Calendar size={12} style={{ display: 'inline', marginRight: 3, verticalAlign: 'middle' }} />
            {formatDate(task.createdAt)}
          </span>
        </div>

        <div className="task-actions">
          <button
            className="action-btn edit"
            onClick={() => onEdit(task)}
            title="Edit task"
            aria-label="Edit task"
          >
            <Edit2 size={15} />
          </button>
          <button
            className="action-btn delete"
            onClick={() => onDelete(task)}
            title="Delete task"
            aria-label="Delete task"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
