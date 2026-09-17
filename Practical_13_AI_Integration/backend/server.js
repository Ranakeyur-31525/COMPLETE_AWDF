require('dotenv').config();
const express = require('express');
const cors = require('cors');

const aiRoutes = require('./routes/aiRoutes');

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Practical 13: AI API Integration (Gemini / OpenAI)',
    hasApiKeyConfigured: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here')
  });
});

app.use('/api/ai', aiRoutes);

app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(err.status || 500).json({ success: false, error: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Practical 13 AI Backend running on http://localhost:${PORT}`);
  console.log(`📌 AI Generation Endpoint: http://localhost:${PORT}/api/ai/generate-description`);
});

module.exports = app;
