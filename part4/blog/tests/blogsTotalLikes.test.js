const totalLikes = require('../utils/list_helper').totalLikes

describe('total likes', () => {
  test('of emply list is zero', () => {
    expect(totalLikes([])).toBe(0)
  })

  test('when list has only one blog, equals the like of that', () => {
    const blogs = [
      {
        title: 'My First Blog',
        author: 'Mr.XYZ',
        url: 'https://www.quora.com',
        likes: 11,
      },
    ]

    const result = totalLikes(blogs)
    expect(result).toBe(11)
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

    const result = totalLikes(blogs)
    expect(result).toBe(24)
  })
})
