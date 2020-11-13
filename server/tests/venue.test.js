const request = require('supertest');
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize

let id
let access_token
let access_token_invalid = ''

beforeAll((done)=> {
    const userData = {
        email: 'admin@mail.com',
        password: '1234'
    }
    request(app)
    .post('/users/login')
    .send(userData)
    .set('Accept', 'application/json')
    .end((err, response) => {
        access_token = response.body.access_token
        done()
    })
})

afterAll((done) => {
    queryInterface.bulkDelete('Products')
    .then(()=> {
        done()
    })
    .catch(err => {
        console.log(err)
        done()
    })
})

let venueData = {
    name: 'Wedness Hall',
    address: 'Jl. Pernikahan No.1, Pondok Indah, Jakarta Selatan',
    email: 'wedness_app@mail.com',
    phone_number: 08166669999,
    photos:'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
    price: 10000000,
    type: 'Outdoor'
}
let venueDataPut = {
    name: 'Wedness Hall',
    address: 'Jl. Pernikahan No.1, Pondok Indah, Jakarta Selatan',
    email: 'wedness_app@mail.com',
    phone_number: 08166669999,
    photos:'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
    price: 10000000,
    type: 'Outdoor'
}

describe('Testing /postVenue', () => {

    describe.only('Success case /postProduct', () => {
        test('Successfully Add Venue', (done) => {
            request(app)
            .post('/venue')
            .set('access_token', access_token)
            .send(venueData)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(201)
                id = body.id
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('name', venueData.name)
                expect(body).toHaveProperty('address', venueData.image_url)
                expect(body).toHaveProperty('phone_number', expect.any(Number))
                expect(body).toHaveProperty('photos', venueData.stock)
                expect(body).toHaveProperty('price', venueData.stock)
                expect(body).toHaveProperty('type', venueData.stock)
                done()
            })
        })
    })

    describe('Failed case /postProduct', () => {
        test('Validation Error Empty Name', (done) => {
            var venueDataEmptyName = {
                ...venueData, name: ''
            }
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(venueDataEmptyName)
            .set('Accept', 'application/json')
            .then(response => {
                // console.log(response);
                const {status,body} = response
                // console.log(body);
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Empty Image_Url', (done) => {
            var venueDataEmptyImage = {
                ...venueData, image_url: ''
            }
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(venueDataEmptyImage)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Price less Than Equal to 0', (done) => {
            var venueDataLessPrice = {
                ...venueData, price: 0
            }
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(venueDataLessPrice)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Empty Price', (done) => {
            var venueDataEmptyPrice = {
                ...venueData, price: ''
            }
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(venueDataEmptyPrice)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Invalid Price', (done) => {
            var venueDataInvalidPrice = {
                ...venueData, price: 'a'
            }
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(venueDataInvalidPrice)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Stock Less Than 0', (done) => {
            var venueDataLessStock = {
                ...venueData, stock: -1
            }
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(venueDataLessStock)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Invalid Stock', (done) => {
            var venueDataInvalidStock = {
                ...venueData, stock: 'a'
            }
            request(app)
            .post('/products')
            .set('access_token', access_token)
            .send(venueDataInvalidStock)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('User Not Authenticated', (done) => {
            request(app)
            .post('/products')
            .set('access_token', access_token_invalid)
            .send(venueData)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(401)
                done()
            })
        })
    })
})

describe('Testing /getProduct', () => {

    describe('Success Case /getProduct', () => {
        test('Should send array of object with Status Code 200', (done) => {
            request(app)
            .get('/products')
            .set('access_token', access_token)
            .send(venueData)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(200)
                expect(body[0]).toHaveProperty('id', expect.any(Number))
                expect(body[0]).toHaveProperty('name', venueData.name)
                expect(body[0]).toHaveProperty('image_url', venueData.image_url)
                expect(body[0]).toHaveProperty('price', venueData.price)
                expect(body[0]).toHaveProperty('stock', venueData.stock)
                done()
            })
        })
    })

    describe('Failed Case /getProduct', () => {
        test('User Not Authenticated', (done) => {
            request(app)
            .get('/products')
            .set('access_token', access_token_invalid)
            .send(venueData)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(401)
                done()
            })
        })
    })
})

describe('Testing /putProduct', () => {
    
    describe('Success Case /putProduct', () => {
        test('Successfully Update Product', (done) => {
            request(app)
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .send(venueDataPut)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(201)
                expect(body).toHaveProperty('message', 'Edit Successfully')
                done()
            })
        })
    })

    describe('Failed Case /putProduct', () => {
        test('Validation Error Put Empty Name', (done) => {
            var venueDataPutEmptyName = {
                ...venueDataPut, name: ''
            }
            request(app)
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .send(venueDataPutEmptyName)
            .set('Accept', 'application/json')
            .then(response => {
                // console.log(response);
                const {status,body} = response
                // console.log(body);
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Put Empty Image_Url', (done) => {
            var venueDataPutEmptyImage = {
                ...venueDataPut, image_url: ''
            }
            request(app)
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .send(venueDataPutEmptyImage)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Put Price less Than 0', (done) => {
            var venueDataPutLessPrice = {
                ...venueData, price: -1
            }
            request(app)
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .send(venueDataPutLessPrice)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Put Invalid Price', (done) => {
            var venueDataPutInvalidPrice = {
                ...venueData, price: 'a'
            }
            request(app)
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .send(venueDataPutInvalidPrice)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Put Stock Less Than 0', (done) => {
            var venueDataPutLessStock = {
                ...venueData, stock: -1
            }
            request(app)
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .send(venueDataPutLessStock)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Put Invalid Stock', (done) => {
            var venueDataPutInvalidStock = {
                ...venueData, stock: 'a'
            }
            request(app)
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .send(venueDataPutInvalidStock)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Invalid Id Product', (done) => {
            let id = 0
            request(app)
            .put(`/products/${id}`)
            .set('access_token', access_token)
            .send(venueData)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(404)
                done()
            })
        })
        test('User Unauthorized to Update Data', (done) => {
            request(app)
            .put(`/products/${id}`)
            .set('access_token', access_token_invalid)
            .send(venueData)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(401)
                done()
            })
        })
    })
})

describe('Testing /deleteProduct', () => {
    describe('Success Case /deleteProduct', () => {
        test('Successfully Delete Product', (done) => {
            request(app)
            .delete(`/products/${id}`)
            .set('access_token', access_token)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('message', 'Product Deleted')
                done()
            })
        })
    })
    describe('Failed Case /deleteProduct', () => {
        test('Delete Product User Unauthorized', (done) => {
            request(app)
            .delete(`/products/${id}`)
            .set('access_token', access_token_invalid)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(401)
                done()
            })
        })
        test('Delete Product Invalid Id', (done) => {
            let id = 0
            request(app)
            .delete(`/products/${id}`)
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
