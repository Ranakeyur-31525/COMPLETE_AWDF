const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { loggerMiddleware } = require('./middleware/customMiddleware');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// 1. Global Request Logger Middleware (logs method, URL, and timestamp for every request)
app.use(loggerMiddleware);

// 2. Standard Middleware Pipeline
app.use(cors());
app.use(express.json());

// 3. Root Endpoint / Health Check
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Practical 4: Task Management RESTful API Server',
    student: 'Ranak (Ranakeyur-31525)',
    storageType: 'In-Memory Data Store',
    status: 'Running',
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
