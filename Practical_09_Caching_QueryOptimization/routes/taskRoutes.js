const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const cacheManager = require('../cache/cacheManager');

const CACHE_KEY_ALL = 'tasks:all';

// GET /api/tasks (Cached 60s)
router.get('/', async (req, res, next) => {
  const startTime = process.hrtime();

  try {
    const cachedData = cacheManager.get(CACHE_KEY_ALL);

    if (cachedData) {
      const diff = process.hrtime(startTime);
      const responseTimeMs = (diff[0] * 1000 + diff[1] / 1e6).toFixed(2);
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('X-Response-Time', `${responseTimeMs}ms`);
      return res.status(200).json({
        success: true,
        source: 'cache (node-cache)',
        cached: true,
        responseTime: `${responseTimeMs}ms`,
        count: cachedData.length,
        data: cachedData
      });
    }

    // Cache MISS: Query MongoDB
    const tasks = await Task.find().sort({ createdAt: -1 });

    // Store in node-cache with 60s TTL
    cacheManager.set(CACHE_KEY_ALL, tasks, 60);

    const diff = process.hrtime(startTime);
    const responseTimeMs = (diff[0] * 1000 + diff[1] / 1e6).toFixed(2);
    res.setHeader('X-Cache', 'MISS');
    res.setHeader('X-Response-Time', `${responseTimeMs}ms`);

    res.status(200).json({
      success: true,
      source: 'database (MongoDB query)',
      cached: false,
      responseTime: `${responseTimeMs}ms`,
      count: tasks.length,
      data: tasks
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/tasks/:id (Supplementary Problem 1: Separate single-task cache)
router.get('/:id', async (req, res, next) => {
  const cacheKey = `task:${req.params.id}`;
  const cached = cacheManager.get(cacheKey);

  if (cached) {
    res.setHeader('X-Cache', 'HIT');
    return res.status(200).json({
      success: true,
      source: 'cache',
      data: cached
    });
  }

  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    cacheManager.set(cacheKey, task, 60);
    res.setHeader('X-Cache', 'MISS');
    res.status(200).json({
      success: true,
      source: 'database',
      data: task
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/tasks (Cache Invalidation on Write)
router.post('/', async (req, res, next) => {
  try {
    const task = await Task.create(req.body);

    // Invalidate cached list to guarantee data freshness
    cacheManager.del(CACHE_KEY_ALL);

    res.status(201).json({
      success: true,
      message: 'Task created and cache invalidated',
      data: task
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/tasks/:id (Cache Invalidation on Update)
router.put('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ success: false, error: 'Task not found' });

    // Invalidate both collection cache and individual item cache
    cacheManager.del(CACHE_KEY_ALL);
    cacheManager.del(`task:${req.params.id}`);

    res.status(200).json({
      success: true,
      message: 'Task updated and cache invalidated',
      data: task
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/tasks/:id (Cache Invalidation on Delete)
router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ success: false, error: 'Task not found' });

    // Invalidate both collection cache and individual item cache
    cacheManager.del(CACHE_KEY_ALL);
    cacheManager.del(`task:${req.params.id}`);

    res.status(200).json({
      success: true,
      message: 'Task deleted and cache invalidated',
      deletedId: task._id
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
