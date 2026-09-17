/**
 * Automated Verification Script for Practical 6 Backend API
 * Tests all CRUD endpoints against the active server
 */
const http = require('http');

const BASE_URL = 'http://localhost:5000';

function makeRequest(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Starting Practical 6 API Verification Suite...\n');

  try {
    // 1. Health check
    console.log('1️⃣ Testing Health Check (GET /)...');
    const health = await makeRequest('/');
    console.log(`   Status: ${health.status}, DB Status: ${health.data.database?.status}`);
    if (health.status !== 200) throw new Error('Health check failed');

    // 2. Create Task (POST /tasks)
    console.log('\n2️⃣ Testing Task Creation (POST /tasks)...');
    const createRes = await makeRequest('/tasks', 'POST', {
      title: 'Automated Test Task for Practical 6',
      description: 'Testing full-stack CRUD functionality end-to-end.',
      priority: 'high'
    });
    console.log(`   Status: ${createRes.status}, Created ID: ${createRes.data.data?._id}`);
    if (createRes.status !== 201) throw new Error('Task creation failed');
    const createdId = createRes.data.data._id;

    // 3. Read All Tasks (GET /tasks)
    console.log('\n3️⃣ Testing Read All Tasks (GET /tasks)...');
    const listRes = await makeRequest('/tasks');
    console.log(`   Status: ${listRes.status}, Total Tasks: ${listRes.data.count}`);
    if (listRes.status !== 200 || !Array.isArray(listRes.data.data)) throw new Error('Read all tasks failed');

    // 4. Read Single Task (GET /tasks/:id)
    console.log('\n4️⃣ Testing Read Single Task (GET /tasks/:id)...');
    const singleRes = await makeRequest(`/tasks/${createdId}`);
    console.log(`   Status: ${singleRes.status}, Title: "${singleRes.data.data?.title}"`);
    if (singleRes.status !== 200 || singleRes.data.data._id !== createdId) throw new Error('Read single task failed');

    // 5. Update Task (PUT /tasks/:id)
    console.log('\n5️⃣ Testing Update Task (PUT /tasks/:id)...');
    const updateRes = await makeRequest(`/tasks/${createdId}`, 'PUT', {
      title: 'Automated Test Task (Updated)',
      completed: true,
      priority: 'low'
    });
    console.log(`   Status: ${updateRes.status}, New Completed: ${updateRes.data.data?.completed}`);
    if (updateRes.status !== 200 || updateRes.data.data.completed !== true) throw new Error('Update task failed');

    // 6. Delete Task (DELETE /tasks/:id)
    console.log('\n6️⃣ Testing Delete Task (DELETE /tasks/:id)...');
    const deleteRes = await makeRequest(`/tasks/${createdId}`, 'DELETE');
    console.log(`   Status: ${deleteRes.status}, Deleted ID: ${deleteRes.data.deletedId}`);
    if (deleteRes.status !== 200) throw new Error('Delete task failed');

    // 7. Verify Task Not Found After Deletion (GET /tasks/:id -> 404)
    console.log('\n7️⃣ Testing 404 on Deleted Task (GET /tasks/:id)...');
    const deletedCheck = await makeRequest(`/tasks/${createdId}`);
    console.log(`   Status: ${deletedCheck.status} (Expected 404)`);
    if (deletedCheck.status !== 404) throw new Error('Expected 404 for deleted task');

    // 8. Test Validation Error on Empty Title (POST /tasks -> 400)
    console.log('\n8️⃣ Testing Validation Failure (POST /tasks without title)...');
    const invalidRes = await makeRequest('/tasks', 'POST', {
      description: 'Task without title'
    });
    console.log(`   Status: ${invalidRes.status}, Error: "${invalidRes.data.error}"`);
    if (invalidRes.status !== 400) throw new Error('Expected 400 validation error');

    console.log('\n🎉 ALL 8 BACKEND TESTS PASSED SUCCESSFULLY! ✅\n');
  } catch (error) {
    console.error('\n❌ Verification Test Failed:', error.message);
    process.exit(1);
  }
}

runTests();
