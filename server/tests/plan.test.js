const request = require('supertest');
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { signToken } = require('../helpers/jwt');

let id
let access_token
let access_token_vendor
let vendor1
let organizerId
let cateringId
let venueId
let vendor3


let testDataVenue = {
    name: 'Wedness Hall',
    address: 'Jl. Pernikahan No.1, Pondok Indah, Jakarta Selatan',
    email: 'wedness_app@mail.com',
    phone_number: "08166669999",
    avatar: 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png',
    price: 10000000,
    type: 'Outdoor',
    description: 'Lorem ipsum',
    capacity: 800,
    service_type: "venue"
}

let testDataOrganizer = {
    name: 'Wedness Organizer',
    address: 'Jl. Organizer No.1, Pondok Indah, Jakarta Selatan',
    email: 'wedness_app@mail.com',
    phone_number: "08166669999",
    price: 10000000,
    description: 'Lorem ipsum',
    avatar: 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png',
    service_type: "organizer"
}
let testDataCatering = {
    name: 'Wedness Catering',
    address: 'Jl. Catering No.1, Pondok Indah, Jakarta Selatan',
    email: 'wedness_app@mail.com',
    phone_number: "08166669999",
    price: 10000000,
    description: 'Lorem ipsum',
    avatar: 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png',
    service_type: "catering"
}

const userData = {
    email: 'testingcustomer@mail.com',
    password: '123456',
    role: "customer",
    // name:'testing',
    // phone_number: "080989999" 
}
const userDataVendor = {
    email: 'testing@mail.com',
    password: '123456',
    role: "vendor",
    // name:'testing',
    // phone_number: "080989999" 
}

beforeAll( (done) => {
     request(app)
        .post('/user/login')
        .send(userData)
        .end((err, response) => {
            access_token = response.body.access_token
            console.log(access_token, '<<<<<<<<response beforelogin');
            done()
        })
        // access_token = await data.body.access_token
 

})

afterAll((done) => {
    // queryInterface.bulkDelete('Checkouts')
    //     .then(() => {
            done()
        // })
        // .catch(err => { 
        //     done()
        // })
    // queryInterface.bulkDelete('Caterings')
    // .then(()=> {
    //     done()
    // })
    // .catch(err => {
    //     // console.log(err)
    //     done()
    // })
    // queryInterface.bulkDelete('Organizers')
    // .then(()=> {
    //     done()
    // })
    // .catch(err => {
    //     // console.log(err)
    //     done()
    // })
    // queryInterface.bulkDelete('Venues')
    // .then(()=> {
    //     done()
    // })
    // .catch(err => {
    //     // console.log(err)
    //     done()
    // })
})

let dataVenue = {
    vendor_type: "venue",
    subtotal: 10000,
    VendorId:3
}
let dataCatering = {
    vendor_type: "catering",
    subtotal: 10000,
    VendorId:3
}
let dataOrganizer = {
    vendor_type: "organizer",
    subtotal: 10000,
    VendorId:3
}
let dataPut = {
    isPaid: true,
}


describe('Testing /postCheckout', () => {
    describe('Success case /postCheckout', () => {
        test('Successfully Add Checkout - vendor venue', (done) => {
            request(app)
                .post("/user/plan")
                .send(dataVenue)
                .set('access_token', access_token)
                .then(response => {
                    const { status, body } = response
                    expect(status).toBe(201)
                    venueId = body.id
                    id = body.id
                    done()
                })
        })
        test('Successfully Add Checkout - vendor organizer', (done) => {
            request(app)
                .post("/user/plan")
                .send(dataOrganizer)
                .set('access_token', access_token)
                .then(response => {
                    const { status, body } = response
                    expect(status).toBe(201)
                    organizerId = body.id
                    done()
                })
        })
        test('Successfully Add Checkout - vendor catering', (done) => {
            request(app)
                .post("/user/plan")
                .send(dataCatering)
                .set('access_token', access_token)
                .then(response => {
                    const { status, body } = response
                    expect(status).toBe(201)
                    cateringId = body.id
                    done()
                })
        })
    })
    describe('Failed case /postCheckout', () => {
        test('Validation Error Vendor Type', (done) => {
            var dataEmpty = {
                ...dataVenue, vendor_type: ''
            }
            request(app)
                .post('/user/plan')
                .set('access_token', access_token)
                .send(dataEmpty)
                .set('Accept', 'application/json')
                .then(response => {
                    const { status, body } = response
                    expect(status).toBe(400)
                    done()
                })
        })
        test('Validation Error Subtotal', (done) => {
            var dataEmpty = {
                ...dataVenue, subtotal: ''
            }
            request(app)
                .post('/user/plan')
                .set('access_token', access_token)
                .send(dataEmpty)
                .set('Accept', 'application/json')
                .then(response => {
                    // console.log(response, 'faileeeed');
                    const { status, body } = response
                    expect(status).toBe(400)
                    done()
                })
        })
        test('Validation Error Type Subtotal', (done) => {
            var dataInvalid = {
                ...dataVenue, subtotal: 'a'
            }
            request(app)
                .post('/user/plan')
                .set('access_token', access_token)
                .send(dataInvalid)
                .set('Accept', 'application/json')
                .then(response => {
                    const { status, body } = response
                    expect(status).toBe(400)
                    done()
                })
        })
        // test('Validation Error isPaid', (done) => {
        //     var dataInvalid = {
        //         ...dataVenue, isPaid: ''
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
                .send(dataVenue)
                .then(response => {
                    const { status, body } = response
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
                .set('Accept', 'application/json')
                .then(response => {
                    const { status, body } = response
                    expect(status).toBe(200)
                    done()
                })
        })
        test('Should send array of object with Status Code 200', (done) => {
            request(app)
                .get('/user/plan')
                .set('access_token', access_token)
                .send(dataVenue)
                .set('Accept', 'application/json')
                .then(response => {
                    const { status, body } = response
                    expect(status).toBe(200)
                    done()
                })
        })
    })
    describe('Failed Case /getCheckouts', () => {
        test('No access token, should return Unauthenticated', (done) => {
            request(app)
                .get('/user/plan')
                .send(dataVenue)
                .set('Accept', 'application/json')
                .then(response => {
                    const { status, body } = response
                    expect(status).toBe(403)
                    expect(body).toHaveProperty('msg', 'You are not Authorized')
                    done()
                })
        })
    })
})

// describe.only('Testing /getCheckout', () => { 
//     describe('Success Case /getCheckout', () => {
//         test('Should send object with Status Code 200', (done) => {
//             request(app)
//             .get(`/user/plan/${id}`)
//             .set('access_token', access_token)
//             .send(dataVenue)
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
//             .send(dataVenue)
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
//             .send(dataVenue)
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
                    const { status, body } = response
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
                    const { status, body } = response
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
                    const { status, body } = response
                    expect(status).toBe(404)
                    done()
                })
        })
        test('Delete Venue Invalid Id', (done) => {
            request(app)
                .delete(`/user/plan/x`)
                .set('access_token', access_token)
                .set('Accept', 'application/json')
                .then(response => {
                    const { status, body } = response
                    expect(status).toBe(500)
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
                    const { status, body } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('msg', 'Checkout completed')
                    done()
                })
        })
    })

})


describe('Failed Case /putCheckoutCustomer for Vendor', () => {
    test('Validation Error Checkout',async (done) => { 
        const userData = {  
            email: 'testing@mail.com',
            password: '123456',
        }
        const vendorLogin = await request(app)
        .post('/vendor/login')
        .send(userData)   
        const access_token_vendor = await vendorLogin.body.access_token  
        console.log(vendorLogin, "<--") 

        request(app)
        .put(`/vendor/checkout/${id}`)
        .set('access_token',await access_token_vendor) 
        .set('Accept', 'application/json')
        .then(response => {
            console.log(response,"<><><>");
            const {status,body} = response
            expect(status).toBe(404)
            done()
        })
    })
})
describe('Testing /getCheckoutForVendor', () => {  
    let checkoutId
    let checkoutId2
    let checkoutId3
    let access_token_vendor
    test('Success get All', async (done) => { 
        const vendorLogin = await request(app)
        .post('/vendor/login')
        .send(userDataVendor)   
        access_token_vendor = await vendorLogin.body.access_token  
 
        const resultPost3 = await request(app)
        .post("/vendor/venue")
        .send(testDataVenue)
        .set('access_token', await access_token_vendor) 
        checkoutId3 = resultPost3.body.id

        const resultPost2 = await request(app)
        .post("/vendor/catering")
        .send(testDataCatering)
        .set('access_token', await access_token_vendor) 
        checkoutId2 = resultPost2.body.id

        const resultPost = await request(app)
        .post("/vendor/organizer")
        .send(testDataOrganizer)
        .set('access_token', await access_token_vendor) 
        checkoutId = resultPost.body.id
        console.log({checkoutId});

        await request(app)
        .post("/user/catering")
        .send(testDataCatering)
        .set('access_token', await access_token_vendor) 

        request(app)
        .post("/user/plan")
        .send({...dataOrganizer, VendorId: checkoutId})
        .set('access_token', access_token) 
        
        await request(app)
        .post("/user/plan")
        .send({...dataVenue, VendorId:await checkoutId})
        .set('access_token', access_token) 
        await request(app)
        .post("/user/plan")
        .send({...dataOrganizer, VendorId:await checkoutId2})
        .set('access_token', access_token) 
        await request(app)
        .post("/user/plan")
        .send({...dataCatering, VendorId:await checkoutId3})
        .set('access_token', access_token) 
 
        request(app)
            .get(`/vendor/checkout`)
            .set('access_token',await access_token_vendor)
            .set('Accept', 'application/json')
            .then(response => {
                console.log(access_token);
                // console.log(response.body, "RESPONSEVENDOR");
                const { status, body } = response
                expect(status).toBe(200)
                done()
            })
    })
    test('failed get one venue, unauthorized', async (done) => {  
        request(app)
            .put(`/vendor/checkout/${organizerId}`)
            .set('access_token',await access_token_vendor)
            .set('Accept', 'application/json')
            .then(response => {
                console.log(access_token); 
                const { status, body } = response
                expect(status).toBe(403)
                done()
            }) 
    })
    test('failed get one venue, unauthorized', async (done) => {
        request(app)
            .put(`/vendor/checkout/${cateringId}`)
            .set('access_token',await access_token_vendor)
            .set('Accept', 'application/json')
            .then(response => {
                console.log(access_token); 
                const { status, body } = response
                expect(status).toBe(403)
                done()
            }) 
    })

    test('failed get one venue, unauthorized', async (done) => {  
        request(app)
            .put(`/vendor/checkout/${venueId}`)
            .set('access_token',await access_token_vendor)
            .set('Accept', 'application/json')
            .then(response => {
                console.log(access_token); 
                const { status, body } = response
                expect(status).toBe(404)
                done()
            }) 
    })
    test('failed get one venue, unauthorized', async (done) => {  
        request(app)
            .put(`/vendor/checkout/x`)
            .set('access_token',await access_token_vendor)
            .set('Accept', 'application/json')
            .then(response => {
                console.log(access_token); 
                const { status, body } = response
                expect(status).toBe(500)
                done()
            }) 
    })
})

