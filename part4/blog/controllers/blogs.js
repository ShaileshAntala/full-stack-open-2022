const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')
const { userExtractor } = require('../utils/middlewares')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    const body = request.body
    if (!request?.user) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(request?.user)
    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id,
    })

    const result = await newBlog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const id = request.params.id
    if (!request.user) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const blog = await Blog.findById(id)

    if (blog) {
      if (blog?.user?.toString() === request?.user) {
        await Blog.findByIdAndRemove(id)
        response.status(204).end()
      } else {
        response.status(401).end()
      }
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  try {
    const result = await Blog.findByIdAndUpdate(id, blog, {
      new: true,
      runValidators: true,
      context: 'query',
    })

    if (result) {
      response.status(201).json(result)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
