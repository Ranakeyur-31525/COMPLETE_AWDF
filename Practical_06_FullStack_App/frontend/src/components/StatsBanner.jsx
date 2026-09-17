import React from 'react';
import { Layers, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function StatsBanner({ tasks = [] }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const highPriority = tasks.filter((t) => t.priority === 'high' && !t.completed).length;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon-wrapper stat-total">
          <Layers size={24} />
        </div>
        <div className="stat-content">
          <span className="stat-number">{total}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper stat-completed">
          <CheckCircle size={24} />
        </div>
        <div className="stat-content">
          <span className="stat-number">{completed}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper stat-pending">
          <Clock size={24} />
        </div>
        <div className="stat-content">
          <span className="stat-number">{pending}</span>
          <span className="stat-label">Pending</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon-wrapper stat-high">
          <AlertTriangle size={24} />
        </div>
        <div className="stat-content">
          <span className="stat-number">{highPriority}</span>
          <span className="stat-label">High Priority Active</span>
        </div>
      </div>
    </div>
  );
}
