const benefitsRecordsModel = require.main.require(
  "./models/benefitsRecords.model.js",
)
const createCacheMiddleware = require("../utils/cache-middleware.js")

function createBenefitRecord(request, response, next) {
  benefitsRecordsModel
    .create(request.body)
    .then(() => {
      response.status(200).json({ response: "Record created" })
    })
    .catch(next)
}

function getBenefitsRankingStatistics(request, response, next) {
  benefitsRecordsModel
    .getBenefitsRankingStatistics()
    .then((records) => {
      response.status(200).json(records)
    })
    .catch(next)
}

async function aggregateBenefitEvents(request, response, next) {
  try {
    const startAt = request.query.start_at
    const parsedStartAt = startAt ? new Date(startAt) : new Date(0)
    const records = await benefitsRecordsModel.aggregateBenefitEvents(
      parsedStartAt,
    )

    response.cache(records)
    response.status(200).json(records)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createBenefitRecord: [createBenefitRecord],
  getBenefitsRankingStatistics: [getBenefitsRankingStatistics],
  aggregateBenefitEvents: [
    createCacheMiddleware("aggregateBenefitEvents"),
    aggregateBenefitEvents,
  ],
}
