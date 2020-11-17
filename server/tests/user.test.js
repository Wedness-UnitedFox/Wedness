const { afterAll } = require('@jest/globals')
const request = require('supertest')
const app = require('../app.js')
const { User } = require('../models/index')
const {signToken} =  require("../helpers/jwt") 

const user = {
  email: "safrul@mail.com",
  password: "123456"
}
let token
const failedToken = signToken({id:0,email: "safrul@mail.com",role:'customer'})

const failedToken2 = signToken({id:'x',email: "safrul@mail.com",role:'customer'})

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
      .post('/user/register')
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
      .post('/user/register')
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
      .post('/user/register')
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
      .post('/user/register')
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
      .post('/user/register')
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
      .post('/user/login')
      .send(user)
      .set('Accept', 'application/json')
      .then(response => {
        console.log(response.body)
        const { status, body } = response
        token = body.access_token
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
      .post('/user/login')
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
      .post('/user/login')
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
      .post('/user/login')
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

  test('Failed login due to broken token', done => { 
    request(app)
      .get('/vendor/venue')
      .set('access_token', failedToken)
      .set('Accept', 'application/json')
      .then(response => { 
        const {status,body} = response
        console.log(status, "<-- -->" , body)
        expect(status).toBe(401) 
        expect(body).toHaveProperty('msg', expect.any(String))
        done()
      })
  }) 
  test('Failed login due to broken token', done => { 
    request(app)
      .get('/vendor/venue')
      .set('access_token', failedToken2)
      .set('Accept', 'application/json')
      .then(response => { 
        const {status,body} = response
        console.log(status, "<-- -->" , body)
        expect(status).toBe(500) 
        expect(body).toHaveProperty('msg', expect.any(String))
        done()
      })
  }) 
  test('Failed login due to broken token', done => { 
    request(app)
      .get('/user/venue')
      .set('access_token', failedToken2)
      .set('Accept', 'application/json')
      .then(response => { 
        const {status,body} = response
        console.log(status, "<-- -->" , body)
        expect(status).toBe(500) 
        expect(body).toHaveProperty('msg', expect.any(String))
        done()
      })
  }) 
  test('success get all venue  ', done => { 
    request(app)
      .get('/user/venue')
      .set('access_token', token)
      .set('Accept', 'application/json')
      .then(response => { 
        const {status,body} = response
        console.log(status, "<--asdasd -->" , body)
        expect(status).toBe(200) 
        done()
      })
  }) 

}) 