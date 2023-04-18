module.exports = function createCacheMiddleware(rootCacheKey, ttl = 30) {
  const inMemoryCache = {}
  const ttlInMilliseconds = ttl * 60 * 1000

  function cleanupCache() {
    const now = Date.now()
    for (const key in inMemoryCache) {
      if (inMemoryCache[key].timestamp + ttlInMilliseconds < now) {
        delete inMemoryCache[key]
      }
    }
  }

  if (process.env.NODE_ENV !== "test") {
    setInterval(cleanupCache, ttlInMilliseconds)
  }

  return function cacheMiddleware(req, res, next) {
    const cacheKey = `${rootCacheKey}:${JSON.stringify(req.query)}`
    const cacheControl = req.headers["cache-control"]
    const useCache = !cacheControl || !cacheControl.includes("no-cache")

    if (useCache) {
      const cacheEntry = inMemoryCache[cacheKey]

      if (cacheEntry && Date.now() - cacheEntry.timestamp < ttlInMilliseconds) {
        return res.set("x-cache", "hit").send(cacheEntry.data)
      }
    }

    res.cache = (data) => {
      inMemoryCache[cacheKey] = { data, timestamp: Date.now() }
    }
    next()
  }
}
