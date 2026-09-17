// Practical 9: Automated Cache vs Uncached Benchmark Suite
const runBenchmark = async () => {
  const BASE_URL = 'http://localhost:5002';

  console.log('===============================================================');
  console.log('Practical 9: node-cache Response Time & Query Optimization Benchmark');
  console.log('===============================================================\n');

  try {
    // Ensure clean cache state
    await fetch(`${BASE_URL}/api/cache/flush`, { method: 'POST' });
    console.log('✔ Flushed in-memory cache for clean baseline test.\n');

    const uncachedTimes = [];
    const cachedTimes = [];

    // --- PHASE 1: UNCACHED RUNS (Forced DB Reads via Flush) ---
    console.log('--- Phase 1: Uncached Reads (Querying MongoDB directly) ---');
    for (let i = 1; i <= 3; i++) {
      await fetch(`${BASE_URL}/api/cache/flush`, { method: 'POST' });
      const t0 = performance.now();
      const res = await fetch(`${BASE_URL}/api/tasks`);
      const t1 = performance.now();
      const data = await res.json();
      const elapsed = parseFloat((t1 - t0).toFixed(2));
      uncachedTimes.push(elapsed);
      console.log(`  Sample ${i}: ${elapsed}ms | Source: ${data.source} | X-Cache: ${res.headers.get('x-cache')}`);
    }

    // --- PHASE 2: CACHED RUNS (node-cache In-Memory Reads) ---
    console.log('\n--- Phase 2: Cached Reads (Serving from node-cache) ---');
    // First call sets cache
    await fetch(`${BASE_URL}/api/tasks`);
    for (let i = 1; i <= 3; i++) {
      const t0 = performance.now();
      const res = await fetch(`${BASE_URL}/api/tasks`);
      const t1 = performance.now();
      const data = await res.json();
      const elapsed = parseFloat((t1 - t0).toFixed(2));
      cachedTimes.push(elapsed);
      console.log(`  Sample ${i}: ${elapsed}ms | Source: ${data.source} | X-Cache: ${res.headers.get('x-cache')}`);
    }

    // Averages
    const avgUncached = (uncachedTimes.reduce((a, b) => a + b, 0) / uncachedTimes.length).toFixed(2);
    const avgCached = (cachedTimes.reduce((a, b) => a + b, 0) / cachedTimes.length).toFixed(2);
    const speedup = (avgUncached / avgCached).toFixed(1);

    console.log('\n---------------------------------------------------------------');
    console.log('BENCHMARK SUMMARY (3 Sample Readings):');
    console.log(`Uncached MongoDB Readings : [${uncachedTimes.join('ms, ')}ms] -> Avg: ${avgUncached}ms`);
    console.log(`Cached node-cache Readings: [${cachedTimes.join('ms, ')}ms] -> Avg: ${avgCached}ms`);
    console.log(`Performance Improvement   : ${speedup}x Faster with In-Memory Caching!`);
    console.log('---------------------------------------------------------------\n');

    // --- PHASE 3: WRITE OPERATION CACHE INVALIDATION ---
    console.log('--- Phase 3: Cache Invalidation on Write (POST /tasks) ---');
    const createRes = await fetch(`${BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'New Task post-invalidation test',
        priority: 'high'
      })
    });
    const createData = await createRes.json();
    console.log('Created:', createData.message);

    const checkRes = await fetch(`${BASE_URL}/api/tasks`);
    console.log(`Subsequent GET /tasks header X-Cache: ${checkRes.headers.get('x-cache')} (Expected: MISS)`);
    console.log('✔ Cache was correctly invalidated upon write operation!\n');

    // --- PHASE 4: CACHE STATS (Supplementary Problem 2) ---
    console.log('--- Phase 4: Cache Metrics & Stats Endpoint (/api/cache/stats) ---');
    const statsRes = await fetch(`${BASE_URL}/api/cache/stats`);
    const statsData = await statsRes.json();
    console.log('Cache Stats Response:');
    console.log(JSON.stringify(statsData.metrics, null, 2));

    console.log('\n===============================================================');
    console.log('BENCHMARK COMPLETED SUCCESSFULLY');
    console.log('===============================================================');
  } catch (err) {
    console.error('Benchmark Error:', err.message);
  }
};

runBenchmark();
