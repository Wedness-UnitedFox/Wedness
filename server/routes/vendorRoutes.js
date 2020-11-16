const routes = require("express").Router()
const { Checkout, Catering, Venue, Organizer } = require("../models/index")
const vendorController = require("../controllers/vendorController")
const planController = require("../controllers/planController")
const venueRoutes = require('./venueRoutes')
const organizerRoutes = require('./organizerRoutes')
const cateringRoutes = require('./cateringRoutes')
const photoRoutes = require('./photoRoutes')
const {vendorAuthentication, authorization} = require("../middlewares/auth")
const { router } = require("../app")

routes.post("/login", vendorController.userLogin)
routes.post("/register", vendorController.userRegister)

//auth
routes.use(vendorAuthentication)
routes.get('/checkout', planController.getCheckoutForVendor)

const checkoutAuthorization = async (req, res, next) => {
  const caterings = await Catering.findAll({where: {UserId: req.userData.id}})
  const venues = await Venue.findAll({where: {UserId: req.userData.id}})
  const organizers = await Organizer.findAll({where: {UserId: req.userData.id}})
  const {id} = req.params  
  Checkout.findByPk(+id)
      .then(data => {
          let found
          if(!data){
              next({name : 'Not Found'})
          }
          else{
            if(data.vendor_type === 'venue'){
              found = venues.find(venue => venue.id === data.VendorId )
            }
            else if(data.vendor_type === 'catering'){
              found = caterings.find(catering => catering.id === data.VendorId)
            }
            else{
              found = organizers.find(organizer => organizer.id === data.VendorId)
            }
          }
          if(found) next()
          else next({name: 'Not Authorized'})
      })
      .catch(err => {
          next(err)
      }) 
}

routes.put('/checkout/:id', checkoutAuthorization, planController.approveCheckoutForVendor)

routes.use("/venue", venueRoutes)
routes.use("/organizer", organizerRoutes)
routes.use("/catering", cateringRoutes)
routes.use("/photo", photoRoutes)
module.exports = routes