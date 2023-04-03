const request = require("supertest")

const app = require("../server.js")
const BenefitsRecordsSchema = require("./schemas/benefitsRecords.mongoose.js")

describe("POST /benefits/", () => {
  const payload = {
    benefit_id: "benefit_id",
    hash_id: "hash_id",
    benefit_index: 1,
    event_type: "show",
    page_total: 2,
    version: 2,
  }
  let response

  beforeAll(async () => {
    response = await request(app).post("/benefits/").send(payload)
  })

  it("responds 200", async () => {
    expect(response.statusCode).toBe(200)
  })

  it("stores data in MongoDB", async () => {
    const benefit = await BenefitsRecordsSchema.findOne({
      benefit_id: payload.benefit_id,
    })
    expect(benefit).not.toBeNull()
  })
})

describe("POST /benefits/ when payload is invalid", () => {
  const payload = {
    event_type: "unknown",
  }

  it("responds 422", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(jest.fn())

    const response = await request(app).post("/benefits/").send(payload)

    expect(response.statusCode).toBe(422)
    expect(consoleSpy).toHaveBeenCalled()
  })
})

describe("POST /benefits/ when payload is an array", () => {
  const payload = {
    benefit_id: "benefit_id",
    hash_id: "hash_id",
    benefit_index: 1,
    event_type: "show",
    page_total: 2,
    version: 2,
  }
  const otherPayload = {
    ...payload,
    benefit_index: 2,
  }
  let response

  beforeAll(async () => {
    response = await request(app)
      .post("/benefits/")
      .send([payload, otherPayload])
  })

  it("responds 200", async () => {
    expect(response.statusCode).toBe(200)
  })

  it("stores data in MongoDB", async () => {
    const benefit = await BenefitsRecordsSchema.findOne({
      benefit_id: payload.benefit_id,
    })
    expect(benefit).not.toBeNull()

    const otherBenefit = await BenefitsRecordsSchema.findOne({
      benefit_id: otherPayload.benefit_id,
    })
    expect(otherBenefit).not.toBeNull()
  })

  it("stores same group_id", async () => {
    const benefit = await BenefitsRecordsSchema.findOne({
      benefit_id: payload.benefit_id,
    })
    const otherBenefit = await BenefitsRecordsSchema.findOne({
      benefit_id: otherPayload.benefit_id,
    })

    expect(benefit.group_id).toEqual(otherBenefit.group_id)
  })
})

describe("GET /benefits", () => {
  const payload = {
    benefit_id: "benefit_id",
    hash_id: "hash_id",
    benefit_index: 1,
    event_type: "show",
    page_total: 3,
    version: 2,
    created_at: new Date("2022-01-01T00:00:00Z"),
  }
  const otherPayload = {
    ...payload,
    benefit_id: "other_benefit_id",
    event_type: "show-locations",
    created_at: new Date("2023-01-01T00:00:00Z"),
  }
  let response

  beforeAll(async () => {
    await BenefitsRecordsSchema.deleteMany({})
    await BenefitsRecordsSchema.create([payload, payload, otherPayload])
    response = await request(app).get("/benefits")
  })

  it("responds 200", async () => {
    expect(response.statusCode).toBe(200)
  })

  it("returns data", async () => {
    expect(response.body.length).toBe(2)
    expect(response.body).toContainEqual({
      id: "benefit_id",
      events: {
        show: 2,
      },
    })

    expect(response.body).toContainEqual({
      id: "other_benefit_id",
      events: {
        "show-locations": 1,
      },
    })
  })

  describe("when start_at is provided", () => {
    beforeAll(async () => {
      response = await request(app).get("/benefits?start_at=2022-12-31")
    })

    it("returns data", async () => {
      expect(response.body.length).toBe(1)
      expect(response.body).toContainEqual({
        id: "other_benefit_id",
        events: {
          "show-locations": 1,
        },
      })
    })
  })
})
