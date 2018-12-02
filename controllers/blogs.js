const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  try{
    const blog = new Blog(req.body)

    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)

    blog.user = user._id

    if(blog.title === undefined || blog.url === undefined){
      return res.status(400).end()
    }

    const saved = await blog.save()
    user.blogs = user.blogs.concat(saved._id)
    await user.save()
    res.status(201).json(saved)
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      console.log('here')
      res.status(401).json({error: exception.message })
    } else {
      console.log(exception.message)
      res.status(500).json({error: 'something went wrong'})
    }
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    const blog  = await Blog.findById(req.params.id)
    console.log(blog.user)

    if (blog.user && decodedToken.id.toString() !== blog.user.toString()) {
      return res.status(403).send({error: 'only the poster can delete the blog'})
    }

    const user = await User.findById(decodedToken.id)
    user.blogs = user.blogs.filter(blog => blog._id !== req.params.id)
    await user.save()

    await Blog
      .findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (exeption) {
    res.status(400).send({error: 'wrong id'})
  }
})



blogsRouter.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body)
    res.json(blog)
  } catch(exception) {
    res.status(400).send({error: 'no such id'})
  }
})

module.exports = blogsRouter
