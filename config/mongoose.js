const mongoose = require('mongoose');
const config = require("./config")

mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.uri, config.mongo.options)

module.exports = {mongoose};