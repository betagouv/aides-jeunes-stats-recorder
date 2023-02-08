const mongoose = require("mongoose")
require.main.require("./config/mongoose")

const BenefitsRecordsSchema = require.main.require(
  "./schemas/benefitsRecords.mongoose.js"
)

module.exports = {
  async create(benefitRecordOrRecords) {
    const group_id = new mongoose.Types.ObjectId()
    const addGroup = (b) => (b.group_id = group_id)
    if (benefitRecordOrRecords instanceof Array) {
      benefitRecordOrRecords.forEach(addGroup)
    } else {
      addGroup(benefitRecordOrRecords)
    }
    return await BenefitsRecordsSchema.create(benefitRecordOrRecords)
  },
  async listBenefits() {
    return BenefitsRecordsSchema.aggregate([
      {
        $match: {
          version: 2,
        },
      },
      {
        $group: {
          _id: {
            benefit: "$benefit_id",
            index: {
              $toString: "$benefit_index",
            },
            total: {
              $toString: "$page_total",
            },
            event_type: "$event_type",
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $group: {
          _id: {
            benefit: "$_id.benefit",
            event_type: "$_id.event_type",
            total: "$_id.total",
          },
          items: {
            $push: {
              k: "$_id.index",
              v: "$count",
            },
          },
          events_count: {
            $sum: "$count",
          },
        },
      },
      {
        $addFields: {
          events: {
            $arrayToObject: "$items",
          },
        },
      },
      {
        $project: {
          items: 0,
        },
      },
      {
        $group: {
          _id: {
            benefit: "$_id.benefit",
            event_type: "$_id.event_type",
          },
          items: {
            $push: {
              k: "$_id.total",
              v: "$events",
            },
          },
          events_count: {
            $sum: "$events_count",
          },
        },
      },
      {
        $addFields: {
          events: {
            $arrayToObject: "$items",
          },
        },
      },
      {
        $project: {
          items: 0,
        },
      },
      {
        $group: {
          _id: {
            benefit: "$_id.benefit",
          },
          items: {
            $push: {
              k: "$_id.event_type",
              v: "$events",
            },
          },
          events_count: {
            $sum: "$events_count",
          },
        },
      },
      {
        $addFields: {
          events: {
            $arrayToObject: "$items",
          },
        },
      },
      {
        $addFields: {
          benefit: "$_id.benefit",
        },
      },
      {
        $project: {
          _id: 0,
          items: 0,
        },
      },
      {
        $sort: {
          events_count: -1,
        },
      },
    ])
  },
}
