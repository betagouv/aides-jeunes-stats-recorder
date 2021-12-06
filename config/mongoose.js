const path = require("path")
const fs = require("fs")
const config = require("./config")

module.exports = function (mongoose, config) {
  mongoose.Promise = require("bluebird")

  mongoose.connect(config.mongo.uri, config.mongo.options)

  const modelsPath = path.join(__dirname, "../models")
  fs.readdirSync(modelsPath).forEach(function (file) {
    if (/(.*)\.(js$|coffee$)/.test(file)) {
      require(modelsPath + "/" + file)
    }
  })
}
