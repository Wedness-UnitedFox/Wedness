const routes = require('express').Router() 
<<<<<<< HEAD
const userRoutes = require('./userRoutes')
const vendorRoutes = require('./vendorRoutes')

=======
const userController = require("../controllers/userController")
const vendorRoutes = require('./vendorRoutes') 
const userRoutes = require('./userRoutes') 
>>>>>>> 825fdedb8f24c7257bb25b4c9bc6901b91e35b3f
const errorHandler = require('../middlewares/errorHandler')

routes.get("/", (req,res)=>{
    res.status(200).json({message:"halo home"})
})

<<<<<<< HEAD
routes.use("/user", userRoutes)


routes.use("/vendor", vendorRoutes)


=======
// routes.use("/user", userRoutes)
routes.use("/vendor", vendorRoutes) 
>>>>>>> 825fdedb8f24c7257bb25b4c9bc6901b91e35b3f
routes.use(errorHandler)

 

module.exports = routes
