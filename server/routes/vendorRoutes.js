const routes = require("express").Router()
const vendorController = require("../controllers/vendorController")
const venueRoutes = require('./venueRoutes')
const organizerRoutes = require('./organizerRoutes')
const cateringRoutes = require('./cateringRoutes')
const photoRoutes = require('./photoRoutes')

routes.post("/login", vendorController.postLogin)
routes.post("/register", vendorController.postRegister)

//auth
routes.use("/venue", venueRoutes)
routes.use("/organizer", organizerRoutes)
routes.use("/catering", cateringRoutes)
routes.use("/photo", photoRoutes)

module.exports = routes