require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5003;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/taskdb_p10';

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => {
  if (req.headers.accept && req.headers.accept.includes('text/html')) {
    return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><title>Practical 10: Event-Driven Architecture</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 24px; }
    .card { background: #1e293b; border-radius: 12px; padding: 24px; max-width: 850px; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.5); border: 1px solid #334155; }
    h1 { margin-top: 0; color: #ec4899; font-size: 24px; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; background: #db2777; color: #fff; font-size: 12px; font-weight: bold; }
    .btn { background: #ec4899; color: #fff; border: none; padding: 10px 18px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s; margin-right: 8px; }
    .btn:hover { background: #f472b6; }
    .timeline { background: #0f172a; border-radius: 8px; padding: 16px; margin: 16px 0; border: 1px solid #334155; }
    .step { padding: 8px 12px; border-left: 3px solid #ec4899; margin-bottom: 8px; background: #1e293b; border-radius: 0 6px 6px 0; font-size: 13px; }
    pre { background: #090d16; padding: 16px; border-radius: 8px; overflow-x: auto; color: #fbcfe8; border: 1px solid #1e293b; max-height: 280px; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">Practical 10 • Standalone Server (Port ${PORT})</span>
    <h1>Asynchronous Processing with Event-Driven Architecture</h1>
    <p style="color: #94a3b8;">Student: <strong>Keyur Rana (D25DCE176)</strong> • Native <code>EventEmitter</code> Decoupling</p>

    <div style="margin: 20px 0;">
      <button class="btn" onclick="triggerEvent()">🚀 Dispatch Task & Trigger Event</button>
      <button class="btn" style="background: #6366f1;" onclick="fetchLogs()">📜 Fetch Event Logs</button>
    </div>

    <div class="timeline" id="timelineBox" style="display: none;">
      <h4 style="margin: 0 0 10px 0; color: #f472b6;">Decoupled Execution Verification:</h4>
      <div class="step" id="t1">1. HTTP Response Received: -</div>
      <div class="step" id="t2">2. Background Handler Waiting (1500ms non-blocking)...</div>
      <div class="step" id="t3">3. Handler Timestamp: -</div>
    </div>

    <h3>Event Log Output:</h3>
    <pre id="output">Click "Dispatch Task & Trigger Event" to test asynchronous non-blocking event flow.</pre>
  </div>

  <script>
    async function fetchLogs() {
      const res = await fetch('/api/tasks/event-logs');
      const d = await res.json();
      document.getElementById('output').textContent = JSON.stringify(d, null, 2);
    }
    async function triggerEvent() {
      document.getElementById('timelineBox').style.display = 'block';
      document.getElementById('t1').textContent = '1. Sending POST /api/tasks...';
      document.getElementById('t2').textContent = '2. Background worker processing in background...';
      document.getElementById('t3').textContent = '3. Waiting for worker completion...';

      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Event-Driven Async Test ' + Date.now(),
          priority: 'high',
          assignedUser: 'Keyur Rana (D25DCE176)'
        })
      });
      const data = await res.json();
      document.getElementById('t1').innerHTML = \`1. <strong>HTTP Response Dispatched:</strong> \${data.apiResponseTimestamp} (Status \${res.status} Created)\`;
      document.getElementById('output').textContent = JSON.stringify(data, null, 2);

      setTimeout(async () => {
        const logsRes = await fetch('/api/tasks/event-logs');
        const logsData = await logsRes.json();
        const latest = logsData.data[logsData.data.length - 1];
        if (latest) {
          document.getElementById('t2').innerHTML = \`2. <strong>Background Worker:</strong> Processed in background (\${latest.simulatedDuration})\`;
          document.getElementById('t3').innerHTML = \`3. <strong>Handler Completed:</strong> \${latest.handlerTimestamp} (Lag: Decoupled & Non-blocking ✔)\`;
        }
        document.getElementById('output').textContent = JSON.stringify(logsData, null, 2);
      }, 1800);
    }
    fetchLogs();
  </script>
</body>
</html>`);
  }

  res.status(200).json({
    status: 'online',
    service: 'Practical 10: Event-Driven Async Processing (EventEmitter)',
    student: 'Keyur Rana (D25DCE176)',
    port: PORT,
    dbState: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

app.use('/api/tasks', taskRoutes);

app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(err.status || 500).json({ success: false, error: err.message });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✔ MongoDB connected to taskdb_p10');
    app.listen(PORT, () => {
      console.log(`🚀 Practical 10 Server running on http://localhost:${PORT}`);
      console.log(`📌 Tasks API: http://localhost:${PORT}/api/tasks`);
      console.log(`📌 Event Logs: http://localhost:${PORT}/api/tasks/event-logs`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
  });

module.exports = app;
