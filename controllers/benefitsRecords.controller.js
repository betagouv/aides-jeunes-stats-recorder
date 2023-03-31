const benefitsRecordsModel = require.main.require(
  "./models/benefitsRecords.model.js"
)

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

module.exports = {
  createBenefitRecord: [createBenefitRecord],
  getBenefitsRankingStatistics: [getBenefitsRankingStatistics],
}
