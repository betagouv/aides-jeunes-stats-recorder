import mongoose from "mongoose"

const BenefitsRecordsSchema = new mongoose.Schema(
  {
    created_at: { type: Date, default: () => Date.now() },
    hash_id: { type: String, required: true },
    benefit_id: { type: String, required: true },
    benefit_page_position: { type: Number, required: true },
    benefits_page_total: { type: Number, required: true },
    event_type: { type: String, enum: ["display", "clicked"], required: true },
  },
  { collection: "completed" }
)

BenefitsRecordsSchema.index({ benefit_id: 1 }, { unique: true })

const model = mongoose.model("BenefitsRecord", BenefitsRecordsSchema)
export default model
