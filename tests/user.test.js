const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')

const tester = {
  username: 'test',
  name: 'tester',
  password: 'pass'
}

beforeAll(async () => await User.remove({}))

describe('create user tests', () => {
  test('create new', async () => {
    tester.password = 'pass'
    await api.post('/api/users').send(tester).expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('wrong password', async () => {
    tester.password = '1'
    const response = await api.post('/api/users')
      .send(tester)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(response.body.error).toEqual('password is too short')
  })

  test('create with duplicate name', async () => {
    tester.password = 'pass'
    const response = await api.post('/api/users')
      .send(tester)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(response.body.error).toEqual('username already in use')
  })

})

afterAll(() => {
  server.close()
})
