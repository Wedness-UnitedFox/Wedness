const route = require('express').Router()
const UserController = require('../controllers/userController')

route.post('/login', UserController.userLogin)
route.post('/register', UserController.userRegister)

module.exports = route