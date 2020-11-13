const request = require('supertest')
const app = require('../app.js')

const admin = {
    email: "admin@mail.com",
    password: "123456" 
}

describe('POST /register', () => {
    test('Register Succeed')
})

describe('POST /login', () => {
    test.only('Login Successfully', done => {
        request(app)
        .post('/login')
        .send(admin)
        .set('Accept', 'application/json')
        .then(response => {
            console.log(response.body)
            const {status, body} = response
            expect(status).toBe(200)
            // expect(body).toHaveProperty('access_token', expect.any(String))
            
            done()
        })
    })

    // wrong email
    test('Failed login due to incorrect email', done => {
        let obj = {}
        obj.email = "admins@mail.com"
        obj.password = admin.password
        request(app)
        .post('/login')
        .send(obj)
        .set('Accept', 'application/json')
        .then(response => {
            console.log(response.body)
            const {status, body} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('name', expect.any(String))
            expect(body).toHaveProperty('message', expect.any(String))
            done()
        })
    })

    // wrong password
    test('Failed login due to incorrect password', done => {
        let obj = {}
        obj.email = admin.email
        obj.password = "123457"
        request(app)
        .post('/login')
        .send(obj)
        .set('Accept', 'application/json')
        .then(response => {
            console.log(response.body)
            const {status, body} = response
            expect(status).toBe(401)
            expect(body).toHaveProperty('name', expect.any(String))
            expect(body).toHaveProperty('message', expect.any(String))
            done()
        })
    })

    // empty email and/or password
    test('Failed login due to empty email and/or password', done => {
        let obj = {}
        obj.email = ''
        obj.password = ''
        request(app)
        .post('/login')
        .send(obj)
        .set('Accept', 'application/json')
        .then(response => {
            console.log(response.body)
            const {status, body} = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('name', expect.any(String))
            expect(body).toHaveProperty('message', expect.any(String))
            done()
        })
    })
}) 