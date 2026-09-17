# Practical 10: Asynchronous Processing with Event-Driven Architecture

**Student Name**: Keyur Rana  
**Student ID**: D25DCE176  
**Course**: AWDF (Advance Web Development Framework) - Sem 5, CHARUSAT  

## Objective
To implement asynchronous background processing using Node.js native `EventEmitter` without external dependencies.

## Architecture & Decoupling
- **`TaskEventEmitter`**: Subclasses native `events.EventEmitter` to handle lifecycle events.
- **`task-created` Event**: Dispatched upon successful document creation in MongoDB.
- **Decoupled Asynchronous Processing**: The Express route returns `201 Created` immediately with an `apiResponseTimestamp`, while the listener processes notification side effects asynchronously with simulated worker delay.
- **Supplementary Events**:
  - `task-deleted` event listener tracking task deletion timestamps.
  - Global `error` event listener preventing application crash on uncaught event exceptions.

## Verification Evidence: Timestamp Ordering
```
1. API Sent Response At : 2026-09-17T09:15:20.104Z
2. Handler Completed At : 2026-09-17T09:15:21.618Z
Time Difference (Lag)   : +1514ms
Result                  : API response returned 1.5s BEFORE background handler finished!
```
