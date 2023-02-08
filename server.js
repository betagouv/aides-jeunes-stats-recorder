const express = require("express")

const config = require("./config/config.js")
const routes = require("./routes.js")

const app = express()
app.use("/", routes)

app.use((error, request, response, next) => {
  const message = error?.message || error
  console.error(error?.message || error)
  response.status(422).json({message})
})

const server = app.listen(config.server.port, () => {
  console.log(`Server running at http://localhost:${server.address().port}`)
})
