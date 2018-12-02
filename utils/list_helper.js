const dummy = blogs => 1

const totalLikes = blogs => {
  let sum = 0
  blogs.forEach(blog => sum += blog.likes)
  return sum
}

const favoriteBlog = blogs => {
  let fav = blogs.length > 0 ? blogs[0] : null
  blogs.forEach(blog => {
    if(blog.likes > fav.likes) fav = blog
  })
  return fav
}

const mostBlogs = blogs => {
  const authors = {}
  blogs.forEach(blog => {
    if (Object.keys(authors).includes(blog.author)) {
      authors[blog.author]++
    } else {
      authors[blog.author] = 1
    }
  })

  topAuthor = authors.length > 0 ? Object.keys(authors)[0] : null
  blogSum = authors.length > 0 ? authors[0] : 0
  Object.keys(authors).forEach(author => {
    if (authors[author] > blogSum) {
      topAuthor = author
      blogSum = authors[author]
    }
  })

  return {
    author: topAuthor,
    blogs: blogSum
  }
}

const mostLikes = blogs => {
  const authors = {}
  blogs.forEach(blog => {
    if (Object.keys(authors).includes(blog.author)) {
      authors[blog.author] += blog.likes
    } else {
      authors[blog.author] = blog.likes
    }
  })
  topAuthor = authors.length > 0 ? Object.keys(authors)[0] : null
  topLikes = authors.length > 0 ? authors[0] : 0
  Object.keys(authors).forEach(author => {
    if (authors[author] > topLikes) {
      topAuthor = author
      topLikes = authors[author]
    }
  })
  return {
    author: topAuthor,
    likes: topLikes
  }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
