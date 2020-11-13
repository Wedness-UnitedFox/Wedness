const routes = require("express").Router()
const vendorController = require("../controllers/vendorController")

routes.post("/login", vendorController.postLogin)
routes.post("/register", vendorController.postRegister)

module.exports = routes