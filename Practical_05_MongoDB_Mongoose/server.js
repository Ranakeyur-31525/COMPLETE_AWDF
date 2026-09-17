const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 4005;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskdb_p5';

// 1. Global Request Logger Middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// 2. Standard Middleware Pipeline
app.use(cors());
app.use(express.json());

// 3. Root Endpoint / Health Check & Interactive Browser Dashboard
app.get('/', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
  };

  if (req.headers.accept && req.headers.accept.includes('text/html')) {
    return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><title>Practical 5: MongoDB & Mongoose Schema</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 24px; }
    .card { background: #1e293b; border-radius: 12px; padding: 24px; max-width: 800px; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.5); border: 1px solid #334155; }
    h1 { margin-top: 0; color: #10b981; font-size: 24px; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; background: #059669; color: #fff; font-size: 12px; font-weight: bold; }
    .status-pill { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 12px; background: ${dbState === 1 ? '#065f46' : '#7f1d1d'}; color: ${dbState === 1 ? '#6ee7b7' : '#fca5a5'}; }
    .btn { background: #10b981; color: #0f172a; border: none; padding: 10px 18px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s; margin-right: 8px; }
    .btn:hover { background: #34d399; }
    pre { background: #090d16; padding: 16px; border-radius: 8px; overflow-x: auto; color: #6ee7b7; border: 1px solid #1e293b; max-height: 350px; }
    .input-group { margin: 16px 0; display: flex; gap: 8px; }
    input, select { padding: 10px 14px; border-radius: 8px; border: 1px solid #475569; background: #0f172a; color: #fff; }
    input { flex: 1; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">Practical 5 • Standalone Server (Port ${PORT})</span>
    <h1>MongoDB Integration & Mongoose Schema Design</h1>
    <p style="color: #94a3b8;">
      Student: <strong>Keyur Rana (D25DCE176)</strong> • Database: <code>taskdb_p5</code> 
      <span class="status-pill">${dbStatusMap[dbState] || 'Unknown'}</span>
    </p>
    
    <div class="input-group">
      <input type="text" id="taskTitle" placeholder="Task title (e.g. Mongoose ODM Validation)..." />
      <select id="taskPriority">
        <option value="low">Low</option>
        <option value="medium" selected>Medium</option>
        <option value="high">High</option>
      </select>
      <button class="btn" onclick="createTask()">+ Insert (POST)</button>
    </div>

    <div style="margin: 16px 0;">
      <button class="btn" onclick="loadTasks()">🔄 Fetch Mongoose Documents (GET /tasks)</button>
      <button class="btn" style="background: #e2e8f0; color: #0f172a;" onclick="viewEndpoints()">📌 View Connection & Schema</button>
    </div>

    <h3>MongoDB Document Collection Output:</h3>
    <pre id="output">Click "Fetch Mongoose Documents" or create a task above to query MongoDB.</pre>
  </div>

  <script>
    async function loadTasks() {
      const res = await fetch('/tasks');
      const data = await res.json();
      document.getElementById('output').textContent = JSON.stringify(data, null, 2);
    }
    async function createTask() {
      const title = document.getElementById('taskTitle').value.trim();
      const priority = document.getElementById('taskPriority').value;
      if (!title) return alert('Enter a title');
      const res = await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, priority, completed: false })
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
    message: 'Practical 5: MongoDB & Mongoose Integration API',
    student: 'Keyur Rana (D25DCE176)',
    database: {
      name: 'taskdb_p5',
      status: dbStatusMap[dbState] || 'Unknown',
      uri: MONGO_URI
    },
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

// 4. API Routes
app.use('/tasks', taskRoutes);

// 5. 404 Route Not Found Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.url} - Endpoint not found`
  });
});

// 6. Global Centralized Error Handling Middleware (must be defined LAST)
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);

  // Mongoose Validation Error (e.g. required field missing or enum invalid)
  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details
    });
  }

  // Mongoose CastError (e.g. invalid 24-character hexadecimal ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: `Invalid format for field '${err.path}': ${err.value}`
    });
  }

  // Generic Error Fallback
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// 7. Connect to MongoDB and Start Express Server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    console.log(`📊 Connected Database: taskdb (${MONGO_URI})`);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📌 Task API available at http://localhost:${PORT}/tasks`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });
