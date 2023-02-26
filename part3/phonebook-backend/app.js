const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const personsRouter = require('./controllers/persons.js')
const infoRouter = require('./controllers/info')
const middlewares = require('./utils/middlewares')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)


mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDG:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middlewares.requestLogger)

app.use('/info', infoRouter)
app.use('/api/persons', personsRouter)

app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)

module.exports = app
