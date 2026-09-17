import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import StatsBanner from './components/StatsBanner';
import TaskList from './components/TaskList';
import TaskFormModal from './components/TaskFormModal';
import ConfirmModal from './components/ConfirmModal';
import Toast from './components/Toast';
import Spinner from './components/Spinner';
import ErrorMessage from './components/ErrorMessage';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  checkBackendHealth
} from './services/api';
import './App.css';

export default function App() {
  // State management
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backendHealth, setBackendHealth] = useState({ status: 'checking' });

  // Filtering & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deletingTask, setDeletingTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast feedback state
  const [toasts, setToasts] = useState([]);

  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('p06_theme') || 'dark';
  });

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Sync theme with DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('p06_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Fetch tasks from Express REST API
  const fetchTasks = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);
    setError(null);
    try {
      const [tasksData, healthData] = await Promise.all([
        getTasks(),
        checkBackendHealth()
      ]);
      setTasks(tasksData);
      setBackendHealth(healthData);
    } catch (err) {
      console.error('Fetch tasks error:', err);
      setError(err.message || 'Failed to connect to Express backend');
      setBackendHealth({ status: 'offline' });
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  // Initial fetch on component mount
  useEffect(() => {
    fetchTasks(true);
  }, [fetchTasks]);

  // Periodic health check (every 15s)
  useEffect(() => {
    const interval = setInterval(async () => {
      const health = await checkBackendHealth();
      setBackendHealth(health);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // CREATE or UPDATE task handler
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingTask) {
        // Update existing task (PUT /tasks/:id)
        const updated = await updateTask(editingTask._id, formData);
        setTasks((prev) =>
          prev.map((t) => (t._id === editingTask._id ? updated : t))
        );
        addToast(`Task "${updated.title}" updated successfully!`, 'success');
      } else {
        // Create new task (POST /tasks)
        const created = await createTask(formData);
        setTasks((prev) => [created, ...prev]);
        addToast(`Task "${created.title}" created successfully!`, 'success');
      }
      setIsFormModalOpen(false);
      setEditingTask(null);
    } catch (err) {
      addToast(err.message || 'Failed to save task', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // TOGGLE completion status (PUT /tasks/:id)
  const handleToggleStatus = async (task) => {
    const updatedStatus = !task.completed;
    // Optimistic UI state update
    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? { ...t, completed: updatedStatus } : t))
    );

    try {
      await updateTask(task._id, { completed: updatedStatus });
      addToast(
        `Task marked as ${updatedStatus ? 'completed' : 'pending'}`,
        'success'
      );
    } catch (err) {
      // Revert on error
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, completed: task.completed } : t))
      );
      addToast(`Failed to update status: ${err.message}`, 'error');
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setIsFormModalOpen(true);
  };

  // Open Delete Confirmation Modal
  const handleOpenDelete = (task) => {
    setDeletingTask(task);
    setIsConfirmModalOpen(true);
  };

  // DELETE task (DELETE /tasks/:id)
  const handleConfirmDelete = async () => {
    if (!deletingTask) return;
    try {
      await deleteTask(deletingTask._id);
      setTasks((prev) => prev.filter((t) => t._id !== deletingTask._id));
      addToast(`Task "${deletingTask.title}" deleted successfully`, 'success');
      setIsConfirmModalOpen(false);
      setDeletingTask(null);
    } catch (err) {
      addToast(`Failed to delete task: ${err.message}`, 'error');
    }
  };

  // Client-side filtering logic for reactive search & priority
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPriority =
      priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'true' && task.completed) ||
      (statusFilter === 'false' && !task.completed);

    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="app-container">
      {/* Header with DB Status Badge and New Task action */}
      <Header
        backendHealth={backendHealth}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenCreateModal={() => {
          setEditingTask(null);
          setIsFormModalOpen(true);
        }}
      />

      {/* Metrics Banner */}
      <StatsBanner tasks={tasks} />

      {/* Main Content Area */}
      {loading ? (
        <Spinner message="Connecting to Express REST API & fetching tasks from MongoDB..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={() => fetchTasks(true)} />
      ) : (
        <TaskList
          tasks={filteredTasks}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onToggleStatus={handleToggleStatus}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          onOpenCreateModal={() => {
            setEditingTask(null);
            setIsFormModalOpen(true);
          }}
        />
      )}

      {/* Create / Edit Task Modal */}
      <TaskFormModal
        isOpen={isFormModalOpen}
        initialData={editingTask}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title="Delete Task"
        message={`Are you sure you want to delete "${deletingTask?.title}"? This task will be permanently removed from MongoDB.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsConfirmModalOpen(false);
          setDeletingTask(null);
        }}
        confirmText="Delete Task"
        isDanger={true}
      />

      {/* Stacked Floating Toasts */}
      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
