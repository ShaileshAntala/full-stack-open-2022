const mongoose = require('mongoose')
const Blog = require('./models/blogs')

if (process.argv.length < 2) {
  console.log('give blog as argument')
  process.exit(1)
}

const url = process.env.TEST_MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

if (process.argv.length === 2) {
  Blog.find({}).then((result) => {
    result.forEach((blog) => console.log(`${blog.title} ${blog.author}`))
    mongoose.connection.close()
  })
} else {
  const blog = new Blog({
    title: process.argv[2],
    author: process.argv[3],
    url: process.argv[4],
    likes: process.argv[5]
  })

  blog.save().then((result) => {
    console.log(`added blog ${result.title} of ${result.author} to blogList`)
    mongoose.connection.close()
  })
}
