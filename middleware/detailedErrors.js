const createHttpError = require("http-errors")
const { ValidationError } = require("express-json-validator-middleware")

const defaultError = {
  response: "An internal server error occured",
  status: 500,
}

const errors = [
  {
    matchErrorClass: createHttpError.BadRequest,
    details: {
      response: "Bad request: benefit id is unknown",
      status: 400,
    },
  },
  {
    matchErrorClass: ValidationError,
    details: {
      response: "Invalid benefit record object",
      status: 422,
    },
    specifics(error) {
      return {
        invalid_params: error.validationErrors,
      }
    },
  },
]

function getProblemDetailsForError(error) {
  const errorType = errors.find((errorType) => {
    return error instanceof errorType.matchErrorClass
  })

  if (!errorType) {
    return defaultError
  }

  const problemDetails = { ...errorType.details }
  if (typeof errorType.specifics === "function") {
    Object.assign(problemDetails, errorType.specifics(error))
  }

  return problemDetails
}

function problemDetailsResponseMiddleware(error, request, response, next) {
  if (response.headersSent) {
    return next(error)
  }

  const problemDetails = getProblemDetailsForError(error)

  if (!problemDetails.status) {
    problemDetails.status = error.statusCode || 500
  }

  response.set("Content-Type", "application/problem+json")
  response.status(problemDetails.status).json(problemDetails)

  next()
}

module.exports = problemDetailsResponseMiddleware
