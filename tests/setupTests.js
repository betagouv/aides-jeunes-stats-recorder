process.env.MONGO_URL = "mongodb://localhost/ajs-test"
process.env.NODE_ENV = "test"

const { tearDownMongoose } = require("../config/mongoose.js")

afterAll(async () => {
  await tearDownMongoose()
})
