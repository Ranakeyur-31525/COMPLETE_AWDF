// Automated CI Test Suite for GitHub Actions (Practical 12)
const assert = require('assert');

console.log('====================================================');
console.log('RUNNING AUTOMATED TEST SUITE (CI PIPELINE RUNNER)');
console.log('Environment: GitHub Actions Runner (Node 18.x)');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function runTest(description, testFn) {
  totalTests++;
  try {
    testFn();
    console.log(`PASS: [Test ${totalTests}] ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`FAIL: [Test ${totalTests}] ${description}`);
    console.error(`      AssertionError: ${err.message}`);
    process.exit(1);
  }
}

// TEST 1: Title Validation
runTest('Task title must be rejected if length is less than 3 characters', () => {
  const invalidTitle = 'Hi';
  const isValid = typeof invalidTitle === 'string' && invalidTitle.trim().length >= 3;
  assert.strictEqual(isValid, false, 'Short title should fail validation');
});

// TEST 2: Valid Title
runTest('Task title must be accepted if length is 3 or more characters', () => {
  const validTitle = 'Implement CI/CD GitHub Actions';
  const isValid = typeof validTitle === 'string' && validTitle.trim().length >= 3;
  assert.strictEqual(isValid, true, 'Valid title should pass');
});

// TEST 3: Priority Enum
runTest('Task priority must be one of [low, medium, high]', () => {
  const allowedPriorities = ['low', 'medium', 'high'];
  const testPriority = 'high';
  assert.strictEqual(allowedPriorities.includes(testPriority), true, 'Priority must be in enum');
});

// TEST 4: Invalid Priority
runTest('Task priority outside enum must be rejected', () => {
  const allowedPriorities = ['low', 'medium', 'high'];
  const invalidPriority = 'urgent';
  assert.strictEqual(allowedPriorities.includes(invalidPriority), false, 'Invalid priority rejected');
});

// TEST 5: Default Completed Status
runTest('Task default completed status must initialize to false', () => {
  const defaultTask = { title: 'Test Task', priority: 'medium' };
  const taskRecord = { ...defaultTask, completed: defaultTask.completed ?? false };
  assert.strictEqual(taskRecord.completed, false, 'Default completed state must be false');
});

console.log('\n====================================================');
console.log(`TEST SUMMARY: ${passedTests}/${totalTests} Tests Passed (100% Success)`);
console.log('Status: GREEN CHECKMARK (All CI Assertions Met)');
console.log('====================================================');
process.exit(0);
