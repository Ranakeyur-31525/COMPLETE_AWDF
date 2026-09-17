const NodeCache = require('node-cache');

// Initialize NodeCache with default 60s TTL and check-period of 120s
const taskCache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

// Hit/Miss Counter Metrics Tracker (Supplementary Problem 2)
const stats = {
  hits: 0,
  misses: 0,
  invalidations: 0,
  startTime: new Date().toISOString()
};

const cacheManager = {
  get: (key) => {
    const val = taskCache.get(key);
    if (val !== undefined) {
      stats.hits += 1;
      return val;
    }
    stats.misses += 1;
    return null;
  },

  set: (key, val, ttl = 60) => {
    return taskCache.set(key, val, ttl);
  },

  del: (key) => {
    stats.invalidations += 1;
    return taskCache.del(key);
  },

  delPattern: (prefix) => {
    const keys = taskCache.keys();
    const matched = keys.filter((k) => k.startsWith(prefix));
    if (matched.length > 0) {
      taskCache.del(matched);
      stats.invalidations += matched.length;
    }
  },

  flush: () => {
    taskCache.flushAll();
    stats.invalidations += 1;
  },

  getStats: () => {
    const totalRequests = stats.hits + stats.misses;
    const hitRate = totalRequests > 0 ? ((stats.hits / totalRequests) * 100).toFixed(2) + '%' : '0.00%';
    return {
      success: true,
      metrics: {
        hits: stats.hits,
        misses: stats.misses,
        totalRequests,
        hitRate,
        invalidations: stats.invalidations,
        activeKeysCount: taskCache.keys().length,
        activeKeys: taskCache.keys(),
        statsSnapshot: taskCache.getStats(),
        uptimeSince: stats.startTime
      }
    };
  }
};

module.exports = cacheManager;
