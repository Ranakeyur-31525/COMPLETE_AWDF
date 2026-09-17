const EventEmitter = require('events');

class TaskEventEmitter extends EventEmitter {}

const taskEmitter = new TaskEventEmitter();

// Memory store of processed background events for audit/inspection
const eventLogs = [];

// 1. Task Created Listener (Asynchronous decoupled execution)
taskEmitter.on('task-created', (taskData) => {
  // Use setImmediate / setTimeout to guarantee execution in background event loop
  // after current request callstack completes (Supplementary Problem 3: 1.5s slow background worker)
  setTimeout(() => {
    try {
      const handlerTimestamp = new Date().toISOString();
      const logEntry = {
        event: 'task-created',
        taskId: taskData._id,
        title: taskData.title,
        assignedUser: taskData.assignedUser || 'D25DCE176 (Default Student)',
        handlerTimestamp,
        simulatedDuration: '1500ms',
        status: 'Processed'
      };

      eventLogs.push(logEntry);

      console.log('---------------------------------------------------------');
      console.log(`[EVENT HANDLER COMPLETED] Event: task-created`);
      console.log(`  Handler Execution Time: ${handlerTimestamp}`);
      console.log(`  Task Title            : "${taskData.title}"`);
      console.log(`  Assigned User         : ${logEntry.assignedUser}`);
      console.log(`  Proof of Decoupling   : Executed asynchronously in background!`);
      console.log('---------------------------------------------------------');
    } catch (err) {
      taskEmitter.emit('error', err);
    }
  }, 1500);
});

// 2. Task Deleted Listener (Supplementary Problem 1)
taskEmitter.on('task-deleted', (taskId) => {
  setImmediate(() => {
    try {
      const handlerTimestamp = new Date().toISOString();
      const logEntry = {
        event: 'task-deleted',
        taskId,
        handlerTimestamp,
        status: 'Processed'
      };

      eventLogs.push(logEntry);

      console.log('---------------------------------------------------------');
      console.log(`[EVENT HANDLER COMPLETED] Event: task-deleted`);
      console.log(`  Handler Execution Time: ${handlerTimestamp}`);
      console.log(`  Deleted Task ID       : ${taskId}`);
      console.log('---------------------------------------------------------');
    } catch (err) {
      taskEmitter.emit('error', err);
    }
  });
});

// 3. Error Event Listener (Supplementary Problem 2: catches & logs handler errors)
taskEmitter.on('error', (err) => {
  console.error('[EVENT EMITTER ERROR]', {
    timestamp: new Date().toISOString(),
    message: err.message,
    stack: err.stack
  });
});

module.exports = {
  taskEmitter,
  eventLogs
};
