const { Router } = require("express")
const bodyParserMiddleware = require("body-parser")
const corsMiddleware = require("cors")

const config = require("./config/config.js")

const benefitsRecordsController = require("./controllers/benefitsRecords.controller.js")

const router = Router()

router.use(corsMiddleware(config.corsSettings))
router.use(bodyParserMiddleware.json())

router.get("/benefit/:benefit_id", benefitsRecordsController.getBenefitRecord)
router.post("/benefits/", benefitsRecordsController.createBenefitRecord)

module.exports = router
