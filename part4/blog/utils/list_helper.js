// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if(blogs.length ===0){
    return 0
  } else if(blogs.length === 1){
    return blogs[0].likes
  } else{
    return blogs.reduce((likes, blog) => likes + blog.likes, 0)
  }
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0){
    return 'none'
  } else if(blogs.length === 1){
    const [blog] = blogs
    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes
    }
  } else{
    const favoriteBlog = blogs.reduce((prevBlog, currentBlog) =>(prevBlog.likes >= currentBlog.likes) ? prevBlog : currentBlog)
    return {
      title: favoriteBlog.title,
      author: favoriteBlog.author,
      likes: favoriteBlog.likes
    }
  }
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0){
    return 'none'
  } else{
    const authorsWithBlogsCount = blogs.reduce((allAuthors, blog) => {
      if (allAuthors.some((val) => val.author === blog.author)) {
        allAuthors.forEach((authorWithBlogCounts) => {
          if (authorWithBlogCounts.author === blog.author) {
            authorWithBlogCounts.blogs++
          }
        })
      } else {
        allAuthors.push({ author: blog.author, blogs: 1 })
      }
      return allAuthors
    }, [])
    return authorsWithBlogsCount.sort((a,b)=> b.blogs - a.blogs)[0]
  }
}

const mostLikes = (blogs) => {
  if(blogs.length === 0){
    return 'none'
  } else{
    const authorsWithLikesCount = blogs.reduce((allAuthors, blog) => {
      if (allAuthors.some((val) => val.author === blog.author)) {
        allAuthors.forEach((authorWithBlogCounts) => {
          if (authorWithBlogCounts.author === blog.author) {
            authorWithBlogCounts.likes+=blog.likes
          }
        })
      } else {
        allAuthors.push({ author: blog.author, likes: blog.likes })
      }
      return allAuthors
    }, [])
    return authorsWithLikesCount.sort((a,b)=> b.likes - a.likes)[0]
  }
}
 
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
