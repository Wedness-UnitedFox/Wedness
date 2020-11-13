const routes = require('express').Router() 
const organizerController = require("../controllers/organizerController")

routes.get("/", organizerController.getOrganizers)
routes.get("/:id", organizerController.getOrganizer)

routes.post("/:id", organizerController.postOrganizer)
routes.put("/:id", organizerController.putOrganizer)
routes.delete("/:id", organizerController.deleteOrganizer) 
 
module.exports = routes
