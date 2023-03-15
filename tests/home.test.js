const request = require("supertest")

const app = require("../server.js")

describe("GET /", () => {
  it("responds 404", async () => {
    const response = await request(app).get("/")
    expect(response.statusCode).toBe(404)
  })
})
