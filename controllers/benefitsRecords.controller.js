const createHttpError = require("http-errors")

const validator = require.main.require("./middleware/validator.js")

const benefitsRecordsSchema = require.main.require(
  "./schemas/benefitsRecords.schema.js"
)
const benefitsRecordsModel = require.main.require(
  "./models/benefitsRecords.model.js"
)

function validateBenefitID(request, response, next) {
  const benefitId = request.params.benefit_id.length

  if (benefitId < 3) {
    const error = new createHttpError.BadRequest()

    return next(error)
  }

  next()
}

function getBenefitRecord(request, response) {
  const benefitId = request.params.benefit_id
  const record = benefitsRecordsModel.get(benefitId)

  response.json(record)
}

function createBenefitRecord(request, response) {
  //
}

module.exports = {
  getBenefitRecord: [validateBenefitID, getBenefitRecord],
  createBenefitRecord: [
    validator({ body: benefitsRecordsSchema }),
    createBenefitRecord,
  ],
}
