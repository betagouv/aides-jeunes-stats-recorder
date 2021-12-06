const { ValidationError } = require("express-json-validator-middleware")

module.exports = function errorMiddleware(error, request, response, next) {
  if (response.headersSent) {
    return next(error)
  }

  if (error instanceof ValidationError) {
    response.set("Content-Type", "application/problem+json")

    response.status(400).json({
      title: "Invalid JSON query",
      invalid_properties: error.validationErrors.body.map((error) => {
        return {
          name: (error.dataPath || error.params.missingProperty).replace(
            ".",
            ""
          ),
          response: error.message,
        }
      }),
    })

    return next()
  }
  next(error)
}
