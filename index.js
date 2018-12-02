const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const middleware = require('./middleware')

mongoose.connect(config.mongoUrl)
  .then(() => console.log('connected to ', config.port))
  .catch(err => console.log(err))

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const server = http.createServer(app)
server.listen(config.port, () => console.log('running on ', config.port))
  .on('error', console.log)
server.on('close', () => mongoose.connection.close())

module.exports = {
  app, server
}
