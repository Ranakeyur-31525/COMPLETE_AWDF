const mongoose = require('mongoose');
require('dotenv').config();
const Task = require('./models/Task');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskdb';

const initialTasks = [
  {
    title: '  Complete AWDF Practical 5  ',
    description: 'Connect MongoDB database to Express server using Mongoose schema and test validation.',
    completed: true,
    priority: 'high'
  },
  {
    title: 'Configure MongoDB Compass',
    description: 'Connect MongoDB Compass to mongodb://127.0.0.1:27017 and inspect taskdb collection.',
    completed: true,
    priority: 'high'
  },
  {
    title: 'Build React Full Stack Dashboard',
    description: 'Connect React frontend with Express & Mongoose backend API for full stack integration.',
    completed: false,
    priority: 'medium'
  },
  {
    title: 'Review Mongoose Pre-Save Hooks',
    description: 'Verify title whitespace trimming and validation error formatting in Express pipeline.',
    completed: false,
    priority: 'low'
  }
];

async function seedDatabase() {
  try {
    console.log(`⏳ Connecting to MongoDB at ${MONGO_URI}...`);
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB!');

    // Clear existing tasks
    await Task.deleteMany({});
    console.log('🗑️  Cleared existing tasks from collection');

    // Insert initial tasks
    const createdTasks = await Task.create(initialTasks);
    console.log(`🎉 Successfully seeded ${createdTasks.length} tasks into MongoDB!`);
    console.log('📋 Sample Tasks in DB:');
    createdTasks.forEach((t, index) => {
      console.log(`   ${index + 1}. [${t.priority.toUpperCase()}] ${t.title} (ID: ${t._id})`);
    });

    console.log('\n💡 Open MongoDB Compass and connect to: mongodb://127.0.0.1:27017');
    console.log('   You will see database: "taskdb" -> collection: "tasks"');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seedDatabase();
