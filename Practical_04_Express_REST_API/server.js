const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { loggerMiddleware } = require('./middleware/customMiddleware');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 4004;

// 1. Global Request Logger Middleware (logs method, URL, and timestamp for every request)
app.use(loggerMiddleware);

// 2. Standard Middleware Pipeline
app.use(cors());
app.use(express.json());

// 3. Root Endpoint / Health Check & Interactive Browser Dashboard
app.get('/', (req, res) => {
  if (req.headers.accept && req.headers.accept.includes('text/html')) {
    return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><title>Practical 4: Express In-Memory REST API</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 24px; }
    .card { background: #1e293b; border-radius: 12px; padding: 24px; max-width: 800px; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.5); border: 1px solid #334155; }
    h1 { margin-top: 0; color: #38bdf8; font-size: 24px; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; background: #0284c7; color: #fff; font-size: 12px; font-weight: bold; }
    .btn { background: #38bdf8; color: #0f172a; border: none; padding: 10px 18px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s; margin-right: 8px; }
    .btn:hover { background: #7dd3fc; }
    pre { background: #090d16; padding: 16px; border-radius: 8px; overflow-x: auto; color: #a5f3fc; border: 1px solid #1e293b; max-height: 350px; }
    .input-group { margin: 16px 0; display: flex; gap: 8px; }
    input { flex: 1; padding: 10px 14px; border-radius: 8px; border: 1px solid #475569; background: #0f172a; color: #fff; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">Practical 4 • Standalone Server (Port ${PORT})</span>
    <h1>Node.js & Express RESTful API (In-Memory)</h1>
    <p style="color: #94a3b8;">Student: <strong>Keyur Rana (D25DCE176)</strong> • Storage: In-Memory Data Store</p>
    
    <div class="input-group">
      <input type="text" id="taskTitle" placeholder="Enter task title (e.g. Test In-Memory Storage)..." />
      <button class="btn" onclick="createTask()">+ Add Task (POST)</button>
    </div>

    <div style="margin: 16px 0;">
      <button class="btn" onclick="loadTasks()">🔄 Refresh Tasks (GET /tasks)</button>
      <button class="btn" style="background: #e2e8f0; color: #0f172a;" onclick="viewEndpoints()">📌 View API Endpoints</button>
    </div>

    <h3>API Response Output:</h3>
    <pre id="output">Click "Refresh Tasks" or add a new task above to test the RESTful API.</pre>
  </div>

  <script>
    async function loadTasks() {
      const res = await fetch('/tasks');
      const data = await res.json();
      document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    }
    async function createTask() {
      const title = document.getElementById('taskTitle').value.trim();
      if (!title) return alert('Enter a title');
      const res = await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false })
      });
      const data = await res.json();
      document.getElementById('taskTitle').value = '';
      loadTasks();
    }
    async function viewEndpoints() {
      const res = await fetch('/', { headers: { 'Accept': 'application/json' } });
      const data = await res.json();
      document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    }
    loadTasks();
  </script>
</body>
</html>`);
  }

  res.status(200).json({
    message: 'Practical 4: Task Management RESTful API Server',
    student: 'Keyur Rana (D25DCE176)',
    storageType: 'In-Memory Data Store',
    status: 'Running',
    port: PORT,
    endpoints: {
      getAllTasks: 'GET /tasks',
      getSingleTask: 'GET /tasks/:id',
      createTask: 'POST /tasks',
      updateTask: 'PUT /tasks/:id',
      deleteTask: 'DELETE /tasks/:id'
    }
  });
});

// 4. Mount Task REST API Routes
app.use('/tasks', taskRoutes);

// 5. 404 Undefined Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.url} - Endpoint not found`
  });
});

// 6. Global Centralized Error Handling Middleware (MUST be last middleware)
app.use((err, req, res, next) => {
  console.error('❌ Server Internal Error:', err.stack || err.message);

  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

// 7. Start Express Server
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🚀 Express REST API Server running on port ${PORT}`);
  console.log(`📌 Root URL: http://localhost:${PORT}/`);
  console.log(`📌 Task API: http://localhost:${PORT}/tasks`);
  console.log(`===================================================`);
});
