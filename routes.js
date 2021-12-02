const { Router } = require("express")
const bodyParserMiddleware = require("body-parser")
const corsMiddleware = require("cors")

const config = require("./config/config.js")

const router = Router()

router.use(corsMiddleware(config.corsSettings))
router.use(bodyParserMiddleware.json())

module.exports = router
