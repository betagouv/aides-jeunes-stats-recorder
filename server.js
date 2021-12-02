const express = require("express")
require("express-async-errors")

const config = require("./config/config.js")
const routes = require("./routes.js")

const app = express()
app.use("/", routes)

const server = app.listen(config.server.port, () => {
  console.log(`Server running at http://localhost:${server.address().port}`)
})
