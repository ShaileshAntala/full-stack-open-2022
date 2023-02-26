const Blog = require('../models/blogs')
const User = require('../models/users')

const initialBlogs = [
  {
    title: 'my First blog',
    author: 'Mr.ABC',
    url: 'www.quora.com',
    likes: 12
  },
  {
    title: 'my Second blog',
    author: 'Mr.XYZ',
    url: 'www.quora.com',
    likes: 12,
    user: '63fb4236201c3dadd9f1183d'
  }
]


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}