import React, { useState, useEffect } from 'react';
import { Lock, LogIn, LogOut, User, CheckCircle, Plus, Trash2, AlertCircle } from 'lucide-react';
import { loginUser, registerUser, getMe, getTasks, createTask, updateTask, deleteTask } from './services/api';

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('p7_token'));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('p7_user'));
    } catch {
      return null;
    }
  });

  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [taskLoading, setTaskLoading] = useState(false);
  const [taskError, setTaskError] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');

  // Handle automatic logout on token expiry
  const handleUnauthorized = () => {
    setToken(null);
    setUser(null);
    setTasks([]);
    setAuthError('Session expired. Please log in again.');
  };

  // Load user profile and tasks on mount or token change
  useEffect(() => {
    if (token) {
      loadProfileAndTasks();
    }
  }, [token]);

  const loadProfileAndTasks = async () => {
    setTaskLoading(true);
    setTaskError('');
    try {
      const profile = await getMe(handleUnauthorized);
      setUser(profile.user);
      localStorage.setItem('p7_user', JSON.stringify(profile.user));

      const taskData = await getTasks(handleUnauthorized);
      setTasks(taskData.data || []);
    } catch (err) {
      setTaskError(err.message);
    } finally {
      setTaskLoading(false);
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    try {
      let res;
      if (authMode === 'login') {
        res = await loginUser({ email: authForm.email, password: authForm.password });
      } else {
        res = await registerUser(authForm);
      }
      localStorage.setItem('p7_token', res.token);
      localStorage.setItem('p7_user', JSON.stringify(res.user));
      setToken(res.token);
      setUser(res.user);
      setAuthForm({ name: '', email: '', password: '' });
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('p7_token');
    localStorage.removeItem('p7_user');
    setToken(null);
    setUser(null);
    setTasks([]);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      const res = await createTask({ title: newTaskTitle, priority: newTaskPriority }, handleUnauthorized);
      setTasks([res.data, ...tasks]);
      setNewTaskTitle('');
    } catch (err) {
      setTaskError(err.message);
    }
  };

  const handleToggleTask = async (task) => {
    try {
      const res = await updateTask(task._id, { completed: !task.completed }, handleUnauthorized);
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      setTaskError(err.message);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id, handleUnauthorized);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      setTaskError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 840, margin: '40px auto', padding: '0 20px', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Lock size={24} color="#6366f1" /> Practical 7: JWT Auth & Middleware
          </h1>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 14 }}>
            Bcrypt Password Hashing • JWT Verification • Input Validation • Route Protection
          </p>
        </div>
        {token && user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 13, background: '#f1f5f9', padding: '6px 12px', borderRadius: 20 }}>
              <User size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} /> {user.name} ({user.email})
            </span>
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
              <LogOut size={15} /> Logout
            </button>
          </div>
        )}
      </header>

      {!token ? (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 32, maxWidth: 440, margin: '40px auto', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 20 }}>{authMode === 'login' ? 'User Login' : 'Create New Account'}</h2>
          {authError && (
            <div style={{ background: '#fef2f2', color: '#b91c1c', padding: 10, borderRadius: 8, fontSize: 13, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={16} /> {authError}
            </div>
          )}
          <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {authMode === 'register' && (
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Full Name</label>
                <input
                  type="text"
                  required
                  value={authForm.name}
                  onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>
            )}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Email Address</label>
              <input
                type="email"
                required
                value={authForm.email}
                onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 4 }}>Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={authForm.password}
                onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
              />
            </div>
            <button
              type="submit"
              disabled={authLoading}
              style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '12px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, marginTop: 8 }}
            >
              {authLoading ? 'Processing...' : authMode === 'login' ? 'Sign In' : 'Register'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#64748b', marginTop: 18 }}>
            {authMode === 'login' ? "Don't have an account? " : 'Already registered? '}
            <button
              onClick={() => {
                setAuthMode(authMode === 'login' ? 'register' : 'login');
                setAuthError('');
              }}
              style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
            >
              {authMode === 'login' ? 'Register here' : 'Sign in here'}
            </button>
          </p>
        </div>
      ) : (
        <div>
          {/* Create Task Form */}
          <form onSubmit={handleCreateTask} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 18, display: 'flex', gap: 12, marginBottom: 24 }}>
            <input
              type="text"
              placeholder="Create a new protected task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              style={{ flex: 1, padding: '10px 14px', borderRadius: 6, border: '1px solid #cbd5e1' }}
            />
            <select
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value)}
              style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #cbd5e1' }}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button type="submit" style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 6, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Plus size={16} /> Add Task
            </button>
          </form>

          {taskError && (
            <div style={{ background: '#fef2f2', color: '#b91c1c', padding: 10, borderRadius: 8, fontSize: 13, marginBottom: 16 }}>
              {taskError}
            </div>
          )}

          {/* Task List */}
          {taskLoading ? (
            <p style={{ textAlign: 'center', color: '#64748b' }}>Loading protected tasks...</p>
          ) : tasks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, background: '#f8fafc', borderRadius: 12, border: '1px dashed #cbd5e1', color: '#64748b' }}>
              No tasks found for your user account. Add your first task above!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {tasks.map((task) => (
                <div
                  key={task._id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 10,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button
                      onClick={() => handleToggleTask(task)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: task.completed ? '#10b981' : '#cbd5e1' }}
                    >
                      <CheckCircle size={20} />
                    </button>
                    <div>
                      <h4 style={{ margin: 0, fontSize: 15, textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#94a3b8' : '#1e293b' }}>
                        {task.title}
                      </h4>
                      <span style={{ fontSize: 11, background: task.priority === 'high' ? '#fee2e2' : task.priority === 'medium' ? '#fef3c7' : '#e0f2fe', color: task.priority === 'high' ? '#b91c1c' : task.priority === 'medium' ? '#b45309' : '#0369a1', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>
                        {task.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
