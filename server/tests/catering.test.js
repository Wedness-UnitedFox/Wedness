const request = require('supertest');
const app = require('../app')
const {sequelize, User} = require('../models')
const {queryInterface} = sequelize
const {signToken} = require('../helpers/jwt')


let id
let access_token

beforeAll((done)=> {
    const userData = { 
        email: 'testing@mail.com',
        password: '123456',
        role:"vendor"
    }
    request(app)
    .post('/vendor/login')
    .send(userData)
    .end((err, response) => {
        access_token = response.body.access_token
        // console.log(access_token,"<<<");
        done()
    })
})

afterAll((done) => {
    queryInterface.bulkDelete('Caterings')
    .then(() => {
        done()
    })
    .catch(err => {
        // console.log(err)
        done()
    })
})

let data = {
    name: 'Wedness Catering',
    address: 'Jl. Catering No.1, Pondok Indah, Jakarta Selatan',
    email: 'wedness_app@mail.com',
    phone_number: "08166669999",
    price: 10000000,
    description: 'Lorem ipsum',
    avatar: 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png',
    service_type: "catering"
}
let dataPut = {
    name: 'Wedness Catering Update',
    address: 'Jl. Catering No.1, Pondok Indah, Jakarta Selatan Update',
    email: 'update_wedness_app@mail.com',
    phone_number: "08166669999",
    price: 10000000,
    description: 'Lorem ipsum Update',
    avatar: 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png',
    service_type: "catering"
}


describe('Testing /postCatering', () => {
    describe('Success case /postCatering', () => {
        test('Successfully Add Catering', (done) => {
            request(app)
            .post("/vendor/catering")
            .set('access_token', access_token)
            .send(data)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                // console.log("Post success case", response.body)
                expect(status).toBe(201)
                id = body.id
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', data.name)
                expect(body).toHaveProperty('address', data.address)
                expect(body).toHaveProperty('phone_number', data.phone_number)
                expect(body).toHaveProperty('price', data.price)
                expect(body).toHaveProperty('type', data.type)
                expect(body).toHaveProperty('description', data.description)
                expect(body).toHaveProperty('avatar', data.avatar)
                expect(body).toHaveProperty('service_type', data.service_type)
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
            .post('/vendor/catering')
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
            .post('/vendor/catering')
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
            .post('/vendor/catering')
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
            .post('/vendor/catering')
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
            .post('/vendor/catering')
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
            .post('/vendor/catering')
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
            .post('/vendor/catering')
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
            .post('/vendor/catering')
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
            .post('/vendor/catering')
            .set('access_token', access_token)
            .send(dataInvalidPrice)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Empty Vendor Type', (done) => {
            var dataEmptyService = {
                ...data, service_type: ''
            }
            request(app)
            .post('/vendor/catering')
            .set('access_token', access_token)
            .send(dataEmptyService)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('No access token, should return Unauthenticated', (done) => {
            request(app)
            .post('/vendor/catering')
            .send(data) 
            .then(response => {
                const {status,body} = response
                expect(status).toBe(403)
                expect(body).toHaveProperty('msg', 'You are not Authorized')
                done()
            })
        })
    })
})

describe('Testing /getCaterings', () => {
    describe('Success Case /getCaterings', () => {
        test('Should send array of object with Status Code 200', (done) => {
            request(app)
            .get('/vendor/catering')
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
                expect(body[0]).toHaveProperty('service_type', data.service_type)
                expect(body[0]).toHaveProperty('avatar', data.avatar)
                expect(body[0]).toHaveProperty('description', data.description)
                done()
            })
        })

        test('Success get All user customer', async (done) => { 

            const userDataCustomer = { 
                email: 'testingcustomer@mail.com',
                password: '123456', 
            }
            const vendorLogin = await request(app)
            .post('/user/login')
            .send(userDataCustomer)   
            const access_token_customer = await vendorLogin.body.access_token  
            console.log(vendorLogin, "<--")
    
            request(app)
                .get(`/user/catering`)
                .set('access_token',await access_token_customer)
                .set('Accept', 'application/json')
                .then(response => {
                    console.log(access_token);
                    console.log(response.body, "RESPONSEVENDOR");
                    const { status, body } = response
                    expect(status).toBe(200)
                    expect(body[0]).toHaveProperty('id', expect.any(Number))
                    expect(body[0]).toHaveProperty('name', data.name)
                    expect(body[0]).toHaveProperty('address', data.address)
                    expect(body[0]).toHaveProperty('phone_number', data.phone_number)
                    expect(body[0]).toHaveProperty('email', data.email)
                    expect(body[0]).toHaveProperty('price', data.price)
                    expect(body[0]).toHaveProperty('service_type', data.service_type)
                    expect(body[0]).toHaveProperty('avatar', data.avatar)
                    expect(body[0]).toHaveProperty('description', data.description)
                    done()
                }) 
        })
    })

    describe('Failed Case /getCaterings', () => {
        test('No access token, should return Unauthenticated', (done) => {
            request(app)
            .get('/vendor/catering')
            .send(data)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(403)
                done()
            })
        })
        test('should return Unauthenticated', (done) => {
            request(app)
            .get('/user/venue')
            .set('access_token', access_token)
            .send(data) 
            .then(response => {
                const {status, body} = response
                expect(status).toBe(401)
                done()
            })
        })
    })
})



describe('Testing /getCatering', () => {

    describe('Success Case /getCatering', () => {
        test('Should send object with Status Code 200', (done) => {
            request(app)
            .get(`/vendor/catering/${id}`)
            .set('access_token', access_token)
            .send(data)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', data.name)
                expect(body).toHaveProperty('address', data.address)
                expect(body).toHaveProperty('phone_number', data.phone_number)
                expect(body).toHaveProperty('price', data.price)
                expect(body).toHaveProperty('description', data.description)
                expect(body).toHaveProperty('avatar', data.avatar)
                expect(body).toHaveProperty('service_type', data.service_type)
                done()
            })
        })
    })

    describe('Failed Case /getCatering', () => {
        test('Wrong Id', (done) => {
            request(app)
            .get('/vendor/catering/0' )
            .set('access_token', access_token)
            .send(data)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(404)
                done()
            })
        })
        test('Wrong Id', (done) => {
            request(app)
            .get('/vendor/catering/x' )
            .set('access_token', access_token)
            .send(data)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(500)
                done()
            })
        })
        test('No access token, should return Unauthenticated', (done) => {
            request(app)
            .post('/vendor/catering/' + id)
            .send(data) 
            .then(response => {
                const {status,body} = response
                expect(status).toBe(403)
                expect(body).toHaveProperty('msg', 'You are not Authorized')
                done()
            })
        })
    })
})

describe('Testing /putCatering', () => {
    
    describe('Success Case /putCatering', () => {
        test('Successfully Update Catering', (done) => {
            request(app)
            .put(`/vendor/catering/${id}`)
            .set('access_token', access_token)
            .send(dataPut)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                // console.log(response, "put catering")
                expect(status).toBe(200)
                expect(body).toHaveProperty('msg', 'Edit Successfully')
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
            .put(`/vendor/catering/${id}`)
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
            .put(`/vendor/catering/${id}`)
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
            .put(`/vendor/catering/${id}`)
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
            .put(`/vendor/catering/${id}`)
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
            .put(`/vendor/catering/${id}`)
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
            .put(`/vendor/catering/${id}`)
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
            .put(`/vendor/catering/${id}`)
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
            .put(`/vendor/catering/${id}`)
            .set('access_token', access_token)
            .send(dataPutEmptyAvatar)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('No access token, should return Unauthenticated', (done) => {
            request(app)
            .put('/vendor/catering/' + id)
            .send(dataPut) 
            .then(response => {
                const {status,body} = response
                expect(status).toBe(403)
                expect(body).toHaveProperty('msg', 'You are not Authorized')
                done()
            })
        })
    })
})

describe('Testing /deleteCatering', () => {
    describe('Success Case /deleteCatering', () => {
        test('Successfully Delete Catering', (done) => {
            request(app)
            .delete(`/vendor/catering/${id}`)
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
    describe('Failed Case /deleteCatering', () => {
        test('No access token, should return Unauthenticated', (done) => {
            request(app)
            .delete(`/vendor/catering/${id}`)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(403)
                done()
            })
        })
        test('Delete catering Invalid Id input string', (done) => {
            request(app)
            .delete(`/vendor/catering/x`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(500)
                done()
            })
        })
        test('Delete catering Invalid Id no data', (done) => {
            request(app)
            .delete(`/vendor/catering/0`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                console.log(status,"<><>" ,body);
                expect(status).toBe(404)
                done()
            })
        })
    })
})
