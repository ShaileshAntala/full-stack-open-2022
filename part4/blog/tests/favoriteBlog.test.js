const favoriteBlog = require('../utils/list_helper').favoriteBlog

describe('favorite blog', () => {
  test('of emply list is none', () => {
    expect(favoriteBlog([])).toBe('none')
  })

  test('when list has only one blog, equals the same blog', () => {
    const blogs = [
      {
        title: 'My First Blog',
        author: 'Mr.XYZ',
        url: 'https://www.quora.com',
        likes: 11,
      },
    ]

    expect(favoriteBlog(blogs)).toEqual({
      title: 'My First Blog',
      author: 'Mr.XYZ',
      likes: 11,
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
        author: 'Mr.XYZ',
        url: 'https://www.quora.com',
        likes: 13,
      },
    ]

    expect(favoriteBlog(blogs)).toEqual({
      title: 'My Second Blog',
      author: 'Mr.XYZ',
      likes: 13,
    })
  })

  test('of a bigger list with multiple blogs having same likes is calculated right i.e last blog with highest likes', () => {
    const blogs = [
      {
        title: 'My First Blog',
        author: 'Mr.XYZ',
        url: 'https://www.quora.com',
        likes: 11,
      },
      {
        title: 'My Second Blog',
        author: 'Mr.XYZ',
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

    expect(favoriteBlog(blogs)).toEqual({
      title: 'My Second Blog',
      author: 'Mr.XYZ',
      likes: 13,
    })
  })

})
