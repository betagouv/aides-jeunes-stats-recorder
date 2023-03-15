const request = require("supertest")

const app = require("../server.js")
const BenefitsRecordsSchema = require("./schemas/benefitsRecords.mongoose.js")

describe("GET /statistics/", () => {
  it("responds 200", async () => {
    const response = await request(app).get("/statistics/")
    expect(response.statusCode).toBe(200)
  })
})

describe("GET /statistics/ when there are records", () => {
  beforeAll(async () => {
    await BenefitsRecordsSchema.insertMany([
      {
        benefit_id: "benefit_id",
        hash_id: "hash_id",
        benefit_index: 1,
        event_type: "show",
        page_total: 2,
        version: 2,
      },
      {
        benefit_id: "benefit_id",
        hash_id: "hash_id",
        benefit_index: 2,
        event_type: "show",
        page_total: 2,
        version: 2,
      },
    ])
  })

  it("responds 200", async () => {
    const response = await request(app).get("/statistics/")
    expect(response.statusCode).toBe(200)
  })

  it("returns statistics", async () => {
    const response = await request(app).get("/statistics/")
    expect(response.body).toEqual([
      {
        benefit: "benefit_id",
        events: { show: { 2: { 1: 1, 2: 1 } } },
        events_count: 2,
      },
    ])
  })
})
