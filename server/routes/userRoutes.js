const routes = require('express').Router()
const userController = require("../controllers/userController")
const venueController = require("../controllers/venueController")
const organizerController = require("../controllers/organizerController")
const cateringController = require("../controllers/cateringController")
const {userAuthentication} = require("../middlewares/auth")
const CheckoutController = require("../controllers/planController")

routes.post("/login", userController.userLogin)
routes.post("/register", userController.userRegister) 

// CRUD buat user "plan your wedding" 
routes.use(userAuthentication)
routes.get("/venue", venueController.getVenues)
routes.get("/venue/:id", venueController.getVenue) 
routes.get("/organizer", organizerController.getOrganizers)
routes.get("/organizer/:id", organizerController.getOrganizer)
routes.get("/catering", cateringController.getCaterings)
routes.get("/catering/:id", cateringController.getCatering) 

routes.get("/plan", CheckoutController.getCheckouts)
// routes.get("/plan/:id", CheckoutController.getCheckouts)
routes.post("/plan", CheckoutController.postCheckout) 
routes.delete("/plan/:id", CheckoutController.deleteCheckout)
routes.put("/plan/checkout", CheckoutController.payCheckoutForCustomer) 

module.exports = routes