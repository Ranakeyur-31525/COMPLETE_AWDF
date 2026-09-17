// Logger middleware
function loggerMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl || req.url}`);
  next();
}

// Ensure Content-Type is application/json for POST and PUT
function requireJsonHeader(req, res, next) {
  if (['POST', 'PUT'].includes(req.method)) {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Header: Content-Type must be application/json'
      });
    }
  }
  next();
}

// Validate numeric task ID for Practical 4
function validateNumericTaskId(req, res, next) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      error: `Invalid task ID: '${req.params.id}'. Must be a positive integer.`
    });
  }
  req.taskId = id;
  next();
}

module.exports = {
  loggerMiddleware,
  requireJsonHeader,
  validateNumericTaskId
};
