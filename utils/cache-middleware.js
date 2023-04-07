module.exports = function createCacheMiddleware(rootCacheKey, ttl = 30) {
  const inMemoryCache = {}

  return function cacheMiddleware(req, res, next) {
    const cacheKey = `${rootCacheKey}:${JSON.stringify(req.query)}`
    const cacheEntry = inMemoryCache[cacheKey]

    if (cacheEntry && Date.now() - cacheEntry.timestamp < ttl * 60 * 1000) {
      return res.send(cacheEntry.data)
    }

    res.cache = (data) => {
      inMemoryCache[cacheKey] = { data, timestamp: Date.now() }
    }
    next()
  }
}
