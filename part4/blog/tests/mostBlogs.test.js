const mostBlogs = require('../utils/list_helper').mostBlogs

describe('most blog', () => {
  test('of emply list is none', () => {
    expect(mostBlogs([])).toBe('none')
  })

  test('when list has only one blog, equals the same blog author and blog count is 1', () => {
    const blogs = [
      {
        title: 'My First Blog',
        author: 'Mr.XYZ',
        url: 'https://www.quora.com',
        likes: 11,
      },
    ]

    expect(mostBlogs(blogs)).toEqual({
      author: 'Mr.XYZ',
      blogs: 1
    })
  })

  test('when list has multiple blogs from only one author, calculated right', () => {
    const blogs = [
      {
        title: 'My First Blog',
        author: 'Mr.XYZ',
        url: 'https://www.quora.com',
        likes: 11,
      },
      {
        title: 'My First Blog',
        author: 'Mr.XYZ',
        url: 'https://www.quora.com',
        likes: 11,
      },
    ]

    expect(mostBlogs(blogs)).toEqual({
      author: 'Mr.XYZ',
      blogs: 2
    })
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
      {
        title: 'My First Blog',
        author: 'Mr.XYZ',
        url: 'https://www.quora.com',
        likes: 11,
      },
      {
        title: 'My Second Blog',
        author: 'Mr.ABC',
        url: 'https://www.quora.com',
        likes: 13,
      },
      {
        title: 'My Third Blog',
        author: 'Mr.XYZ',
        url: 'https://www.quora.com',
        likes: 13,
      },
    ]

    expect(mostBlogs(blogs)).toEqual({
      author: 'Mr.XYZ',
      blogs: 2
    })
  })

  test('of a bigger list with multiple author having same blogs count is calculated right i.e first author with highest blogs', () => {
    const blogs = [
      {
        title: 'My First Blog',
        author: 'Mr.XYZ',
        url: 'https://www.quora.com',
        likes: 11,
      },
      {
        title: 'My Second Blog',
        author: 'Mr.ABC',
        url: 'https://www.quora.com',
        likes: 13,
      },
      {
        title: 'My Third Blog',
        author: 'Mr.XYZ',
        url: 'https://www.quora.com',
        likes: 13,
      },
      {
        title: 'My Fourth Blog',
        author: 'Mr.ABC',
        url: 'https://www.quora.com',
        likes: 13,
      },
    ]

    expect(mostBlogs(blogs)).toEqual({
      author: 'Mr.XYZ',
      blogs: 2,
    })
  })

})