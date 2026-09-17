const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5012;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => {
  if (req.headers.accept && req.headers.accept.includes('text/html')) {
    return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><title>Practical 12: CI/CD Pipeline & Automated Testing</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; margin: 0; padding: 24px; }
    .card { background: #1e293b; border-radius: 12px; padding: 24px; max-width: 850px; margin: 0 auto; box-shadow: 0 10px 25px rgba(0,0,0,0.5); border: 1px solid #334155; }
    h1 { margin-top: 0; color: #10b981; font-size: 24px; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; background: #059669; color: #fff; font-size: 12px; font-weight: bold; }
    .btn { background: #10b981; color: #0f172a; border: none; padding: 10px 18px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s; margin-right: 8px; }
    .btn:hover { background: #34d399; }
    pre { background: #090d16; padding: 16px; border-radius: 8px; overflow-x: auto; color: #6ee7b7; border: 1px solid #1e293b; max-height: 380px; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">Practical 12 • CI/CD Pipeline Dashboard (Port ${PORT})</span>
    <h1>CI/CD Pipeline with GitHub Actions & Automated Testing</h1>
    <p style="color: #94a3b8;">Student: <strong>Keyur Rana (D25DCE176)</strong> • Workflow: <code>.github/workflows/ci.yml</code></p>

    <div style="margin: 20px 0;">
      <button class="btn" onclick="runTests('pass')">✔ Run Automated Test Suite (Exit 0)</button>
      <button class="btn" style="background: #ef4444; color: #fff;" onclick="runTests('fail')">❌ Simulate Broken Pipeline (Exit 1)</button>
    </div>

    <h3>Pipeline Execution Log:</h3>
    <pre id="output">Click "Run Automated Test Suite" to execute the CI assertion tests.</pre>
  </div>

  <script>
    async function runTests(mode) {
      document.getElementById('output').textContent = 'Running test suite in Node runner...';
      const endpoint = mode === 'pass' ? '/api/run-tests' : '/api/run-broken-test';
      const res = await fetch(endpoint);
      const data = await res.json();
      document.getElementById('output').textContent = data.output;
    }
    runTests('pass');
  </script>
</body>
</html>`);
  }
  res.json({
    service: 'Practical 12: CI/CD Pipeline Visualizer',
    status: 'online',
    port: PORT
  });
});

app.get('/api/run-tests', (req, res) => {
  exec('node tests/taskApi.test.js', { cwd: __dirname }, (error, stdout, stderr) => {
    res.json({
      success: !error,
      exitCode: error ? error.code : 0,
      output: stdout || stderr
    });
  });
});

app.get('/api/run-broken-test', (req, res) => {
  exec('node tests/brokenTestDemo.js fail', { cwd: __dirname }, (error, stdout, stderr) => {
    res.json({
      success: false,
      exitCode: error ? error.code : 1,
      output: stdout || stderr
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Practical 12 CI/CD Server running on http://localhost:${PORT}`);
});
