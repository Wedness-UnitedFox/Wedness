const routes = require('express').Router() 
const venueController = require("../controllers/venueController")
const { venueAuthorization } = require("../middlewares/auth")

routes.get("/", venueController.getVenues)
routes.get("/:id", venueController.getVenue) 

routes.post("/", venueController.postVenue)

routes.put("/:id", venueAuthorization, venueController.putVenue)
routes.delete("/:id", venueAuthorization, venueController.deleteVenue) 



module.exports = routes
