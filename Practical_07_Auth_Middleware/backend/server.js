require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taskdb_p7';

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// Health check
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Practical 07 - Authentication & Middleware Pipeline',
    dbState: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

// Database connection & server listen
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✔ MongoDB connected successfully to taskdb_p7');
    app.listen(PORT, () => {
      console.log(`🚀 Practical 7 Auth Server running on http://localhost:${PORT}`);
      console.log(`📌 Auth API: http://localhost:${PORT}/api/auth`);
      console.log(`📌 Protected Tasks API: http://localhost:${PORT}/api/tasks`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
  });

module.exports = app;
