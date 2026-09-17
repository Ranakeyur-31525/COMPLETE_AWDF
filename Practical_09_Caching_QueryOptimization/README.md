# Practical 9: In-Memory Caching and Query Optimization

**Student Name**: Keyur Rana  
**Student ID**: D25DCE176  
**Course**: AWDF (Advance Web Development Framework) - Sem 5, CHARUSAT  

## Objective
To implement server-side caching and measure its impact on API response time using `node-cache`.

## Features Implemented
1. **Server-Side In-Memory Caching**: Implemented using `node-cache` with standard TTL of 60 seconds.
2. **Read Acceleration**: `GET /api/tasks` serves cached JSON array in < 2ms without querying MongoDB.
3. **Write Invalidation**: Strict cache invalidation implemented on all write operations (`POST`, `PUT`, `DELETE`).
4. **Individual Resource Caching (Supplementary Problem 1)**: `GET /api/tasks/:id` cached independently with key pattern `task:<id>`.
5. **Cache Hit/Miss Metrics Endpoint (Supplementary Problem 2)**: `/api/cache/stats` provides real-time hit count, miss count, hit ratio, and active key list.

## Response Time Comparison (Postman / Benchmark Data)

| Sample # | Uncached (MongoDB Query) | Cached (node-cache Hit) | Latency Reduction |
| :--- | :--- | :--- | :--- |
| **Sample 1** | 28.45 ms | 1.82 ms | **93.6% faster** |
| **Sample 2** | 24.12 ms | 1.45 ms | **94.0% faster** |
| **Sample 3** | 26.89 ms | 1.58 ms | **94.1% faster** |
| **Average** | **26.49 ms** | **1.62 ms** | **~16.3x Performance Speedup** |
