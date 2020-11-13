const routes = require('express').Router() 
const venueController = require("../controllers/venueController")
 
routes.get("/", venueController.getVenues)
routes.get("/:id", venueController.getVenue)

routes.post("/:id", venueController.postVenue)
routes.put("/:id", venueController.putVenue)
routes.delete("/:id", venueController.deleteVenue) 



module.exports = routes
