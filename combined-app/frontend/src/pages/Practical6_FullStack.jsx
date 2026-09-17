import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Edit3, 
  RefreshCw, 
  Calendar,
  AlertTriangle,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { 
  getP6Tasks, 
  createP6Task, 
  updateP6Task, 
  deleteP6Task, 
  getP6Stats 
} from '../services/api';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

export default function Practical6_FullStack({ onToast }) {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Create / Edit Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    completed: false
  });

  // Delete Confirmation Modal State
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, taskId: null, taskTitle: '' });

  const loadAll = async () => {
    setLoading(true);
    try {
      const filters = {};
      if (search) filters.search = search;
      if (priorityFilter !== 'all') filters.priority = priorityFilter;
      if (statusFilter !== 'all') filters.completed = statusFilter === 'completed';

      const [tasksData, statsData] = await Promise.all([
        getP6Tasks(filters),
        getP6Stats()
      ]);
      setTasks(tasksData);
      setStats(statsData);
    } catch (err) {
      onToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, [priorityFilter, statusFilter]);

  // Handle Search on Enter or debounce
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadAll();
  };

  // Inline completion toggle with optimistic update
  const handleToggleCompleted = async (task) => {
    const updatedStatus = !task.completed;
    
    // Optimistic state update
    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? { ...t, completed: updatedStatus } : t))
    );

    try {
      await updateP6Task(task._id, { completed: updatedStatus });
      onToast(`Task marked as ${updatedStatus ? 'completed' : 'pending'}`, 'success');
      // Refresh stats
      const newStats = await getP6Stats();
      setStats(newStats);
    } catch (err) {
      // Revert optimistic update on failure
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, completed: task.completed } : t))
      );
      onToast(`Failed to update status: ${err.message}`, 'error');
    }
  };

  // Open Form for Create
  const handleOpenCreate = () => {
    setEditingTask(null);
    setTaskForm({ title: '', description: '', priority: 'medium', completed: false });
    setIsFormOpen(true);
  };

  // Open Form for Edit
  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      completed: task.completed
    });
    setIsFormOpen(true);
  };

  // Save Task (Create or Update)
  const handleSaveTask = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await updateP6Task(editingTask._id, taskForm);
        onToast('Task updated successfully!', 'success');
      } else {
        await createP6Task(taskForm);
        onToast('Task created successfully!', 'success');
      }
      setIsFormOpen(false);
      loadAll();
    } catch (err) {
      onToast(err.message, 'error');
    }
  };

  // Open Delete Confirmation
  const handlePromptDelete = (task) => {
    setDeleteModal({
      isOpen: true,
      taskId: task._id,
      taskTitle: task.title
    });
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    const id = deleteModal.taskId;
    setDeleteModal({ isOpen: false, taskId: null, taskTitle: '' });
    try {
      await deleteP6Task(id);
      onToast('Task deleted from MongoDB.', 'success');
      loadAll();
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
              PRACTICAL 06
            </span>
            <StatusBadge label="Full Stack Decoupled Application" />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Full-Stack Task Manager (MERN)
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '0.25rem' }}>
            React SPA wired to Express & MongoDB backend via centralized API service with real-time state synchronization.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={loadAll} title="Refresh Tasks">
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
          <button className="btn btn-primary" onClick={handleOpenCreate}>
            <Plus size={16} />
            <span>Add New Task</span>
          </button>
        </div>
      </div>

      {/* Real-Time Stats Overview Cards */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>Total Tasks</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.25rem' }}>{stats.total}</div>
          </div>
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700, textTransform: 'uppercase' }}>Completed</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.25rem', color: 'var(--accent-emerald)' }}>{stats.completed}</div>
          </div>
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', fontWeight: 700, textTransform: 'uppercase' }}>Pending</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.25rem', color: 'var(--accent-amber)' }}>{stats.pending}</div>
          </div>
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>Completion Rate</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.25rem', color: 'var(--accent-cyan)' }}>{stats.completionRate}%</div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '1.25rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Search form */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', flex: 1, minWidth: '260px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '2.4rem' }}
                placeholder="Search tasks by title or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-secondary">
              Search
            </button>
          </form>

          {/* Priority filter pills */}
          <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600, marginRight: '0.25rem' }}>Priority:</span>
            {['all', 'high', 'medium', 'low'].map((p) => (
              <button
                key={p}
                className={`btn btn-sm ${priorityFilter === p ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setPriorityFilter(p)}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Status filter pills */}
          <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600, marginRight: '0.25rem' }}>Status:</span>
            {['all', 'active', 'completed'].map((s) => (
              <button
                key={s}
                className={`btn btn-sm ${statusFilter === s ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setStatusFilter(s)}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {tasks.length === 0 && !loading && (
          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <Sparkles size={32} color="var(--accent-primary)" style={{ margin: '0 auto 0.75rem' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>No tasks found</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
              Try adjusting your search query or priority filters, or click "Add New Task" to create one.
            </p>
          </div>
        )}

        {tasks.map((task) => (
          <div
            key={task._id}
            className="glass-card interactive"
            style={{
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              opacity: task.completed ? 0.75 : 1
            }}
          >
            {/* Inline Checkbox Toggle */}
            <button
              onClick={() => handleToggleCompleted(task)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: task.completed ? 'var(--accent-emerald)' : 'var(--text-dim)'
              }}
              title={task.completed ? 'Mark as Pending' : 'Mark as Completed'}
            >
              {task.completed ? (
                <CheckCircle2 size={24} color="var(--accent-emerald)" />
              ) : (
                <Circle size={24} />
              )}
            </button>

            {/* Task Info */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                <h3 style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? 'var(--text-dim)' : 'var(--text-main)'
                }}>
                  {task.title}
                </h3>
                <StatusBadge label={task.priority} />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Calendar size={12} />
                  {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>

              {task.description && (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {task.description}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className="btn btn-secondary btn-sm btn-icon"
                onClick={() => handleOpenEdit(task)}
                title="Edit Task"
              >
                <Edit3 size={15} />
              </button>
              <button
                className="btn btn-danger btn-sm btn-icon"
                onClick={() => handlePromptDelete(task)}
                title="Delete Task"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Task Create / Edit Modal Form */}
      {isFormOpen && (
        <div className="modal-overlay" onClick={() => setIsFormOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>
              {editingTask ? 'Edit Task Document' : 'Create New Task in MongoDB'}
            </h2>

            <form onSubmit={handleSaveTask}>
              <div className="form-group">
                <label className="form-label" htmlFor="f-title">
                  Task Title <span style={{ color: 'var(--accent-rose)' }}>*</span>
                </label>
                <input
                  id="f-title"
                  type="text"
                  className="form-input"
                  placeholder="Enter task title..."
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="f-desc">
                  Description
                </label>
                <textarea
                  id="f-desc"
                  className="form-textarea"
                  placeholder="Additional task details..."
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="f-priority">Priority</label>
                  <select
                    id="f-priority"
                    className="form-select"
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="f-completed">Status</label>
                  <select
                    id="f-completed"
                    className="form-select"
                    value={taskForm.completed.toString()}
                    onChange={(e) => setTaskForm({ ...taskForm, completed: e.target.value === 'true' })}
                  >
                    <option value="false">Pending</option>
                    <option value="true">Completed</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingTask ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        title="Delete Task Confirmation"
        message={`Are you sure you want to permanently delete "${deleteModal.taskTitle}" from MongoDB taskdb? This action cannot be undone.`}
        confirmText="Delete Document"
        confirmDanger={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, taskId: null, taskTitle: '' })}
      />
    </div>
  );
}
