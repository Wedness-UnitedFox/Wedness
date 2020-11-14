const routes = require('express').Router()
const userController = require("../controllers/userController")

routes.post("/login", userController.userLogin)
routes.post("/register", userController.userRegister)
// CRUD buat user "plan your wedding"
routes.get("/plan")
routes.post("/plan")
routes.delete("/plan/:id")

module.exports = routes