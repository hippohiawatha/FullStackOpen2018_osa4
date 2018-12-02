const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const {initial, tester, incomplete} = require('./test_helper')


beforeAll(async () => {
  await Blog.remove({})
  let blogObject = new Blog(initial[0])
  await blogObject.save()
})

describe('GET', () => {
  test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  })
})

describe('POST tests', () => {

  test('a new blog is added', async () => {
    await api.post('/api/blogs')
      .send(tester[0])
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('create without likes', async () => {
    await api.post('/api/blogs')
      .send(incomplete(tester[1], ['likes']))
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('create without title', async () => {
    await api.post('/api/blogs')
      .send(incomplete(tester[0], ['title']))
      .expect(400)
  })

  test('create without url', async () => {
    await api.post('/api/blogs')
      .send(incomplete(tester[0], ['url']))
      .expect(400)
  })
})

describe('DELETE tests', () => {

  test('delete proper id', async () => {
    const delTest = new Blog(tester[0])
    await delTest.save()
    await api.delete(`/api/blogs/${delTest._id}`)
      .expect(204)
  })

  test('delete false id', async () => {
    await api.delete('/api/blogs/123').expect(404)
  })
})




afterAll(() => {
  server.close()
})
