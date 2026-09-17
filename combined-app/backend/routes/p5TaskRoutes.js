const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Schema information endpoint for educational exploration
router.get('/schema-info', (req, res) => {
  res.status(200).json({
    success: true,
    practical: 'Practical 5: MongoDB & Mongoose Schema Design',
    model: 'Task',
    collection: 'tasks',
    database: 'taskdb',
    fields: {
      title: {
        type: 'String',
        required: true,
        minLength: 2,
        trim: true,
        description: 'Title of the task; trimmed in pre-save hook.'
      },
      description: {
        type: 'String',
        default: "''",
        trim: true,
        description: 'Optional longer notes regarding the task.'
      },
      completed: {
        type: 'Boolean',
        default: false,
        description: 'Flag indicating whether task is finished.'
      },
      priority: {
        type: 'String',
        enum: ['low', 'medium', 'high'],
        default: "'medium'",
        description: 'Priority tier enforced by Mongoose enum validator.'
      },
      timestamps: {
        createdAt: 'Auto-generated ISO Date',
        updatedAt: 'Auto-updated ISO Date'
      }
    }
  });
});

// GET /api/p5/tasks
router.get('/', async (req, res, next) => {
  try {
    const { priority, completed, search } = req.query;
    const filter = {};

    if (priority && priority !== 'all') {
      filter.priority = priority.toLowerCase();
    }

    if (completed !== undefined && completed !== 'all') {
      filter.completed = completed === 'true';
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
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

// GET /api/p5/tasks/:id
router.get('/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: `No task found with MongoDB _id '${req.params.id}'`
      });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
});

// POST /api/p5/tasks
router.post('/', async (req, res, next) => {
  try {
    const { title, description, completed, priority } = req.body;
    const newTask = new Task({
      title,
      description,
      completed,
      priority
    });

    const savedTask = await newTask.save();
    res.status(201).json({
      success: true,
      message: 'Document saved to MongoDB with schema validation',
      data: savedTask
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/p5/tasks/:id
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
        error: `No task found with MongoDB _id '${req.params.id}'`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Document updated in MongoDB successfully',
      data: updatedTask
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/p5/tasks/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        error: `No task found with MongoDB _id '${req.params.id}'`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Document deleted from MongoDB',
      deletedId: req.params.id,
      data: deletedTask
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
