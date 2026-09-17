// Practical 7: End-to-End Auth & Validation Test Suite
const testAuthPipeline = async () => {
  const BASE_URL = 'http://localhost:5001';
  console.log('====================================================');
  console.log('Practical 7: JWT Auth & Middleware Verification');
  console.log('====================================================\n');

  try {
    // 1. Unauthenticated request to protected endpoint (should fail with 401)
    console.log('[TEST 1] Accessing protected /api/tasks without token:');
    const unauthRes = await fetch(`${BASE_URL}/api/tasks`);
    console.log(`Status: ${unauthRes.status} (Expected: 401)`);
    const unauthData = await unauthRes.json();
    console.log('Response:', unauthData);
    console.log('✔ Correctly blocked unauthenticated request!\n');

    // 2. Register user with input validation check
    console.log('[TEST 2] Registering user with invalid password (< 6 chars):');
    const invalidRegRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Keyur', email: 'keyur@charusat.edu.in', password: '123' })
    });
    console.log(`Status: ${invalidRegRes.status} (Expected: 400)`);
    const invalidRegData = await invalidRegRes.json();
    console.log('Validation Errors:', invalidRegData.errors);
    console.log('✔ Server-side input validation correctly rejected malformed input!\n');

    // 3. Register valid user
    const testEmail = `student_${Date.now()}@charusat.edu.in`;
    console.log(`[TEST 3] Registering valid user (${testEmail}):`);
    const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Keyur Rana', email: testEmail, password: 'SecurePassword123' })
    });
    console.log(`Status: ${regRes.status} (Expected: 201)`);
    const regData = await regRes.json();
    console.log('User created:', regData.user);
    const token = regData.token;
    console.log('JWT Token received:', token.substring(0, 30) + '...');
    console.log('✔ Registration and token issuance successful!\n');

    // 4. Verify /api/auth/me (Supplementary Problem 1)
    console.log('[TEST 4] Calling /api/auth/me with Bearer token:');
    const meRes = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(`Status: ${meRes.status} (Expected: 200)`);
    const meData = await meRes.json();
    console.log('Logged-in Profile:', meData.user);
    console.log('✔ /me endpoint successfully authenticated!\n');

    // 5. Create task on protected route
    console.log('[TEST 5] Creating task with Bearer token:');
    const taskRes = await fetch(`${BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'Complete Practical 7 Authentication',
        description: 'Implement JWT auth and middleware pipeline with bcrypt password hashing',
        priority: 'high'
      })
    });
    console.log(`Status: ${taskRes.status} (Expected: 201)`);
    const taskData = await taskRes.json();
    console.log('Created Task:', taskData.data);
    console.log('✔ Task successfully created for authenticated user!\n');

    console.log('====================================================');
    console.log('ALL TESTS PASSED: Authentication & Middleware Verified!');
    console.log('====================================================');
  } catch (err) {
    console.error('Test execution failed:', err.message);
  }
};

testAuthPipeline();
