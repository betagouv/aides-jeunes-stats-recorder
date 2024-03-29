const mongoose = require("mongoose")

const BenefitsRecordsSchema = new mongoose.Schema(
  {
    created_at: { type: Date, default: () => Date.now() },
    hash_id: { type: String, required: true },
    group_id: { type: mongoose.ObjectId },
    benefit_id: { type: String, required: true },
    benefit_index: { type: Number, required: true },
    page_total: { type: Number, required: true },
    event_type: {
      type: String,
      enum: [
        "show",
        "showDetails",
        "showDetailsFromGroupPage",
        "form",
        "instructions",
        "link",
        "msa",
        "show-locations",
        "link-ineligible",
        "show-unexpected",
        "show-unexpected-amount-link",
        "close",
        "teleservice",
        "teleservicePrefill",
        "retour-logement",
        "simulation-caf",
        "email",
      ],
      default: "show",
      required: true,
    },
    abtesting: { type: Map, of: String },
    version: { type: Number, required: true },
  },
  { collection: "records" },
)

module.exports = mongoose.model("BenefitsRecord", BenefitsRecordsSchema)
