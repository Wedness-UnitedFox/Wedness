const routes = require('express').Router() 
const cateringController = require("../controllers/cateringController")
const { cateringAuthorization } = require("../middlewares/auth")

routes.get("/", cateringController.getCaterings)
routes.get("/:id", cateringController.getCatering)

routes.post("/", cateringController.postCatering)
routes.put("/:id", cateringAuthorization, cateringController.putCatering)
routes.delete("/:id", cateringAuthorization, cateringController.deleteCatering) 
 

module.exports = routes
