const API_BASE = 'http://localhost:5001/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('p7_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

const handleResponse = async (response, onUnauthorized) => {
  if (response.status === 401) {
    localStorage.removeItem('p7_token');
    localStorage.removeItem('p7_user');
    if (onUnauthorized) onUnauthorized();
    throw new Error('Session expired or unauthorized. Please log in again.');
  }

  const data = await response.json();
  if (!response.ok) {
    const errMsg = data.errors ? data.errors.join(', ') : data.error || data.message || 'Request failed';
    throw new Error(errMsg);
  }
  return data;
};

// Auth API calls
export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return handleResponse(res);
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return handleResponse(res);
};

export const getMe = async (onUnauthorized) => {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: getAuthHeaders()
  });
  return handleResponse(res, onUnauthorized);
};

// Task CRUD calls (Protected)
export const getTasks = async (onUnauthorized) => {
  const res = await fetch(`${API_BASE}/tasks`, {
    headers: getAuthHeaders()
  });
  return handleResponse(res, onUnauthorized);
};

export const createTask = async (taskData, onUnauthorized) => {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(taskData)
  });
  return handleResponse(res, onUnauthorized);
};

export const updateTask = async (id, updates, onUnauthorized) => {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates)
  });
  return handleResponse(res, onUnauthorized);
};

export const deleteTask = async (id, onUnauthorized) => {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return handleResponse(res, onUnauthorized);
};
