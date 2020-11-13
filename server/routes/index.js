const routes = require('express').Router() 
const userController = require("../controllers/userController")
const vendorRoutes = require('./vendorRoutes')
const venueRoutes = require('./venueRoutes')
const organizerRoutes = require('./organizerRoutes')
const cateringRoutes = require('./cateringRoutes')
const errorHandler = require('../middlewares/errorHandler')

routes.get("/", (req,res)=>{
    res.status(200).json({message:"halo home"})
})

routes.post("/login", userController.postLogin)
routes.post("/register", userController.postRegister)  
routes.use("/vendor", vendorRoutes)

//auth
routes.use("/venue", venueRoutes)
routes.use("/organizer", organizerRoutes)
routes.use("/catering", cateringRoutes)
routes.use(errorHandler)

 

module.exports = routes
