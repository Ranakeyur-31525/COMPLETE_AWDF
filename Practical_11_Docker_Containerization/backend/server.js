require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5011;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taskdb_p11';

app.use(cors({ origin: '*' }));
app.use(express.json());

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

const Task = mongoose.model('ContainerTask', TaskSchema);

app.get('/', (req, res) => {
  if (req.headers.accept && req.headers.accept.includes('text/html')) {
    return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><title>Practical 11: Containerization</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 24px; }
    .card { background: #1e293b; border-radius: 12px; padding: 24px; max-width: 850px; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.5); border: 1px solid #334155; }
    h1 { margin-top: 0; color: #0284c7; font-size: 24px; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; background: #0284c7; color: #fff; font-size: 12px; font-weight: bold; }
    pre { background: #090d16; padding: 16px; border-radius: 8px; overflow-x: auto; color: #bae6fd; border: 1px solid #1e293b; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">Practical 11 • Docker Containerization Tier (Port ${PORT})</span>
    <h1>Docker Multi-Tier Architecture & Orchestration</h1>
    <p style="color: #94a3b8;">Student: <strong>Keyur Rana (D25DCE176)</strong> • Container Network: <code>app-network</code></p>
    <h3>Environment Variables & Service Config:</h3>
    <pre>${JSON.stringify({
      status: 'online',
      service: 'Practical 11 Containerized Backend',
      port: PORT,
      mongoUri: MONGODB_URI,
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch
    }, null, 2)}</pre>
  </div>
</body>
</html>`);
  }
  res.json({
    status: 'online',
    service: 'Practical 11: Containerized Backend',
    port: PORT,
    database: MONGODB_URI
  });
});

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json({ success: true, count: tasks.length, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✔ Practical 11 connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Practical 11 Backend running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('⚠ MongoDB not reachable, starting server in fallback mode:', err.message);
    app.listen(PORT, () => {
      console.log(`🚀 Practical 11 Backend running on port ${PORT} (Standalone fallback)`);
    });
  });
