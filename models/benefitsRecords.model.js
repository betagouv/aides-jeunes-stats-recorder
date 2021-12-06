const mongoose = require("mongoose")
const benefitsRecordsMongooseSchema = require.main.require(
  "./schemas/benefitsRecords.schema.js"
)

module.exports = {
  get(benefitId) {
    return {
      benefit_id: benefitId,
    }
  },
  create(benefitRecord) {
    try {
        const res = await benefitsRecordsMongooseSchema.create(benefitRecord)
    } catch(error) {
      console.error(error)
    }
    return benefitRecord
  },
  update(benefitId, benefitRecord) {
    return benefitRecord
  },
  delete(benefitId) {
    return true
  },
}
