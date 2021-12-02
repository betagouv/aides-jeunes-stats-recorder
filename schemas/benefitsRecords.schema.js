module.exports = {
  type: "object",
  /*
        id
        created_at
    */
  required: [
    "hash_id",
    "benefit_id",
    "benefit_page_position",
    "benefits_page_total",
    "event_type",
  ],
  properties: {
    hash_id: {
      type: "string",
      minLength: 1,
    },
    benefit_id: {
      type: "string",
      minLength: 1,
    },
    benefit_page_position: {
      type: "number",
    },
    benefits_page_total: {
      type: "number",
    },
    event_type: {
      type: "string",
    },
  },
}
