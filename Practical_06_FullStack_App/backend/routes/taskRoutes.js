const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET /tasks - Get all tasks (with optional search and filter queries)
router.get('/', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.completed !== undefined && req.query.completed !== '') {
      filter.completed = req.query.completed === 'true';
    }
    if (req.query.priority && req.query.priority !== 'all') {
      filter.priority = req.query.priority.toLowerCase();
    }
    if (req.query.search) {
      filter.title = { $regex: req.query.search, $options: 'i' };
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
});

// GET /tasks/:id - Get single task by ID
router.get('/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task not found with id: ${req.params.id}`
      });
    }
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
});

// POST /tasks - Create a new task
router.post('/', async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    next(error);
  }
});

// PUT /tasks/:id - Update a task by ID
router.put('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task not found with id: ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /tasks/:id - Delete a task by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task not found with id: ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      deletedId: req.params.id
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
