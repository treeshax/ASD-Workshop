const TTL_MS = 60 * 1000; // 1 minute in milliseconds

let cache = {};

function cacheMiddleware(req, res, next) {
    if (req.method !== "GET") {
        return next();
    }

    const key = req.originalUrl || req.url;
    const cachedEntry = cache[key];

    if (cachedEntry) {
        const currentTime = Date.now();
        const age = currentTime - cachedEntry.createdAt;

        if (age <= TTL_MS) {
            res.setHeader("X-Cache", "HIT");
            return res.json(cachedEntry.data);
        }

        // Cache expired: remove stale entry
        delete cache[key];
    }

    // Cache miss or expired entry
    res.setHeader("X-Cache", "MISS");

    // Intercept response to store fresh data
    const originalJson = res.json.bind(res);
    res.json = (body) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache[key] = {
                data: body,
                createdAt: Date.now()
            };
        }
        return originalJson(body);
    };

    next();
}

function invalidateCache() {
    cache = {};
}

function getCacheStore() {
    return cache;
}

module.exports = {
    cacheMiddleware,
    invalidateCache,
    getCacheStore,
    TTL_MS
};
