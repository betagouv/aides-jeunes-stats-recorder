const mongoose = require("mongoose")
const config = require("./config")

mongoose.Promise = global.Promise
mongoose.connect(config.mongo.uri, config.mongo.options)

async function tearDownMongoose() {
  if (
    process.env.NODE_ENV !== "test" ||
    !config.mongo.uri.includes("mongodb://localhost")
  ) {
    throw new Error("tearDownMongoose() should only be called in test mode")
  }

  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
}

module.exports = { mongoose, tearDownMongoose }
