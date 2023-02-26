const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const { MONGODB_URI } = require('./utils/config')
const middlewares = require('./utils/middlewares')

mongoose.set('strictQuery', false)

mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(middlewares.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)

module.exports = app