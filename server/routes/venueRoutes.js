const routes = require('express').Router() 
const venueController = require("../controllers/venueController")
const {} = require('../middlewares/auth')

routes.get("/", venueController.getVenues)
routes.get("/:id", venueController.getVenue)

routes.post("/", venueController.postVenue)
routes.put("/:id", venueController.putVenue)
routes.delete("/:id", venueController.deleteVenue) 



module.exports = routes
