const request = require("supertest")
const express = require("express")
const createCacheMiddleware = require("../utils/cache-middleware")

describe("createCacheMiddleware", () => {
  let app, cacheMiddleware

  beforeEach(() => {
    app = express()
    cacheMiddleware = createCacheMiddleware("testKey")
  })

  it("caches and serve data", async () => {
    app.use(cacheMiddleware)

    app.get("/test", (req, res) => {
      const data = "Ok"
      res.cache(data)
      res.send(data)
    })

    const firstResponse = await request(app).get("/test")
    expect(firstResponse.headers["x-cache"]).toBeUndefined()
    expect(firstResponse.text).toEqual("Ok")

    const secondResponse = await request(app).get("/test")
    expect(secondResponse.headers["x-cache"]).toEqual("hit")
    expect(secondResponse.text).toEqual("Ok")
  })

  it("bypass cache with cache-control: no-cache header", async () => {
    app.use(cacheMiddleware)

    app.get("/test", (req, res) => {
      res.cache("Ok")
      res.send("Ok")
    })

    const firstResponse = await request(app).get("/test")
    expect(firstResponse.headers["x-cache"]).toBeUndefined()
    expect(firstResponse.text).toEqual("Ok")

    const secondResponse = await request(app)
      .get("/test")
      .set("cache-control", "no-cache")
    expect(secondResponse.headers["x-cache"]).toBeUndefined()
    expect(secondResponse.text).toEqual("Ok")
  })
})
