const routes = require("express").Router()
const vendorController = require("../controllers/vendorController")
const planController = require("../controllers/planController")
const venueRoutes = require('./venueRoutes')
const organizerRoutes = require('./organizerRoutes')
const cateringRoutes = require('./cateringRoutes')
const photoRoutes = require('./photoRoutes')
const {vendorAuthentication, authorization, checkoutAuthorization} = require("../middlewares/auth")

routes.post("/login", vendorController.userLogin)
routes.post("/register", vendorController.userRegister)

//auth
routes.use(vendorAuthentication)
routes.get('/checkout', planController.getCheckoutForVendor)

routes.put('/checkout/:id', checkoutAuthorization, planController.approveCheckoutForVendor)

routes.use("/venue", venueRoutes)
routes.use("/organizer", organizerRoutes)
routes.use("/catering", cateringRoutes)
routes.use("/photo", photoRoutes)
module.exports = routes