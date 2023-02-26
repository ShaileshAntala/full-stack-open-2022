const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, likes: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body
  try {
    if(!username){
      return response.status(400).json({
        error: 'Username is required'
      })
    } else if (!password){
      return response.status(400).json({
        error: 'Password is required',
      })
    } else if(username.toString()?.length < 3){
      return response.status(400).json({
        error: 'Username must be at least 3 characters long',
      })
    } else if(password.toString()?.length < 3){
      return response.status(400).json({
        error: 'Password must be at least 3 characters long',
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash,
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
