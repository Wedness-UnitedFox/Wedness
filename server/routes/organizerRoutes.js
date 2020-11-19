const routes = require('express').Router() 
const organizerController = require("../controllers/organizerController")
const { organizerAuthorization } = require("../middlewares/auth")

routes.get("/", organizerController.getOrganizers)
routes.get("/:id", organizerController.getOrganizer)

routes.post("/", organizerController.postOrganizer)
routes.put("/:id", organizerAuthorization, organizerController.putOrganizer)
routes.delete("/:id", organizerAuthorization, organizerController.deleteOrganizer) 
 
module.exports = routes
