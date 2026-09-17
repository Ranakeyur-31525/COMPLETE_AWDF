const express = require('express');
const router = express.Router();
const { validateTaskId, requireJsonHeader } = require('../middleware/customMiddleware');

// In-Memory Data Store (Temporary Storage as per Practical 4 specification)
let tasks = [
  {
    id: 1,
    title: 'Setup Node & Express server',
    description: 'Initialize project structure and configure Express routing pipeline.',
    completed: true,
    priority: 'high',
    createdAt: new Date('2026-08-06T10:00:00.000Z').toISOString()
  },
  {
    id: 2,
    title: 'Implement custom request logger',
    description: 'Create middleware to log method, URL, and timestamp for all requests.',
    completed: true,
    priority: 'medium',
    createdAt: new Date('2026-08-06T11:30:00.000Z').toISOString()
  },
  {
    id: 3,
    title: 'Build in-memory CRUD endpoints',
    description: 'Implement GET, POST, PUT, and DELETE routes with status codes.',
    completed: false,
    priority: 'high',
    createdAt: new Date('2026-08-06T12:00:00.000Z').toISOString()
  },
  {
    id: 4,
    title: 'Test API with Postman & Thunder Client',
    description: 'Verify status codes (200, 201, 404, 500) and response formats.',
    completed: false,
    priority: 'low',
    createdAt: new Date('2026-08-06T13:15:00.000Z').toISOString()
  }
];

let nextId = 5;

// GET /tasks - Get all tasks (supports query filtering by completed, priority, and search)
router.get('/', (req, res, next) => {
  try {
    let result = [...tasks];

    if (req.query.completed !== undefined) {
      const isCompleted = req.query.completed === 'true';
      result = result.filter((t) => t.completed === isCompleted);
    }

    if (req.query.priority) {
      const p = req.query.priority.toLowerCase();
      result = result.filter((t) => t.priority === p);
    }

    if (req.query.search) {
      const term = req.query.search.toLowerCase();
      result = result.filter(
        (t) => t.title.toLowerCase().includes(term) || t.description.toLowerCase().includes(term)
      );
    }

    res.status(200).json({
      success: true,
      count: result.length,
      data: result
    });
  } catch (error) {
    next(error);
  }
});

// GET /tasks/:id - Get single task by ID
router.get('/:id', validateTaskId, (req, res, next) => {
  try {
    const task = tasks.find((t) => t.id === req.validatedId);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task not found with id: ${req.validatedId}`
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

// POST /tasks - Create a new task (enforces requireJsonHeader)
router.post('/', requireJsonHeader, (req, res, next) => {
  try {
    const { title, description, priority, completed } = req.body;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: 'Task title is required and cannot be empty'
      });
    }

    const validPriorities = ['low', 'medium', 'high'];
    const selectedPriority = priority && validPriorities.includes(priority.toLowerCase())
      ? priority.toLowerCase()
      : 'medium';

    const newTask = {
      id: nextId++,
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: Boolean(completed),
      priority: selectedPriority,
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask
    });
  } catch (error) {
    next(error);
  }
});

// PUT /tasks/:id - Update existing task by ID
router.put('/:id', validateTaskId, requireJsonHeader, (req, res, next) => {
  try {
    const taskIndex = tasks.findIndex((t) => t.id === req.validatedId);

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        error: `Task not found with id: ${req.validatedId}`
      });
    }

    const { title, description, priority, completed } = req.body;

    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Validation Error',
          details: 'Title cannot be empty when provided'
        });
      }
      tasks[taskIndex].title = title.trim();
    }

    if (description !== undefined) {
      tasks[taskIndex].description = description.trim();
    }

    if (completed !== undefined) {
      tasks[taskIndex].completed = Boolean(completed);
    }

    if (priority !== undefined) {
      const validPriorities = ['low', 'medium', 'high'];
      if (!validPriorities.includes(priority.toLowerCase())) {
        return res.status(400).json({
          success: false,
          error: 'Validation Error',
          details: 'Priority must be either low, medium, or high'
        });
      }
      tasks[taskIndex].priority = priority.toLowerCase();
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: tasks[taskIndex]
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /tasks/:id - Delete task by ID
router.delete('/:id', validateTaskId, (req, res, next) => {
  try {
    const taskIndex = tasks.findIndex((t) => t.id === req.validatedId);

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        error: `Task not found with id: ${req.validatedId}`
      });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      deletedId: deletedTask.id,
      data: deletedTask
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
