// Practical 13: In-Memory AI Rate Limiter (Supplementary Problem 2)
// Enforces max 1 AI generation request per IP/task per 60 seconds

const requestTimestamps = new Map();

const aiRateLimiter = (req, res, next) => {
  const clientIdentifier = req.ip || req.headers['x-forwarded-for'] || 'local-client';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute cooldown

  if (requestTimestamps.has(clientIdentifier)) {
    const lastRequest = requestTimestamps.get(clientIdentifier);
    const elapsed = now - lastRequest;

    if (elapsed < windowMs) {
      const retryAfterSeconds = Math.ceil((windowMs - elapsed) / 1000);
      return res.status(429).json({
        success: false,
        error: `Rate limit exceeded. Please wait ${retryAfterSeconds} seconds before requesting AI task generation again.`,
        retryAfter: retryAfterSeconds
      });
    }
  }

  requestTimestamps.set(clientIdentifier, now);
  next();
};

module.exports = aiRateLimiter;
