// Script to demonstrate deliberately broken test vs fixed test
const assert = require('assert');

const mode = process.argv[2] || 'fail';

console.log('====================================================');
console.log(`PRACTICAL 12: CI/CD PIPELINE TEST RUNNER [Mode: ${mode.toUpperCase()}]`);
console.log('====================================================\n');

if (mode === 'fail') {
  console.log('Simulating Deliberately Broken Test in CI Pipeline:');
  console.log('Assertion: Expected task priority enum to include "critical"');
  try {
    const allowedPriorities = ['low', 'medium', 'high'];
    assert.strictEqual(allowedPriorities.includes('critical'), true, 'Priority "critical" is missing from enum schema!');
  } catch (err) {
    console.error('\n❌ RED CROSS ON GITHUB ACTIONS:');
    console.error(`Process exited with code 1. Pipeline execution halted.`);
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
} else {
  console.log('Simulating Fixed Corrected Test in CI Pipeline:');
  console.log('Assertion: Correcting test to check allowed priority "high"');
  const allowedPriorities = ['low', 'medium', 'high'];
  assert.strictEqual(allowedPriorities.includes('high'), true);
  console.log('\n✔ GREEN CHECKMARK ON GITHUB ACTIONS:');
  console.log(`Process exited with code 0. Pipeline execution succeeded!`);
  process.exit(0);
}
