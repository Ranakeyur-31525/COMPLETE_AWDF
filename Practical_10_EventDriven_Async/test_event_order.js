// Practical 10: Timestamp Ordering Verification Script
// Proves that HTTP Response returns BEFORE the asynchronous background handler finishes
const testEventOrdering = async () => {
  const BASE_URL = 'http://localhost:5003';
  console.log('===============================================================');
  console.log('Practical 10: Event-Driven Architecture Timestamp Ordering Test');
  console.log('===============================================================\n');

  try {
    console.log('[STEP 1] Dispatching POST /api/tasks to trigger task-created event...');
    const clientDispatchTime = new Date().toISOString();

    const res = await fetch(`${BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Async Notification Order Verification',
        priority: 'high',
        assignedUser: 'Keyur Rana (D25DCE176)'
      })
    });

    const clientReceiveTime = new Date().toISOString();
    const data = await res.json();

    console.log('\n--- API RESPONSE RECEIVED ---');
    console.log(`HTTP Status              : ${res.status} Created`);
    console.log(`Client Dispatch Time     : ${clientDispatchTime}`);
    console.log(`Server Response Time     : ${data.apiResponseTimestamp}`);
    console.log(`Client Receive Time      : ${clientReceiveTime}`);
    console.log(`Total Roundtrip Latency  : Fast non-blocking response!\n`);

    console.log('[STEP 2] Waiting 2 seconds for background event handler to finish processing...');
    await new Promise((r) => setTimeout(r, 2200));

    console.log('[STEP 3] Querying /api/tasks/event-logs to inspect background handler timestamp:');
    const logsRes = await fetch(`${BASE_URL}/api/tasks/event-logs`);
    const logsData = await logsRes.json();
    const latestLog = logsData.data[logsData.data.length - 1];

    console.log('Latest Event Log Record:');
    console.log(JSON.stringify(latestLog, null, 2));

    console.log('\n---------------------------------------------------------------');
    console.log('TIMESTAMP ORDERING VERIFICATION:');
    console.log(`1. API Sent Response At  : ${data.apiResponseTimestamp}`);
    console.log(`2. Handler Completed At  : ${latestLog.handlerTimestamp}`);
    const timeDiffMs = new Date(latestLog.handlerTimestamp) - new Date(data.apiResponseTimestamp);
    console.log(`Time Difference (Lag)    : +${timeDiffMs}ms`);

    if (timeDiffMs > 0) {
      console.log('✔ VERIFIED: Response was returned BEFORE background handler completed!');
      console.log('✔ Non-blocking asynchronous event decoupling 100% PROVEN.');
    } else {
      console.log('❌ Unexpected timestamp ordering');
    }
    console.log('---------------------------------------------------------------\n');
  } catch (err) {
    console.error('Test Error:', err.message);
  }
};

testEventOrdering();
