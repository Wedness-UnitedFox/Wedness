const routes = require('express').Router() 
const userController = require("../controllers/userController")
const vendorRoutes = require('./vendorRoutes') 
const userRoutes = require('./userRoutes') 
const errorHandler = require('../middlewares/errorHandler')

routes.get("/", (req,res)=>{
    res.status(200).json({message:"halo home"})
})

// routes.use("/user", userRoutes)
routes.use("/vendor", vendorRoutes) 
routes.use(errorHandler)

 

module.exports = routes
