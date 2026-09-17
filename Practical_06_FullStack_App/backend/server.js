const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5006;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskdb_p6';

// 1. Global Request Logger Middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// 2. Standard Middleware Pipeline
// Enable CORS for React frontend (Vite running on localhost:5173 or any origin)
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());

// 3. Root Endpoint / Health Check
app.get('/', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
  };

  res.status(200).json({
    message: 'Practical 6: Full Stack Task Manager API',
    course: 'Advanced Web Development Frameworks (ITUE301)',
    student: 'Ranak (Ranakeyur-31525)',
    status: 'online',
    database: {
      name: 'taskdb',
      status: dbStatusMap[dbState] || 'Unknown',
      uri: MONGO_URI
    },
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

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details
    });
  }

  // Mongoose CastError (e.g. invalid ObjectId format)
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
      console.log(`🚀 Full-Stack Backend running on http://localhost:${PORT}`);
      console.log(`📌 Task API available at http://localhost:${PORT}/tasks`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });
