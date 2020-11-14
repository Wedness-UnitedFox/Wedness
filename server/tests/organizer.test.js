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
        email: 'testing@mail.com',
        password: '123456',
    }
    request(app)
    .post('/vendor/login')
    .send(userData)
    .end((err, response) => {
        access_token = response.body.access_token
        done()
    })
    // access_token = signToken({id: userData.id, email: userData.email, role: userData.role})
    // done()
})

afterAll((done) => {
    queryInterface.bulkDelete('Organizers')
    .then(()=> {
        done()
    })
    .catch(err => {
        console.log(err)
        done()
    })
})

let data = {
    name: 'Wedness Organizer',
    address: 'Jl. Organizer No.1, Pondok Indah, Jakarta Selatan',
    email: 'wedness_app@mail.com',
    phone_number: "08166669999",
    photos:"https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png",
    price: 10000000,
    description: 'Lorem ipsum',
    avatar: 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png',
}
let dataPut = {
    name: 'Wedness Organizer Update',
    address: 'Jl. Organizer No.1, Pondok Indah, Jakarta Selatan Update',
    email: 'wedness_app@mail.com Update',
    phone_number: "08166669999",
    photos:"https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png",
    price: 10000000,
    description: 'Lorem ipsum Update',
    avatar: 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png'
}


describe('Testing /postOrganizer', () => {
    describe('Success case /postOrganizer', () => {
        test('Successfully Add Organizer', (done) => {
            request(app)
            .post("/vendor/organizer")
            .set('access_token', access_token)
            .send(data)
            .then(response => {
                const {status,body} = response
                expect(status).toBe(201)
                id = body.id
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', data.name)
                expect(body).toHaveProperty('address', data.address)
                expect(body).toHaveProperty('phone_number', data.phone_number)
                expect(body).toHaveProperty('photos', data.photos)
                expect(body).toHaveProperty('price', data.price)
                expect(body).toHaveProperty('description', data.description)
                expect(body).toHaveProperty('avatar', data.avatar)
                done()
            })
        })
    })
    describe('Failed case /postOrganizer', () => {
        test('Validation Error Empty Organizer', (done) => {
            var dataEmptyName = {
                ...data, name: ''
            }
            request(app)
            .post('/vendor/organizer')
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
            .post('/vendor/organizer')
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
            .post('/vendor/organizer')
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
            .post('/vendor/organizer')
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
            .post('/vendor/organizer')
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
            .post('/vendor/organizer')
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
            .post('/vendor/organizer')
            .set('access_token', access_token)
            .send(dataEmptyPrice)
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
            .post('/vendor/organizer')
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
            .post('/vendor/organizer')
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
            .post('/vendor/organizer')
            .set('access_token', access_token_invalid)
            .send(data)
            .set('Accept', 'application/json')
            .then(response => {
                console.log(response, '<<<<<<<<auth err')
                const {status,body} = response
                expect(status).toBe(403)
                done()
            })
        })
    })
})

describe('Testing /getOrganizer', () => {

    describe('Success Case /getOrganizer', () => {
        test('Should send array of object with Status Code 200', (done) => {
            request(app)
            .get('/vendor/organizer')
            .set('access_token', access_token)
            .send(data)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(200)
                expect(body[0]).toHaveProperty('id', expect.any(Number))
                expect(body[0]).toHaveProperty('name', data.name)
                expect(body[0]).toHaveProperty('email', data.email)
                expect(body[0]).toHaveProperty('address', data.address)
                expect(body[0]).toHaveProperty('phone_number', data.phone_number)
                expect(body[0]).toHaveProperty('price', data.price)
                expect(body[0]).toHaveProperty('avatar', data.avatar)
                expect(body[0]).toHaveProperty('description', data.description)
                done()
            })
        })
    })

    describe('Failed Case /getOrganizer', () => {
        test('User Not Authenticated', (done) => {
            request(app)
            .get('/vendor/organizer')
            .set('access_token', access_token_invalid)
            .send(data)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(403)
                done()
            })
        })
    })
})

describe('Testing /putOrganizer', () => {
    
    describe('Success Case /putOrganizer', () => {
        test('Successfully Update Organizer', (done) => {
            request(app)
            .put(`/vendor/organizer/${id}`)
            .set('access_token', access_token)
            .send(dataPut)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('msg', 'Edit Successfully')
                done()
            })
        })
    })

    describe('Failed Case /putOrganizer', () => {
        test('Validation Error Put Empty Name', (done) => {
            var dataPutEmptyName = {
                ...dataPut, name: ''
            }
            request(app)
            .put(`/vendor/organizer/${id}`)
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
            .put(`/vendor/organizer/${id}`)
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
            .put(`/vendor/organizer/${id}`)
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
            .put(`/vendor/organizer/${id}`)
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
            .put(`/vendor/organizer/${id}`)
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
            .put(`/vendor/organizer/${id}`)
            .set('access_token', access_token)
            .send(dataPutInvalidPrice)
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
            .put(`/vendor/organizer/${id}`)
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
            .put(`/vendor/organizer/${id}`)
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
            .put(`/vendor/organizer/${id}`)
            .set('access_token', access_token_invalid)
            .send(data)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(403)
                done()
            })
        })
    })
})

describe('Testing /deleteOrganizer', () => {
    describe('Success Case /deleteOrganizer', () => {
        test('Successfully Delete Organizer', (done) => {
            request(app)
            .delete(`/vendor/organizer/${id}`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('msg', 'Deleted Successfully')
                done()
            })
        })
    })
    describe('Failed Case /deleteOrganizer', () => {
        test('Delete Product User Unauthorized', (done) => {
            request(app)
            .delete(`/vendor/organizer/${id}`)
            .set('access_token', access_token_invalid)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(403)
                done()
            })
        })
        test('Delete Organizer Invalid Id', (done) => {
            let id = 0
            request(app)
            .delete(`/vendor/organizer/${id}`)
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
