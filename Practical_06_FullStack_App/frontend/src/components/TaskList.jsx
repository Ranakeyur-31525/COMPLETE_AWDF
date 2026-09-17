import React from 'react';
import { Search, Filter, FolderPlus, Inbox } from 'lucide-react';
import TaskCard from './TaskCard';

export default function TaskList({
  tasks,
  searchQuery,
  onSearchChange,
  priorityFilter,
  onPriorityFilterChange,
  statusFilter,
  onStatusFilterChange,
  onToggleStatus,
  onEdit,
  onDelete,
  onOpenCreateModal
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Toolbar & Filter Bar */}
      <div className="toolbar-glass">
        <div className="search-box">
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search tasks by title..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Filter size={16} style={{ color: 'var(--text-muted)' }} />
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              aria-label="Filter by Status"
            >
              <option value="all">All Statuses</option>
              <option value="false">⏳ Active / Pending</option>
              <option value="true">✅ Completed</option>
            </select>
          </div>

          <select
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value)}
            aria-label="Filter by Priority"
          >
            <option value="all">All Priorities</option>
            <option value="high">🔴 High Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="low">🟢 Low Priority</option>
          </select>
        </div>
      </div>

      {/* Task Cards Grid or Empty State */}
      {tasks.length === 0 ? (
        <div className="empty-state">
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(99, 102, 241, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
            <Inbox size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem' }}>No Tasks Found</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 360, fontSize: '0.95rem' }}>
            {searchQuery || priorityFilter !== 'all' || statusFilter !== 'all'
              ? 'No tasks match your current search or filter criteria. Try adjusting the filters.'
              : 'Your task list is empty. Create your first task to get started!'}
          </p>
          <button className="btn btn-primary" onClick={onOpenCreateModal} style={{ marginTop: '0.5rem' }}>
            <FolderPlus size={18} /> Create Task
          </button>
        </div>
      ) : (
        <div className="tasks-grid">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggleStatus={onToggleStatus}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
