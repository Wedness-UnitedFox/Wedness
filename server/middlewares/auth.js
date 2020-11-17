const { verifyToken } = require('../helpers/jwt.js')
const { User, Venue, Catering, Organizer, Checkout, Photo } = require('../models/index.js') 

// middleware for user authentication
const userAuthentication = (req, res, next) => {
    const { access_token } = req.headers
    if(access_token){
        let decode = verifyToken(access_token)
        req.userData = decode
        User.findByPk(req.userData.id)
            .then(user => {
                if(!user || user.role !== 'customer'){
                    next({name:'Unauthenticated'})
                }
                next()
            })
            .catch(err => {
                next(err)
            })
    }
    else{
        next({name: 'Not Authorized', message: "Invalid access!"})
    }
}

const vendorAuthentication = (req, res, next) => {
    const { access_token } = req.headers
    console.log("AUTHENTICATING-->", access_token,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
  if(access_token){
      
      let decode = verifyToken(access_token)
      req.userData = decode
      User.findByPk(req.userData.id)
          .then(user => {
              if(!user || user.role !== 'vendor'){
                  next({name: 'Unauthenticated'})
              }
              next()
          })
          .catch(err => {
            next(err)
          })
  }
  else{
      next({name: 'Not Authorized', message: "Invalid access!"})
  }
}

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
            else {
                console.log("masuk not authorized");
                next({name: 'Not Authorized'})
            }
        })
        .catch(err => {
            next(err)
        }) 
  }

// middleware for user authorization
const authorization = (req, res, next) => {
    const userData = req.userData 
    User.findOne({
        where:{
            email: userData.email
        }
    })
        .then(result => {
            if(result && result.role === 'vendor'){
                next()
            }
            else if(result && result.role !== 'vendor'){
                next({name:'Not Authorized', message: "You are not authorized."})
            }
            else if(!result){
                next({name:'Wrong Email or Password', message: "User not found."})
            } 
        })
        .catch(err => {
            next(err)
        }) 
}


const venueAuthorization = (req, res, next) => {
    // console.log("VENUE AUTH", req.params);
    const {id} = req.params  
    Venue.findByPk(+id)
        .then(data => {
            // console.log(data);
            if(!data){
                next({message : 'Data not found'})
            } else if(req.userData.id !== data.UserId){
                next({message : 'You dont have access'})
            } else {
                next()
            }
        })
        .catch(err => {
            // console.log(err);
            res.status(500).json({message : err.message})
        }) 
}

const organizerAuthorization = (req, res, next) => {
    const {id} = req.params  
    Organizer.findByPk(+id)
        .then(data => {
            // console.log(data);
            if(!data){
                next({message : 'Data not found'})
            } else if(req.userData.id !== data.UserId){
                next({message : 'You dont have access'})
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(500).json({message : err.message})
        }) 
}

const cateringAuthorization = (req, res, next) => {
    const {id} = req.params  
    Catering.findByPk(id)
        .then(data => {
            if(!data){
                next({message : 'Data not found'})
            } else if(req.userData.id !== data.UserId){
                next({message : 'You dont have access'})
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(500).json({message : err.message})
        }) 
}
// const photosAuthorization = (req, res, next) => {
//     const {id} = req.params  
//     Photo.findByPK(id)
//         .then(data => {
//             if(!data){
//                 next({message : 'Data not found'})
//             } else if(req.userData.id !== data.vendor_id){
//                 next({message : 'You dont have access'})
//             } else {
//                 next()
//             }
//         })
//         .catch(err => {
//             res.status(500).json({message : err.message})
//         }) 

module.exports = {
    userAuthentication,
    vendorAuthentication,
    authorization,
    venueAuthorization,
    organizerAuthorization,
    cateringAuthorization,
    checkoutAuthorization
} 