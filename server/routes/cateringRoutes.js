const routes = require('express').Router() 
const cateringController = require("../controllers/cateringController")

routes.get("/", cateringController.getCaterings)
routes.get("/:id", cateringController.getCatering)

routes.post("/", cateringController.postCatering)
routes.put("/:id", cateringController.putCatering)
routes.delete("/:id", cateringController.deleteCatering) 
 

module.exports = routes
