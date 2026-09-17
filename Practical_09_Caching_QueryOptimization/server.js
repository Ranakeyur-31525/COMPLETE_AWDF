require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const taskRoutes = require('./routes/taskRoutes');
const debugRoutes = require('./routes/debugRoutes');

const app = express();
const PORT = process.env.PORT || 5002;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taskdb_p9';

app.use(cors({ origin: '*' }));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Root Health Check & Interactive Caching Dashboard
app.get('/', (req, res) => {
  if (req.headers.accept && req.headers.accept.includes('text/html')) {
    return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><title>Practical 9: In-Memory Caching & Query Optimization</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 24px; }
    .card { background: #1e293b; border-radius: 12px; padding: 24px; max-width: 850px; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.5); border: 1px solid #334155; }
    h1 { margin-top: 0; color: #f59e0b; font-size: 24px; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; background: #d97706; color: #fff; font-size: 12px; font-weight: bold; }
    .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 20px 0; }
    .metric-box { background: #0f172a; padding: 14px; border-radius: 8px; text-align: center; border: 1px solid #334155; }
    .metric-val { font-size: 24px; font-weight: bold; color: #f59e0b; }
    .metric-lbl { font-size: 11px; color: #94a3b8; text-transform: uppercase; }
    .btn { background: #f59e0b; color: #0f172a; border: none; padding: 10px 18px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s; margin-right: 8px; }
    .btn:hover { background: #fbbf24; }
    pre { background: #090d16; padding: 16px; border-radius: 8px; overflow-x: auto; color: #fde68a; border: 1px solid #1e293b; max-height: 350px; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">Practical 9 • Standalone Server (Port ${PORT})</span>
    <h1>In-Memory Caching & Query Optimization (node-cache)</h1>
    <p style="color: #94a3b8;">Student: <strong>Keyur Rana (D25DCE176)</strong> • TTL: 60 Seconds</p>

    <div class="metrics-grid">
      <div class="metric-box"><div class="metric-val" id="hits">-</div><div class="metric-lbl">Cache Hits</div></div>
      <div class="metric-box"><div class="metric-val" id="misses">-</div><div class="metric-lbl">Cache Misses</div></div>
      <div class="metric-box"><div class="metric-val" id="ratio">-</div><div class="metric-lbl">Hit Rate</div></div>
      <div class="metric-box"><div class="metric-val" id="keys">-</div><div class="metric-lbl">Active Keys</div></div>
    </div>

    <div style="margin: 16px 0;">
      <button class="btn" onclick="fetchTasks()">⚡ Fetch Tasks (GET /api/tasks)</button>
      <button class="btn" style="background: #ef4444; color: #fff;" onclick="flushCache()">🗑️ Flush Cache (POST /api/cache/flush)</button>
      <button class="btn" style="background: #3b82f6; color: #fff;" onclick="refreshStats()">📊 Refresh Stats</button>
    </div>

    <h3>Query Response & Latency:</h3>
    <div id="latencyBadge" style="margin-bottom: 8px; font-weight: bold; color: #38bdf8;"></div>
    <pre id="output">Click "Fetch Tasks" to test cache performance.</pre>
  </div>

  <script>
    async function refreshStats() {
      try {
        const res = await fetch('/api/cache/stats');
        const d = await res.json();
        document.getElementById('hits').textContent = d.hits ?? 0;
        document.getElementById('misses').textContent = d.misses ?? 0;
        document.getElementById('ratio').textContent = d.hitRate ?? '0%';
        document.getElementById('keys').textContent = d.activeKeysCount ?? 0;
      } catch(e) {}
    }
    async function fetchTasks() {
      const t0 = performance.now();
      const res = await fetch('/api/tasks');
      const t1 = performance.now();
      const d = await res.json();
      const elapsed = (t1 - t0).toFixed(2);
      const cacheHeader = res.headers.get('X-Cache') || 'UNKNOWN';
      document.getElementById('latencyBadge').textContent = \`Response Time: \${elapsed}ms | X-Cache: \${cacheHeader} | Source: \${d.source}\`;
      document.getElementById('output').textContent = JSON.stringify(d, null, 2);
      refreshStats();
    }
    async function flushCache() {
      const res = await fetch('/api/cache/flush', { method: 'POST' });
      const d = await res.json();
      document.getElementById('output').textContent = JSON.stringify(d, null, 2);
      document.getElementById('latencyBadge').textContent = 'Cache cleared. Next request will be a Cache MISS.';
      refreshStats();
    }
    refreshStats();
  </script>
</body>
</html>`);
  }

  res.status(200).json({
    status: 'online',
    service: 'Practical 09: In-Memory Caching (node-cache)',
    student: 'Keyur Rana (D25DCE176)',
    port: PORT,
    dbState: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

app.use('/api/tasks', taskRoutes);
app.use('/api/cache', debugRoutes);

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Server error'
  });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✔ MongoDB connected to taskdb_p9');
    app.listen(PORT, () => {
      console.log(`🚀 Practical 9 Caching Backend running on http://localhost:${PORT}`);
      console.log(`📌 Tasks API: http://localhost:${PORT}/api/tasks`);
      console.log(`📌 Cache Stats: http://localhost:${PORT}/api/cache/stats`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failure:', err.message);
  });

module.exports = app;
