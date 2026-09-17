const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');
const { validateTask } = require('../middleware/validationMiddleware');

// All task routes are protected by authMiddleware
router.use(authMiddleware);

// GET /api/tasks - Get all tasks for the logged-in user
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/tasks/:id - Get a single task
router.get('/:id', async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found or unauthorized'
      });
    }
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/tasks - Create task with server-side validation
router.post('/', validateTask, async (req, res, next) => {
  try {
    const { title, description, priority } = req.body;
    const task = await Task.create({
      title,
      description,
      priority,
      user: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/tasks/:id - Update task
router.put('/:id', async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found or unauthorized'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found or unauthorized'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      deletedId: task._id
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
