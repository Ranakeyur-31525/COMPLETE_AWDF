const mongoose = require('mongoose');
require('dotenv').config();
const Task = require('./models/Task');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskdb';

const initialTasks = [
  {
    title: 'Configure React Router & Vite Client',
    description: 'Set up multi-page navigation, component tree, and fast HMR frontend tooling.',
    completed: true,
    priority: 'medium'
  },
  {
    title: 'Implement Express REST API with Mongoose',
    description: 'Create CRUD endpoints with schema validation, error middleware, and CORS.',
    completed: true,
    priority: 'high'
  },
  {
    title: 'Wire React UI with Backend Endpoints',
    description: 'Connect getTasks, createTask, updateTask, and deleteTask using Fetch API.',
    completed: true,
    priority: 'high'
  },
  {
    title: 'Add Toast Notifications and Delete Confirmation Dialog',
    description: 'Enhance UX with real-time feedback, optimistic updates, and safe deletion prompts.',
    completed: false,
    priority: 'medium'
  },
  {
    title: 'Verify MongoDB Data Persistence & Compass Inspection',
    description: 'Perform CRUD operations from the React browser interface and inspect collections in MongoDB Compass.',
    completed: false,
    priority: 'low'
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB.');

    console.log('Clearing existing tasks in taskdb...');
    await Task.deleteMany({});

    console.log('Inserting seed tasks for AWDF Practicals...');
    const createdTasks = await Task.insertMany(initialTasks);
    console.log(`Successfully seeded ${createdTasks.length} tasks:`);
    createdTasks.forEach((task, index) => {
      console.log(`  ${index + 1}. [${task.priority.toUpperCase()}] ${task.title} (Completed: ${task.completed})`);
    });

    console.log('\nSeed process complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
