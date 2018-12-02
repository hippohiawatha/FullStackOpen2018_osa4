const initial = [
  {
    title: 'minä',
    author: 'hän',
    url: 'url',
    likes: 9000
  }
]

const tester = [
  {
    title: 'sinä',
    author: 'joku',
    url: 'url',
    likes: 100
  },
  {
    title: 'test',
    author: 'some',
    url: 'urli',
    likes: 3
  }
]

const incomplete = (blog, fields) => {
  fields.forEach(field => delete blog[field])
  return blog
}

module.exports = {
  initial,
  tester,
  incomplete
}
