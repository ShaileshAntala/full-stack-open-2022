const mostLikes = require('../utils/list_helper').mostLikes
mostLikes
describe('most Likes', () => {
  test('of emply list is none', () => {
    expect(mostLikes([])).toBe('none')
  })

  test('when list has only one blog, equals the same blog author and likes count is same as blog', () => {
    const blogs = [
      {
        title: 'My First Blog',
        author: 'Mr.XYZ',
        url: 'https://www.quora.com',
        likes: 11,
      },
    ]

    expect(mostLikes(blogs)).toEqual({
      author: 'Mr.XYZ',
      likes: 11
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

    expect(mostLikes(blogs)).toEqual({
      author: 'Mr.XYZ',
      likes: 22
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

    expect(mostLikes(blogs)).toEqual({
      author: 'Mr.XYZ',
      likes: 24
    })
  })

  test('of a bigger list with multiple author having same likes count is calculated right i.e first author with highest likes', () => {
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
        likes: 11,
      },
    ]

    expect(mostLikes(blogs)).toEqual({
      author: 'Mr.XYZ',
      likes: 24,
    })
  })

})