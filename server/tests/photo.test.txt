const request = require("supertest")
const app = require("../app")
const {sequelize} = require("../models")
const {queryInterface} = sequelize
const {sign} = require("../helpers/jwt")

let access_token =''

let photoData = {
    name: "hall-1",
    image_url: "https://img.freepik.com/free-vector/currently-offline-twitch-photo-background-vector-template_1361-2541.jpg?size=626&ext=jpg", 
} 
 
let photoData2 = {
    name: "hall-2",
    image_url: "https://img.freepik.com/free-vector/currently-offline-twitch-photo-background-vector-template_1361-2541.jpg?size=626&ext=jpg", 
} 
 
describe('Success Create photo', ()=>{
    it('Success photo', (done) => {
        request(app)
        .post('/photo')
        .send(photoData)
        // .set('access_token', access_token) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(201)
            expect(body).toHaveProperty('name', photoData.name)
            expect(body).toHaveProperty('image_url', photoData.image_url) 
            photoId = body.id
            done()
        })
    }) 
})

describe('Fail Create Photo', ()=>{
    it('no access token, should return 401', (done) => {
        request(app)
        .post('/photo')
        .send(photoData) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(401) 
            expect(body).toHaveProperty('msg', 'Unauthenticated. You need to login first')  
            done()
        })
    })

    let data = {...photoData,name:''} 
    it('no name input, should return 400', (done) => {
        request(app)
        .post('/photo')
        .set('access_token', access_token)
        .send(data) 
        .then(response => {  
            const {status, body} = response
            expect(status).toBe(400) 
            expect(body).toHaveProperty('msg', "photo's name cannot be empty")  
            done()
        })
    })
    let data2 = {...photoData,image_url:''} 
    it('no image input, should return 400', (done) => {
        request(app)
        .post('/photo')
        .set('access_token', access_token)
        .send(data2) 
        .then(response => { 
            // console.log(response);
            const {status, body} = response
            expect(status).toBe(400) 
            expect(body).toHaveProperty('msg', "photo's url cannot be empty")  
            done()
        })
    })  
})

describe('Success Read photos', () => {
    it('Read photos', (done) => {
        request(app)
        .get('/photo') 
        .set('access_token', access_token) 
        .then(response => {  
            const {status, body} = response 
            expect(status).toBe(200) 
            expect(body[0]).toHaveProperty('name', expect.any(String))
            expect(body[0]).toHaveProperty('image_url', expect.any(String)) 
            done()
        })
    })
})


describe('Success Delete photos', () => {
    it('Delete photos, should return 200 - success delete photos', (done) => {
        request(app)
        .get('/photo') 
        .set('access_token', access_token) 
        .then(response => {  
            const {status, body} = response
            console.log(response,"<<<<<<<<<<<<<<");
            expect(status).toBe(200) 
            expect(body).toHaveProperty('msg', 'success delete photos') 
            done()
        })
    })
})