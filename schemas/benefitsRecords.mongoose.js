const mongoose = require("mongoose")
const config = require.main.require("./config/config")

const BenefitsRecordsSchema = new mongoose.Schema(
  {
    created_at: { type: Date, default: () => Date.now() },
    hash_id: { type: String, required: true },
    benefit_id: { type: String, required: true },
    benefit_index: { type: Number, required: true },
    page_total: { type: Number, required: true },
    event_type: {
      type: String,
      enum: ["show", "showDetails"],
      default: "show",
      required: true,
    },
    api_version: { type: Number, default: config.api.version },
  },
  { collection: "records" }
)

module.exports = mongoose.model("BenefitsRecord", BenefitsRecordsSchema)
