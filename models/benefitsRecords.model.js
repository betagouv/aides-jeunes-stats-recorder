const mongoose = require("mongoose")
require.main.require("./config/mongoose")

const BenefitsRecordsSchema = require.main.require(
  "./schemas/benefitsRecords.mongoose.js"
)

module.exports = {

  async create(benefitRecord) {
    try {
      const result = await BenefitsRecordsSchema.create(benefitRecord)
      return {"response": "Record created", "status": 201}
    } catch (error) {
      console.error(error)
      return
    }
  }

}
