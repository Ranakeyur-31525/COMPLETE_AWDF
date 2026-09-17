const express = require('express');
const router = express.Router();
const { requireJsonHeader, validateNumericTaskId } = require('../middleware/customMiddleware');

// In-memory data store for Practical 4
let tasks = [
  {
    id: 1,
    title: 'Setup Node & Express REST API Server',
    description: 'Initialize package.json, configure middleware pipeline, and set up HTTP routing.',
    completed: true,
    priority: 'high',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 2,
    title: 'Create In-Memory Task Management Endpoints',
    description: 'Implement GET, POST, PUT, and DELETE operations with status code mappings.',
    completed: true,
    priority: 'high',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    id: 3,
    title: 'Implement Custom Request Logger & Validation Middleware',
    description: 'Log every incoming request and validate Content-Type application/json header.',
    completed: true,
    priority: 'medium',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 4,
    title: 'Centralize Error Handling & 404 Route Catchers',
    description: 'Ensure unhandled routes return clear JSON errors with appropriate HTTP status codes.',
    completed: false,
    priority: 'medium',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString()
  },
  {
    id: 5,
    title: 'Test All Endpoints Using Postman / Thunder Client',
    description: 'Verify 200, 201, 400, 404 response codes and payload structures.',
    completed: false,
    priority: 'low',
    createdAt: new Date().toISOString()
  }
];

let nextId = 6;

// Apply JSON header validation to write operations
router.use(requireJsonHeader);

// GET /api/p4/tasks
router.get('/', (req, res) => {
  let result = [...tasks];
  const { completed, priority, search } = req.query;

  if (completed !== undefined && completed !== 'all') {
    const isCompleted = completed === 'true';
    result = result.filter((t) => t.completed === isCompleted);
  }

  if (priority && priority !== 'all') {
    result = result.filter((t) => t.priority.toLowerCase() === priority.toLowerCase());
  }

  if (search) {
    const query = search.toLowerCase();
    result = result.filter(
      (t) => t.title.toLowerCase().includes(query) || (t.description && t.description.toLowerCase().includes(query))
    );
  }

  res.status(200).json({
    success: true,
    practical: 'Practical 4 (In-Memory Store)',
    count: result.length,
    data: result
  });
});

// GET /api/p4/tasks/:id
router.get('/:id', validateNumericTaskId, (req, res) => {
  const task = tasks.find((t) => t.id === req.taskId);
  if (!task) {
    return res.status(404).json({
      success: false,
      error: `Task not found with ID ${req.taskId}`
    });
  }
  res.status(200).json({ success: true, data: task });
});

// POST /api/p4/tasks
router.post('/', (req, res) => {
  const { title, description, completed, priority } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error: Title is required and must be at least 2 characters long'
    });
  }

  const validPriorities = ['low', 'medium', 'high'];
  const taskPriority = priority && validPriorities.includes(priority.toLowerCase()) ? priority.toLowerCase() : 'medium';

  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description ? description.trim() : '',
    completed: typeof completed === 'boolean' ? completed : false,
    priority: taskPriority,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  res.status(201).json({
    success: true,
    message: 'Task created successfully in in-memory store',
    data: newTask
  });
});

// PUT /api/p4/tasks/:id
router.put('/:id', validateNumericTaskId, (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === req.taskId);
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: `Task with ID ${req.taskId} not found`
    });
  }

  const { title, description, completed, priority } = req.body;
  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error: Title must be at least 2 characters long'
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
        error: "Validation Error: Priority must be 'low', 'medium', or 'high'"
      });
    }
    tasks[taskIndex].priority = priority.toLowerCase();
  }

  res.status(200).json({
    success: true,
    message: `Task ${req.taskId} updated successfully`,
    data: tasks[taskIndex]
  });
});

// DELETE /api/p4/tasks/:id
router.delete('/:id', validateNumericTaskId, (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === req.taskId);
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: `Task with ID ${req.taskId} not found`
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.status(200).json({
    success: true,
    message: `Task ${req.taskId} deleted successfully`,
    data: deletedTask
  });
});

// POST /api/p4/reset
router.post('/reset', (req, res) => {
  tasks = [
    {
      id: 1,
      title: 'Setup Node & Express REST API Server',
      description: 'Initialize package.json, configure middleware pipeline, and set up HTTP routing.',
      completed: true,
      priority: 'high',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Create In-Memory Task Management Endpoints',
      description: 'Implement GET, POST, PUT, and DELETE operations with status code mappings.',
      completed: true,
      priority: 'high',
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Implement Custom Request Logger & Validation Middleware',
      description: 'Log every incoming request and validate Content-Type application/json header.',
      completed: true,
      priority: 'medium',
      createdAt: new Date().toISOString()
    }
  ];
  nextId = 4;
  res.status(200).json({ success: true, message: 'Practical 4 in-memory data store reset to default values' });
});

module.exports = router;
