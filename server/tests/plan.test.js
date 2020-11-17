const request = require('supertest');
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize
const {signToken} = require('../helpers/jwt');

let id
let access_token

beforeAll((done)=> {
    const userData = { 
        email: 'test@mail.com',
        password: '123456',
        role:"customer"
    }
    request(app)
    .post('/user/login')
    .send(userData)
    .end((err, response) => {
        // console.log(response, '<<<<<<<<response beforelogin');
        access_token = response.body.access_token
        done()
    })
})

afterAll((done) => {
    queryInterface.bulkDelete('Checkouts')
    .then(()=> {
        done()
    })
    .catch(err => {
        // console.log(err)
        done()
    })
})

let data = { 
    vendor_type: "venue",
    subtotal: 10000,
    isPaid: false,
    isApproved: false
}
let dataPut = {
    isPaid: true,
}


describe('Testing /postCheckout', () => {
    describe('Success case /postCheckout', () => {
        test('Successfully Add Checkout', (done) => { 
            request(app)
            .post("/user/plan")
            .send(data)
            .set('access_token', access_token) 
            .then(response => {
                const {status,body} = response 
                expect(status).toBe(201)
                id = body.id
                done()
            })
        })
    })
    describe('Failed case /postCheckout', () => {
        test('Validation Error Vendor Type', (done) => {
            var dataEmpty = {
                ...data, vendor_type: ''
            }
            request(app)
            .post('/user/plan')
            .set('access_token', access_token)
            .send(dataEmpty)
            .set('Accept', 'application/json')
            .then(response => { 
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Subtotal', (done) => {
            var dataEmpty = {
                ...data, subtotal: ''
            }
            request(app)
            .post('/user/plan')
            .set('access_token', access_token)
            .send(dataEmpty)
            .set('Accept', 'application/json')
            .then(response => { 
                // console.log(response, 'faileeeed');
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        test('Validation Error Type Subtotal', (done) => {
            var dataInvalid = {
                ...data, subtotal: 'a'
            }
            request(app)
            .post('/user/plan')
            .set('access_token', access_token)
            .send(dataInvalid)
            .set('Accept', 'application/json')
            .then(response => {
                const {status,body} = response
                expect(status).toBe(400)
                done()
            })
        })
        // test('Validation Error isPaid', (done) => {
        //     var dataInvalid = {
        //         ...data, isPaid: ''
        //     }
        //     request(app)
        //     .post('/user/plan')
        //     .set('access_token', access_token)
        //     .send(dataInvalid)
        //     .set('Accept', 'application/json')
        //     .then(response => {
        //         console.log(response, '<<<<<<<<<');
        //         const {status,body} = response
        //         expect(status).toBe(400)
        //         done()
        //     })
        // })
        test('No access token, should return Unauthenticated', (done) => {
            request(app)
            .post('/user/plan')
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

describe('Testing /getCheckouts', () => {

    describe('Success Case /getCheckouts', () => {
        test('Should send array of object with Status Code 200', (done) => {
            request(app)
            .get('/user/plan')
            .set('access_token', access_token)
            .send(data)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(200)
                done()
            })
        })
        test('Should send array of object with Status Code 200', (done) => {
            request(app)
            .get('/user/plan')
            .set('access_token', access_token)
            .send(data)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(200)
                done()
            })
        })
    })
    describe('Failed Case /getCheckouts', () => {
        test('No access token, should return Unauthenticated', (done) => {
            request(app)
            .get('/user/plan')
            .send(data)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(403)
                expect(body).toHaveProperty('msg', 'You are not Authorized')
                done()
            })
        })
    })
})

// describe('Testing /getCheckout', () => {

//     describe('Success Case /getCheckout', () => {
//         test('Should send object with Status Code 200', (done) => {
//             request(app)
//             .get(`/user/plan/${id}`)
//             .set('access_token', access_token)
//             .send(data)
//             .set('Accept', 'application/json')
//             .then(response => {
//                 const {status, body} = response
//                 expect(status).toBe(200)
//                 done()
//             })
//         })
//     })

//     describe('Failed Case /getCheckout', () => {
//         test('Wrong Id', (done) => {
//             request(app)
//             .get('/user/plan/0')
//             .set('access_token', access_token)
//             .send(data)
//             .set('Accept', 'application/json')
//             .then(response => {
//                 const {status, body} = response
//                 expect(status).toBe(404)
//                 done()
//             })
//         })
//         test('No access token, should return Unauthenticated', (done) => {
//             request(app)
//             .get('/vendor/venue' + id)
//             .send(data)
//             .set('Accept', 'application/json')
//             .then(response => {
//                 const {status, body} = response
//                 expect(status).toBe(403)
//                 expect(body).toHaveProperty('msg', 'You are not Authorized')
//                 done()
//             })
//         })
//     })
// })

describe('Testing /deleteCheckout', () => {
    describe('Success Case /deleteCheckout', () => {
        test('Successfully Delete Checkout', (done) => {
            request(app)
            .delete(`/user/plan/${id}`)
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
    describe('Failed Case /deleteCheckout', () => {
        test('No access token, should return Unauthenticated', (done) => {
            request(app)
            .delete(`/user/plan/${id}`)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(403)
                expect(body).toHaveProperty('msg', 'You are not Authorized')
                done()
            })
        })
        test('Delete Venue Invalid Id', (done) => {
            request(app)
            .delete(`/user/plan/0`)
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

describe('Testing /putCheckoutCustomer', () => {
    
    describe('Success Case /putCheckoutCustomer', () => {
        test('Successfully Update Checkout', (done) => {
            request(app)
            .put(`/user/plan/checkout`)
            .set('access_token', access_token)
            .send(dataPut)
            .set('Accept', 'application/json')
            .then(response => {
                const {status, body} = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('msg', 'Checkout completed')
                done()
            })
        })
    })

    // describe('Failed Case /putCheckoutCustomer', () => {
    //     test('Validation Error Checkout', (done) => {
    //         var dataPutEmpty = {
    //             isPaid: ''
    //         }
    //         request(app)
    //         .put(`/user/plan/checkout`)
    //         .set('access_token', access_token)
    //         .send(dataPutEmpty)
    //         .set('Accept', 'application/json')
    //         .then(response => {
    //             const {status,body} = response
    //             expect(status).toBe(400)
    //             done()
    //         })
    //     })
    // })
})