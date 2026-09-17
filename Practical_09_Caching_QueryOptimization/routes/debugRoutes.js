const express = require('express');
const router = express.Router();
const cacheManager = require('../cache/cacheManager');

// GET /api/cache/stats (Supplementary Problem 2)
router.get('/stats', (req, res) => {
  res.status(200).json(cacheManager.getStats());
});

// POST /api/cache/flush
router.post('/flush', (req, res) => {
  cacheManager.flush();
  res.status(200).json({ success: true, message: 'All in-memory cache flushed' });
});

module.exports = router;
