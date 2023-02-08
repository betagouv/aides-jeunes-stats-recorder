const createHttpError = require("http-errors")

const benefitsRecordsModel = require.main.require(
  "./models/benefitsRecords.model.js"
)

function createBenefitRecord(request, response, next) {
  const record = benefitsRecordsModel
    .create(request.body)
    .then(() => {
      response.status(200).json({response: 'Record created'})
    })
    .catch(next)
}

function listBenefitsRecords(request, response) {
  const records = benefitsRecordsModel
    .listBenefits()
    .then((records) => {
      response.status(200).json(records)
    })
    .catch(next)
}

module.exports = {
  createBenefitRecord: [createBenefitRecord],
  listBenefitsRecords: [listBenefitsRecords],
}
