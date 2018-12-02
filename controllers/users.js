const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  let users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1
  })
  
  users = users.map(user => ({
    _id: user._id,
    username: user.username,
    name: user.name,
    adult: user.adult,
    bolgs: user.blogs
  }))
  return(res.json(users))
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  if(body.password.length <= 3) {
    return res.status(400).json({error: 'password is too short'})
  }
  const exists = await User.find({username: body.username})
  if(exists.length > 0) return res.status(400).json({error: 'username already in use'})

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const user = await new User({
    username: body.username,
    name: body.name,
    adult: body.adult,
    passwordHash
  }).save()
  res.json(user)
})

module.exports = usersRouter
