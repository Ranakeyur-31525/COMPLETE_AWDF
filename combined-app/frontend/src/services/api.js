/**
 * AWDF Master API Service Layer
 * Connects to the Express backend (Port 5000) and public GitHub REST API v3
 */

const BASE_URL = 'http://localhost:5000';

// ==========================================
// SYSTEM & SERVER HEALTH
// ==========================================
export async function getSystemHealth() {
  try {
    const res = await fetch(`${BASE_URL}/`, { method: 'GET' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('System health check error:', error);
    return { status: 'offline', error: error.message };
  }
}

// ==========================================
// PRACTICAL 3: GITHUB REST API INTEGRATION
// ==========================================
export async function fetchGitHubUser(username = 'Ranakeyur-31525') {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error(`GitHub user '${username}' not found.`);
    throw new Error(`GitHub API Error: HTTP ${res.status}`);
  }
  return await res.json();
}

export async function fetchGitHubRepos(username = 'Ranakeyur-31525', simulateError = false) {
  if (simulateError) {
    // Artificial error endpoint for viva / lab evaluation demonstration
    const res = await fetch(`https://api.github.com/users/${username}/invalid_nonexistent_route_404`);
    if (!res.ok) throw new Error(`Simulated 404 Error: Failed to fetch repositories from GitHub API`);
  }
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`);
  if (!res.ok) throw new Error(`Failed to load repositories (HTTP ${res.status})`);
  return await res.json();
}

// ==========================================
// PRACTICAL 4: IN-MEMORY EXPRESS REST API
// ==========================================
export async function getP4Tasks(filters = {}) {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.priority && filters.priority !== 'all') params.append('priority', filters.priority);
  if (filters.completed !== undefined && filters.completed !== 'all') params.append('completed', filters.completed);

  const query = params.toString() ? `?${params.toString()}` : '';
  const res = await fetch(`${BASE_URL}/api/p4/tasks${query}`);
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.error || 'Failed to fetch Practical 4 tasks');
  return data.data;
}

export async function createP4Task(taskData) {
  const res = await fetch(`${BASE_URL}/api/p4/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.error || 'Failed to create task in P4 store');
  return data;
}

export async function updateP4Task(id, taskData) {
  const res = await fetch(`${BASE_URL}/api/p4/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.error || 'Failed to update task in P4 store');
  return data;
}

export async function deleteP4Task(id) {
  const res = await fetch(`${BASE_URL}/api/p4/tasks/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.error || 'Failed to delete task from P4 store');
  return data;
}

export async function resetP4Tasks() {
  const res = await fetch(`${BASE_URL}/api/p4/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  return await res.json();
}

// ==========================================
// PRACTICAL 5: MONGODB & MONGOOSE SCHEMA API
// ==========================================
export async function getP5SchemaInfo() {
  const res = await fetch(`${BASE_URL}/api/p5/tasks/schema-info`);
  return await res.json();
}

export async function getP5Tasks(filters = {}) {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.priority && filters.priority !== 'all') params.append('priority', filters.priority);
  if (filters.completed !== undefined && filters.completed !== 'all') params.append('completed', filters.completed);

  const query = params.toString() ? `?${params.toString()}` : '';
  const res = await fetch(`${BASE_URL}/api/p5/tasks${query}`);
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.error || 'Failed to fetch Practical 5 tasks');
  return data.data;
}

export async function createP5Task(taskData) {
  const res = await fetch(`${BASE_URL}/api/p5/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    const errorMsg = data.details ? data.details.join(' | ') : data.error || 'Mongoose validation failed';
    throw new Error(errorMsg);
  }
  return data;
}

export async function updateP5Task(id, taskData) {
  const res = await fetch(`${BASE_URL}/api/p5/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    const errorMsg = data.details ? data.details.join(' | ') : data.error || 'Update failed';
    throw new Error(errorMsg);
  }
  return data;
}

export async function deleteP5Task(id) {
  const res = await fetch(`${BASE_URL}/api/p5/tasks/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.error || 'Deletion failed');
  return data;
}

// ==========================================
// PRACTICAL 6: FULL STACK TASK MANAGER
// ==========================================
export async function getP6Stats() {
  try {
    const res = await fetch(`${BASE_URL}/api/p6/tasks/stats`);
    const data = await res.json();
    return data.stats || { total: 0, completed: 0, pending: 0, high: 0, medium: 0, low: 0 };
  } catch (error) {
    console.error('Failed to load stats:', error);
    return null;
  }
}

export async function getP6Tasks(filters = {}) {
  const params = new URLSearchParams();
  if (filters.search) params.append('search', filters.search);
  if (filters.priority && filters.priority !== 'all') params.append('priority', filters.priority);
  if (filters.completed !== undefined && filters.completed !== 'all') params.append('completed', filters.completed);

  const query = params.toString() ? `?${params.toString()}` : '';
  const res = await fetch(`${BASE_URL}/tasks${query}`);
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.error || 'Failed to load tasks');
  return data.data || [];
}

export async function createP6Task(taskData) {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    const errorMsg = data.details ? data.details.join(', ') : data.error || 'Failed to create task';
    throw new Error(errorMsg);
  }
  return data.data;
}

export async function updateP6Task(id, taskData) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    const errorMsg = data.details ? data.details.join(', ') : data.error || 'Failed to update task';
    throw new Error(errorMsg);
  }
  return data.data;
}

export async function deleteP6Task(id) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.error || 'Failed to delete task');
  return data.deletedId || id;
}
