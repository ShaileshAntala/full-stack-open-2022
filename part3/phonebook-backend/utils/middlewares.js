const morgan = require('morgan')
const logger = require('./logger')

// eslint-disable-next-line no-unused-vars
morgan.token('data',  (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  if (req.method === 'PUT') {
    return JSON.stringify(req.body)
  }
  return
})

const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :data')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}