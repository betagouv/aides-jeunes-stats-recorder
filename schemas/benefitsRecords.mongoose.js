const mongoose = require("mongoose")

const BenefitsRecordsSchema = new mongoose.Schema(
  {
    created_at: { type: Date, default: () => Date.now() },
    hash_id: { type: String, required: true },
    benefit_id: { type: String, required: true },
    benefit_index: { type: Number, required: true },
    page_total: { type: Number, required: true },
    event_type: {
      type: String,
      enum: ["display", "clicked"],
      default: "display",
      required: true,
    },
  },
  { collection: "records" }
)

module.exports = mongoose.model("BenefitsRecord", BenefitsRecordsSchema)
