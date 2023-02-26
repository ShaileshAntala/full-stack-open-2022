const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogs')
const { initialBlogs, blogsInDb } = require('./test_helper')

const commonHeaders = { 
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYzZmI0MjM2MjAxYzNkYWRkOWYxMTgzZCIsImlhdCI6MTY3NzQyNjIwNiwiZXhwIjoxNjc3NDI5ODA2fQ.LdrNGFweWmGyvPvrTeLyieL5-yOEf4OGIfu92mL3PX8'
}

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map((r) => r.title)
    expect(titles).toContain('my Second blog')
  })

  test('there is unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body.every((r) =>
      Object.prototype.hasOwnProperty.call(r, 'id')
    )
    expect(id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'my Third blog',
      author: 'Mr.ABC',
      url: 'www.quora.com',
      likes: 12
    }

    await api
      .post('/api/blogs')
      .set(commonHeaders)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

    const contents = blogsAtEnd.map((n) => n.title)
    expect(contents).toContain('my Third blog')
  })

  test('if likes property missing, default should be 0 in DB', async () => {
    const newBlog = {
      title: 'my Fourth blog',
      author: 'Mr.ABC',
      url: 'www.quora.com'
    }

    await api
      .post('/api/blogs')
      .set(commonHeaders)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

    const content = blogsAtEnd.find((n) => n.title === 'my Fourth blog')
    expect(content.likes).toBe(0)
  })

  test('if title or url is missing, backend responds with the status code 400 Bad Request', async () => {
    const newBlog = {
      title: 'my Fifth blog',
      author: 'Mr.ABC',
      likes: 13
    }

    await api
      .post('/api/blogs')
      .set(commonHeaders)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
  })
})

describe('deleting a blog', () => {
  test('succeeds with valid id', async () => {
    const response = await api.get('/api/blogs')
    //id for second blog in DB
    const id = response.body[1].id
    await api
      .delete(`/api/blogs/${id}`)
      .set(commonHeaders)
      .expect(204)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

    const contents = blogsAtEnd.map((n) => n.title)
    expect(contents).toContain('my First blog')
  })

  test('fails with invalid id or no id', async () => {
    const id = '63faf0bac63f3ca5064d5c34'
    await api
      .delete(`/api/blogs/${id}`)
      .set(commonHeaders)
      .expect(404)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
  })
  test('fails with bad request for malformed id', async () => {
    const id = '63faf0bac63f3c'
    await api
      .delete(`/api/blogs/${id}`)
      .set(commonHeaders)
      .expect(400)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
  })
})

describe('updating a blog', () => {
  test('succeeds with valid id', async () => {
    const response = await api.get('/api/blogs')
    //id for second blog in DB
    const id = response.body[1].id
    //content for updating second blog
    const blog = {
      ...initialBlogs[1],
      likes: 707
    }
    await api
      .put(`/api/blogs/${id}`)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)

    const contents = blogsAtEnd.map((n) => n.likes)
    expect(contents).toContain(707)
  })

  test('fails with invalid id or no id', async () => {
    const id = '63faf0bac63f3ca5064d5c34'
    const blog = {
      ...initialBlogs[1],
      likes: 707
    }
    await api
      .put(`/api/blogs/${id}`)
      .send(blog)
      .expect(404)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)

    const contents = blogsAtEnd.map((n) => n.likes)
    expect(contents).not.toContain(707)
  })

  test('fails with bad request for malformed id', async () => {
    const id = '63faf0bac63f3c'
    const blog = {
      ...initialBlogs[1],
      likes: 707
    }
    await api
      .put(`/api/blogs/${id}`)
      .send(blog)
      .expect(400)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)

    const contents = blogsAtEnd.map((n) => n.likes)
    expect(contents).not.toContain(707)
  })
})



afterAll(async () => {
  await mongoose.connection.close()
})
