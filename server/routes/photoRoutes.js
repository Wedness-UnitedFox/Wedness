const routes = require('express').Router() 
const photoController = require("../controllers/photoController")
// const { photosAuthorization } = require("../middlewares/auth")

routes.get("/", photoController.getPhotos)
routes.get("/:id", photoController.getPhoto)

routes.post("/",  photoController.postPhoto) 
routes.delete("/:id",  photoController.deletePhoto) 
  
module.exports = routes
