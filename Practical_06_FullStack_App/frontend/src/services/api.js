/**
 * Practical 6: Centralized API Service for React & Express Integration
 * Base URL connects to Express backend running on port 5000
 */
const BASE_URL = 'http://localhost:5000';

/**
 * Fetch health status of the backend & MongoDB connection
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${BASE_URL}/`, { method: 'GET' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Backend health check error:', error);
    return { status: 'offline', error: error.message };
  }
}

/**
 * Fetch all tasks with optional search, priority, and completed filters
 * GET /tasks
 */
export async function getTasks(filters = {}) {
  const queryParams = new URLSearchParams();
  if (filters.search) queryParams.append('search', filters.search);
  if (filters.priority && filters.priority !== 'all') queryParams.append('priority', filters.priority);
  if (filters.completed !== undefined && filters.completed !== 'all') queryParams.append('completed', filters.completed);

  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
  const res = await fetch(`${BASE_URL}/tasks${queryString}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Failed to fetch tasks');
  }
  return json.data || [];
}

/**
 * Fetch a single task by its MongoDB ObjectId
 * GET /tasks/:id
 */
export async function getTaskById(id) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || `Failed to fetch task ${id}`);
  }
  return json.data;
}

/**
 * Create a new task document in MongoDB
 * POST /tasks
 */
export async function createTask(taskData) {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    const errorMessage = json.details ? json.details.join(', ') : json.error || 'Failed to create task';
    throw new Error(errorMessage);
  }
  return json.data;
}

/**
 * Update an existing task in MongoDB
 * PUT /tasks/:id
 */
export async function updateTask(id, taskData) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    const errorMessage = json.details ? json.details.join(', ') : json.error || 'Failed to update task';
    throw new Error(errorMessage);
  }
  return json.data;
}

/**
 * Delete a task document from MongoDB
 * DELETE /tasks/:id
 */
export async function deleteTask(id) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || 'Failed to delete task');
  }
  return json.deletedId || id;
}
