const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET task statistics
router.get('/stats', async (req, res, next) => {
  try {
    const total = await Task.countDocuments();
    const completed = await Task.countDocuments({ completed: true });
    const pending = total - completed;
    const high = await Task.countDocuments({ priority: 'high' });
    const medium = await Task.countDocuments({ priority: 'medium' });
    const low = await Task.countDocuments({ priority: 'low' });

    res.status(200).json({
      success: true,
      stats: {
        total,
        completed,
        pending,
        high,
        medium,
        low,
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET all tasks with optional search, priority, and completed filters
router.get('/', async (req, res, next) => {
  try {
    const { search, priority, completed } = req.query;
    const filter = {};

    if (priority && priority !== 'all') {
      filter.priority = priority.toLowerCase();
    }

    if (completed !== undefined && completed !== 'all') {
      filter.completed = completed === 'true';
    }

    if (search && search.trim() !== '') {
      filter.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } }
      ];
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

// GET a single task by ID
router.get('/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task not found with ID '${req.params.id}'`
      });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
});

// POST create a new task document in MongoDB
router.post('/', async (req, res, next) => {
  try {
    const { title, description, completed, priority } = req.body;

    const newTask = new Task({
      title,
      description,
      completed: typeof completed === 'boolean' ? completed : false,
      priority: priority || 'medium'
    });

    const savedTask = await newTask.save();

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: savedTask
    });
  } catch (error) {
    next(error);
  }
});

// PUT update an existing task
router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, completed, priority } = req.body;
    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;
    if (priority !== undefined) updateData.priority = priority;

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        error: `Task not found with ID '${req.params.id}'`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    });
  } catch (error) {
    next(error);
  }
});

// DELETE a task
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        error: `Task not found with ID '${req.params.id}'`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      deletedId: req.params.id,
      data: deletedTask
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
