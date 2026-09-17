const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { taskEmitter, eventLogs } = require('../events/taskEmitter');

// GET /api/tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (err) {
    next(err);
  }
});

// GET /api/tasks/event-logs - Inspect async background processing logs
router.get('/event-logs', (req, res) => {
  res.status(200).json({
    success: true,
    count: eventLogs.length,
    data: eventLogs
  });
});

// POST /api/tasks - Emits 'task-created' event asynchronously
router.post('/', async (req, res, next) => {
  try {
    const { title, description, priority, assignedUser } = req.body;
    const task = await Task.create({ title, description, priority, assignedUser });

    // Capture exact HTTP response dispatch timestamp
    const apiResponseTimestamp = new Date().toISOString();

    // Emit event asynchronously — this does NOT block the HTTP response!
    taskEmitter.emit('task-created', task);

    // Respond immediately to the client
    res.status(201).json({
      success: true,
      message: 'Task created successfully and background event emitted',
      apiResponseTimestamp,
      data: task
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/tasks/:id - Emits 'task-deleted' event (Supplementary Problem 1)
router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ success: false, error: 'Task not found' });

    const apiResponseTimestamp = new Date().toISOString();
    taskEmitter.emit('task-deleted', req.params.id);

    res.status(200).json({
      success: true,
      message: 'Task deleted and delete event emitted',
      apiResponseTimestamp,
      deletedId: req.params.id
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
