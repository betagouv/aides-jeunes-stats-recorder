const createHttpError = require("http-errors")

const benefitsRecordsModel = require.main.require(
  "./models/benefitsRecords.model.js"
)

function createBenefitRecord(request, response) {
  const record = benefitsRecordsModel
    .create(request.body)
    .then((result) => {
      if (!result) {
        throw new Error("Failed to create record")
      }
      response.status(201).json(result)
    })
    .catch((error) => {
      throw new Error(`Failed to create record: ${error}`)
    })
}

function listBenefitsRecords(request, response) {
  const records = benefitsRecordsModel
    .listBenefits()
    .then((records) => {
      if (!records) {
        throw new Error("Failed to list records")
      }
      response.status(200).json(records)
    })
    .catch((error) => {
      throw new Error(`Failed to list records: ${error}`)
    })
}

module.exports = {
  createBenefitRecord: [createBenefitRecord],
  listBenefitsRecords: [listBenefitsRecords],
}
