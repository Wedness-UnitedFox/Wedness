const request = require('supertest');
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
const {signToken} = require('../helpers/jwt')

let id
let access_token
let access_token_invalid = ''

beforeAll((done)=> {
    const userData = {
        name: 'Testing',
        email: 'testing@mail.com',
        password: '1234',
        phone_number: '08999666999',
        role: 'customer'
    }
    // request(app)
    // .post('/login')
    // .send(userData)
    // .set('Accept', 'application/json')
    // .end((err, response) => {
    //     // console.log(response,'<<<<<<<<<<<response')
    //     access_token = response.body.access_token
    //     done()
    // })
    access_token = signToken({id: userData.id, email: userData.email, role: userData.role})
    done()
})

afterAll((done) => {
    queryInterface.bulkDelete('Caterings')
    .then(()=> {
        done()
    })
    .catch(err => {
        console.log(err)
        done()
    })
})

let data = {
    id:1,
    name: 'Wedness Catering',
    address: 'Jl. Catering No.1, Pondok Indah, Jakarta Selatan',
    email: 'wedness_app@mail.com',
    phone_number: "08166669999",
    type: 'Indonesian',
    price: 10000000,
    description: 'Lorem ipsum',
    avatar: 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png',
}
let dataPut = {
    name: 'Wedness Catering Update',
    address: 'Jl. Catering No.1, Pondok Indah, Jakarta Selatan Update',
    email: 'wedness_app@mail.com Update',
    phone_number: "08166669999",
    type: 'Indonesian',
    price: 10000000,
    type: 'Outdoor',
    description: 'Lorem ipsum Update'
}


describe('Testing /postCatering', () => {
    describe('Success case /postCatering', () => {
        test('Successfully Add Catering', (done) => {
            // console.log('<<<<<<<<<<<<<<<<<<<<<masuk sini')
            request(app)
            .post("/catering")
            .set('access_token', access_token)
            .send(data)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(201)
                id = body.id
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', data.name)
                expect(body).toHaveProperty('address', data.address)
                expect(body).toHaveProperty('phone_number', data.phone_number)
                expect(body).toHaveProperty('price', data.price)
                expect(body).toHaveProperty('type', data.type)
                expect(body).toHaveProperty('description', data.description)
                done()
            })
        })
    })
    describe('Failed case /postCatering', () => {
        test('Validation Error Empty Catering', (done) => {
            var dataEmptyName = {
                ...data, name: ''
            }
            request(app)
            .post('/catering')
            .set('access_token', access_token)
            .send(dataEmptyName)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Empty Address', (done) => {
            var dataEmptyAddress = {
                ...data, address: ''
            }
            request(app)
            .post('/catering')
            .set('access_token', access_token)
            .send(dataEmptyAddress)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Empty Phone Number', (done) => {
            var dataEmptyPhone = {
                ...data, phone_number: ''
            }
            request(app)
            .post('/catering')
            .set('access_token', access_token)
            .send(dataEmptyPhone)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Empty Email', (done) => {
            var dataEmptyEmail = {
                ...data, email: ''
            }
            request(app)
            .post('/catering')
            .set('access_token', access_token)
            .send(dataEmptyEmail)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Empty Avatar', (done) => {
            var dataEmptyAvatar = {
                ...data, avatar: ''
            }
            request(app)
            .post('/catering')
            .set('access_token', access_token)
            .send(dataEmptyAvatar)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Price less Than Equal to 0', (done) => {
            var dataLessPrice = {
                ...data, price: 0
            }
            request(app)
            .post('/catering')
            .set('access_token', access_token)
            .send(dataLessPrice)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Empty Price', (done) => {
            var dataEmptyPrice = {
                ...data, price: ''
            }
            request(app)
            .post('/catering')
            .set('access_token', access_token)
            .send(dataEmptyPrice)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Empty Type', (done) => {
            var dataEmptyType = {
                ...data, type: ''
            }
            request(app)
            .post('/catering')
            .set('access_token', access_token)
            .send(dataEmptyType)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Empty Description', (done) => {
            var dataEmptyDescription = {
                ...data, description: ''
            }
            request(app)
            .post('/catering')
            .set('access_token', access_token)
            .send(dataEmptyDescription)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Type Price', (done) => {
            var dataInvalidPrice = {
                ...data, price: 'a'
            }
            request(app)
            .post('/catering')
            .set('access_token', access_token)
            .send(dataInvalidPrice)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('User Not Authenticated', (done) => {
            request(app)
            .post('/catering')
            .set('access_token', access_token_invalid)
            .send(data)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(401)
                done()
            })
        })
    })
})

describe('Testing /getCatering', () => {
    describe('Success Case /getCatering', () => {
        test('Should send array of object with Status Code 200', (done) => {
            request(app)
            .get('/catering')
            .set('access_token', access_token)
            .send(data)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(200)
                expect(body[0]).toHaveProperty('id', expect.any(Number))
                expect(body[0]).toHaveProperty('name', data.name)
                expect(body[0]).toHaveProperty('address', data.address)
                expect(body[0]).toHaveProperty('phone_number', data.phone_number)
                expect(body[0]).toHaveProperty('email', data.email)
                expect(body[0]).toHaveProperty('price', data.price)
                expect(body[0]).toHaveProperty('type', data.type)
                expect(body[0]).toHaveProperty('avatar', data.avatar)
                expect(body[0]).toHaveProperty('description', data.description)
                done()
            })
        })
    })

    describe('Failed Case /getCatering', () => {
        test('User Not Authenticated', (done) => {
            request(app)
            .get('/catering')
            .set('access_token', access_token_invalid)
            .send(data)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(401)
                done()
            })
        })
    })
})

describe('Testing /putCatering', () => {
    
    describe('Success Case /putCatering', () => {
        test('Successfully Update Catering', (done) => {
            request(app)
            .put(`/catering/${id}`)
            .set('access_token', access_token)
            .send(dataPut)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(201)
                expect(body).toHaveProperty('message', 'Edit Successfully')
                done()
            })
        })
    })

    describe('Failed Case /putcatering', () => {
        test('Validation Error Put Empty Name', (done) => {
            var dataPutEmptyName = {
                ...dataPut, name: ''
            }
            request(app)
            .put(`/catering/${id}`)
            .set('access_token', access_token)
            .send(dataPutEmptyName)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Put Empty Address', (done) => {
            var dataPutEmptyAddress = {
                ...dataPut, address: ''
            }
            request(app)
            .put(`/catering/${id}`)
            .set('access_token', access_token)
            .send(dataPutEmptyAddress)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Put Empty Email', (done) => {
            var dataPutEmptyEmail = {
                ...dataPut, email: ''
            }
            request(app)
            .put(`/catering/${id}`)
            .set('access_token', access_token)
            .send(dataPutEmptyEmail)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Put Empty Phone Number', (done) => {
            var dataPutEmptyPhone = {
                ...dataPut, phone_number: ''
            }
            request(app)
            .put(`/catering/${id}`)
            .set('access_token', access_token)
            .send(dataPutEmptyPhone)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Put Price less Than 0', (done) => {
            var dataPutLessPrice = {
                ...data, price: -1
            }
            request(app)
            .put(`/catering/${id}`)
            .set('access_token', access_token)
            .send(dataPutLessPrice)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Put Invalid Price', (done) => {
            var dataPutInvalidPrice = {
                ...data, price: 'a'
            }
            request(app)
            .put(`/catering/${id}`)
            .set('access_token', access_token)
            .send(dataPutInvalidPrice)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Put Empty Type', (done) => {
            var dataPutEmptyType = {
                ...dataPut, type: ''
            }
            request(app)
            .put(`/catering/${id}`)
            .set('access_token', access_token)
            .send(dataPutEmptyType)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Put Empty Description', (done) => {
            var dataPutEmptyDescription = {
                ...dataPut, description: ''
            }
            request(app)
            .put(`/catering/${id}`)
            .set('access_token', access_token)
            .send(dataPutEmptyDescription)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Put Empty Avatar', (done) => {
            var dataPutEmptyAvatar = {
                ...dataPut, avatar: ''
            }
            request(app)
            .put(`/catering/${id}`)
            .set('access_token', access_token)
            .send(dataPutEmptyAvatar)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('User Unauthorized to Update Data', (done) => {
            request(app)
            .put(`/catering/${id}`)
            .set('access_token', access_token_invalid)
            .send(data)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(401)
                done()
            })
        })
    })
})

describe('Testing /deleteCatering', () => {
    describe('Success Case /deleteCatering', () => {
        test('Successfully Delete Catering', (done) => {
            request(app)
            .delete(`/catering/${id}`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('message', 'Catering Deleted')
                done()
            })
        })
    })
    describe('Failed Case /deleteCatering', () => {
        test('Delete Product User Unauthorized', (done) => {
            request(app)
            .delete(`/catering/${id}`)
            .set('access_token', access_token_invalid)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(401)
                done()
            })
        })
        test('Delete catering Invalid Id', (done) => {
            let id = 0
            request(app)
            .delete(`/catering/${id}`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(404)
                done()
            })
        })
    })
})