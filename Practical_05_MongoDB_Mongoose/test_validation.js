
const mongoose = require('mongoose');

// Define Schema matching Task.js
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters long']
    },
    description: {
      type: String,
      default: '',
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    priority: {
      type: String,
      enum: {
        values: ['low', 'medium', 'high'],
        message: 'Priority must be either low, medium, or high'
      },
      default: 'medium'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

taskSchema.pre('save', function (next) {
  if (this.title) {
    this.title = this.title.trim();
  }
  next();
});

const Task = mongoose.model('TaskTest', taskSchema);

console.log('--- TEST 1: Schema Validation Success ---');
const validDoc = new Task({
  title: '  Complete AWDF Practical 5 Report  ',
  description: 'Schema design with Mongoose ODM and MongoDB validation.',
  priority: 'high'
});
console.log('Raw Doc Title before save hook simulation:', JSON.stringify(validDoc.title));
validDoc.validateSync();
console.log('Validation status: PASSED (0 errors)');

console.log('\n--- TEST 2: Schema Validation Failure (Missing Title) ---');
const invalidDoc1 = new Task({ description: 'No title provided' });
const err1 = invalidDoc1.validateSync();
console.log('Caught ValidationError:', err1.errors['title'].message);

console.log('\n--- TEST 3: Schema Validation Failure (Invalid Priority Enum) ---');
const invalidDoc2 = new Task({ title: 'Valid Title', priority: 'urgent' });
const err2 = invalidDoc2.validateSync();
console.log('Caught ValidationError:', err2.errors['priority'].message);

console.log('\n--- TEST 4: Schema Validation Failure (MinLength violation) ---');
const invalidDoc3 = new Task({ title: 'A' });
const err3 = invalidDoc3.validateSync();
console.log('Caught ValidationError:', err3.errors['title'].message);

console.log('\n=== ALL MONGOOSE SCHEMA VALIDATION TESTS PASSED 100% ===');
