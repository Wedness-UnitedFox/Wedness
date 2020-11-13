const { verifyToken } = require('../helpers/jwt.js')
const { User } = require('../models/index.js')

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

module.exports = {
    userAuthentication,
    vendorAuthentication,
    authorization
} 