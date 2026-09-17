// 1. Request Logging Middleware (applied globally)
const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

// 2. Content-Type Header Validation Middleware (for POST/PUT requests)
const requireJsonHeader = (req, res, next) => {
  if (['POST', 'PUT'].includes(req.method)) {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Content-Type',
        details: 'Requests with POST or PUT methods must include header Content-Type: application/json'
      });
    }
  }
  next();
};

// 3. Route-Specific Task ID Validation Middleware
const validateTaskId = (req, res, next) => {
  const idNum = parseInt(req.params.id, 10);
  if (isNaN(idNum) || idNum <= 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid Task ID format',
      details: `Task ID '${req.params.id}' must be a positive integer`
    });
  }
  req.validatedId = idNum;
  next();
};

module.exports = {
  loggerMiddleware,
  requireJsonHeader,
  validateTaskId
};
