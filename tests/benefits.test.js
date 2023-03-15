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
