const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { loggerMiddleware } = require('./middleware/customMiddleware');
const p4TaskRoutes = require('./routes/p4TaskRoutes');
const p5TaskRoutes = require('./routes/p5TaskRoutes');
const p6TaskRoutes = require('./routes/p6TaskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskdb';

// 1. Global Request Logger
app.use(loggerMiddleware);

// 2. CORS & JSON Parser
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());

// 3. Root Endpoint / Health Check & Course Portal Info
app.get('/', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
  };

  res.status(200).json({
    project: 'AWDF All Practicals Unified Server',
    course: 'Advanced Web Development Frameworks (ITUE301)',
    institution: 'CHARUSAT - CSPIT (IT)',
    student: 'Ranak (Ranakeyur-31525)',
    status: 'online',
    timestamp: new Date().toISOString(),
    database: {
      name: 'taskdb',
      status: dbStatusMap[dbState] || 'Unknown',
      uri: MONGO_URI
    },
    practicals: {
      practical1: {
        title: 'Student Portfolio',
        type: 'Frontend SPA (React + Vite)',
        status: 'Mounted in Frontend Portal'
      },
      practical2: {
        title: 'State Management and Routing',
        type: 'Frontend SPA (React Router v6 + useState)',
        status: 'Mounted in Frontend Portal'
      },
      practical3: {
        title: 'GitHub API Integration',
        type: 'Frontend SPA (GitHub REST API v3 + useEffect)',
        status: 'Mounted in Frontend Portal'
      },
      practical4: {
        title: 'Node.js & Express RESTful API (In-Memory)',
        type: 'Backend REST API',
        endpoints: {
          getAll: 'GET /api/p4/tasks',
          getOne: 'GET /api/p4/tasks/:id',
          create: 'POST /api/p4/tasks',
          update: 'PUT /api/p4/tasks/:id',
          delete: 'DELETE /api/p4/tasks/:id',
          reset: 'POST /api/p4/reset'
        }
      },
      practical5: {
        title: 'MongoDB Integration & Mongoose Schema Design',
        type: 'Backend REST API with ODM',
        endpoints: {
          schemaInfo: 'GET /api/p5/tasks/schema-info',
          getAll: 'GET /api/p5/tasks',
          getOne: 'GET /api/p5/tasks/:id',
          create: 'POST /api/p5/tasks',
          update: 'PUT /api/p5/tasks/:id',
          delete: 'DELETE /api/p5/tasks/:id'
        }
      },
      practical6: {
        title: 'Full Stack Integration (React + Node + MongoDB)',
        type: 'Full Stack decoupled architecture',
        endpoints: {
          stats: 'GET /api/p6/tasks/stats',
          getAll: 'GET /tasks (or /api/p6/tasks)',
          getOne: 'GET /tasks/:id',
          create: 'POST /tasks',
          update: 'PUT /tasks/:id',
          delete: 'DELETE /tasks/:id'
        }
      }
    }
  });
});

// 4. Mount API Routes
app.use('/api/p4/tasks', p4TaskRoutes);
app.use('/api/p5/tasks', p5TaskRoutes);
app.use('/api/p6/tasks', p6TaskRoutes);
app.use('/tasks', p6TaskRoutes); // Backward-compatible with standalone Practical 6 frontend

// 5. 404 Route Catch-All
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.originalUrl || req.url} - Endpoint not found`,
    hint: 'Check GET / for full list of available practical endpoints'
  });
});

// 6. Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);

  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: `Invalid format for field '${err.path}': ${err.value}`
    });
  }

  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// 7. Connect to MongoDB and Start Server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('===================================================');
    console.log('✅ MongoDB connected successfully!');
    console.log(`📊 Connected Database: taskdb (${MONGO_URI})`);
    console.log(`🚀 AWDF Unified Server running on http://localhost:${PORT}`);
    console.log(`📌 Master API Portal: http://localhost:${PORT}/`);
    console.log(`📌 Practical 4 (In-Memory API): http://localhost:${PORT}/api/p4/tasks`);
    console.log(`📌 Practical 5 (Mongoose API): http://localhost:${PORT}/api/p5/tasks`);
    console.log(`📌 Practical 6 (Full-Stack API): http://localhost:${PORT}/tasks`);
    console.log('===================================================');

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });
