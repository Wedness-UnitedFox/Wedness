const routes = require('express').Router()  
const vendorRoutes = require('./vendorRoutes') 
const userRoutes = require('./userRoutes') 
const errorHandler = require('../middlewares/errorHandler')

routes.use("/user", userRoutes)
routes.use("/vendor", vendorRoutes) 
routes.use(errorHandler)


module.exports = routes
