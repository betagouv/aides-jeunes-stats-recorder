const { Router } = require("express")
const bodyParserMiddleware = require("body-parser")
const corsMiddleware = require("cors")

const config = require("./config/config.js")

const benefitsRecordsController = require("./controllers/benefitsRecords.controller.js")

const router = Router()

router.use(corsMiddleware(config.corsSettings))
router.use(bodyParserMiddleware.json())

router.post("/benefits/", benefitsRecordsController.createBenefitRecord)
router.get(
  "/statistics/",
  benefitsRecordsController.getBenefitsRankingStatistics
)

module.exports = router
