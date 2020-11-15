const { afterAll } = require('@jest/globals')
const request = require('supertest')
const app = require('../app.js')
const { User } = require('../models/index')

const user = {
  email: "safrul@mail.com",
  password: "123456"
}

const newUser = {
  name: 'Safrul',
  email: 'safrul@mail.com',
  password: "123456",
  phone_number: "080989999"
}
afterAll(done => {
  User.destroy({
    where: {
      name: 'Safrul'
    }
  })
  .then(() => {
    done()
  })
  .catch(err => {
    done()
  })
})

describe('POST /register', () => {
  test('Register Succeed', done => {
    request(app)
      .post('/vendor/register')
      .send(newUser)
      .set('Accept', 'application/json')
      .then(response => {
        console.log(response.body)
        const { status, body } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('email', expect.any(String))
        expect(body).toHaveProperty('id', expect.any(Number))
        done()
      })
  })

  test('Fail to register due to empty name column', done => {
    const latestUser = {...newUser, name: ''}
    request(app)
      .post('/vendor/register')
      .send(latestUser)
      .set('Accept', 'application/json')
      .then(response => {
        console.log(response.body)
        const { status, body } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', expect.any(String))
        done()
      })
  })

  test('Fail to register due to empty email column', done => {
    const latestUser = {...newUser, email: ''}
    request(app)
      .post('/vendor/register')
      .send(latestUser)
      .set('Accept', 'application/json')
      .then(response => {
        console.log(response.body)
        const { status, body } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', expect.any(String))
        done()
      })
  })

  test('Fail to register due to empty password column', done => {
    const latestUser = {...newUser, password: ''}
    request(app)
      .post('/vendor/register')
      .send(latestUser)
      .set('Accept', 'application/json')
      .then(response => {
        console.log(response.body)
        const { status, body } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', expect.any(String))
        done()
      })
  })

  test('Fail to register due to empty phone_number column', done => {
    const latestUser = {...newUser, phone_number: ''}
    request(app)
      .post('/vendor/register')
      .send(latestUser)
      .set('Accept', 'application/json')
      .then(response => {
        console.log(response.body)
        const { status, body } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', expect.any(String))
        done()
      })
  })
})

describe('POST /login', () => {
  test('Login Successfully', done => {
    request(app)
      .post('/vendor/login')
      .send(user)
      .set('Accept', 'application/json')
      .then(response => {
        console.log(response.body)
        const { status, body } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('access_token', expect.any(String))

        done()
      })
  })

  // wrong email
  test('Failed login due to incorrect email', done => {
    let obj = {}
    obj.email = "users@mail.com"
    obj.password = user.password
    request(app)
      .post('/vendor/login')
      .send(obj)
      .set('Accept', 'application/json')
      .then(response => {
        console.log(response.body)
        const { status, body } = response
        expect(status).toBe(404)
        // expect(body).toHaveProperty('name', expect.any(String))
        expect(body).toHaveProperty('msg', expect.any(String))
        done()
      })
  })

  // wrong password
  test('Failed login due to incorrect password', done => {
    let obj = {}
    obj.email = user.email
    obj.password = "123457"
    request(app)
      .post('/vendor/login')
      .send(obj)
      .set('Accept', 'application/json')
      .then(response => {
        console.log(response.body)
        const { status, body } = response
        expect(status).toBe(404)
        // expect(body).toHaveProperty('name', expect.any(String))
        expect(body).toHaveProperty('msg', expect.any(String))
        done()
      })
  })

  // empty email and/or password
  test('Failed login due to empty email and/or password', done => {
    let obj = {}
    obj.email = ''
    obj.password = ''
    request(app)
      .post('/vendor/login')
      .send(obj)
      .set('Accept', 'application/json')
      .then(response => {
        console.log(response.body)
        const { status, body } = response
        expect(status).toBe(400)
        // expect(body).toHaveProperty('name', expect.any(String))
        expect(body).toHaveProperty('msg', expect.any(String))
        done()
      })
  })
}) 