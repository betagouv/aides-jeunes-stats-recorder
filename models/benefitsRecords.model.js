const mongoose = require("mongoose")
require.main.require("./config/mongoose")

const BenefitsRecordsSchema = require.main.require(
  "./schemas/benefitsRecords.mongoose.js"
)

module.exports = {
  get(benefitId) {
    return {
      benefit_id: benefitId,
    }
  },
  async create(benefitRecord) {
    try {
      const result = await BenefitsRecordsSchema.create(benefitRecord)
      return result
    } catch (error) {
      console.error(error)
      return
    }
  },
  update(benefitId, benefitRecord) {
    return benefitRecord
  },
  delete(benefitId) {
    return true
  },
}
