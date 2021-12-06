const createHttpError = require("http-errors")

const benefitsRecordsModel = require.main.require(
  "./models/benefitsRecords.model.js"
)

function createBenefitRecord(request, response) {
  const record = benefitsRecordsModel.create(request.body).then((result) => {
    if (!result) {
      throw new Error("Failed to create record")
    }
    response.status(201).json(result)
  })
}

module.exports = {
  createBenefitRecord: [createBenefitRecord],
}
