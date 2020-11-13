const { User } = require('../models/index')
const { signToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcryptjs')

class UserController {
  static userLogin(req, res, next){
    const { email, password } = req.body
    if(email === '' || password === ''){
      next({name: "Bad Request"})
  }
    User.findOne({where: {
      email: email
    }})
    .then(user => {
      if(!user){
        next({name: 'Wrong Email or Password' })
      }
      else if(!comparePassword(password, user.password)) {
        next({name: 'Wrong Email or Password' })
      }
      else{
        const access_token = signToken({id: user.id, email: user.email, role: user.role})
        res.status(200).json({access_token}) 
      }
    })
    .catch(err => {
      next({name: "Internal Server Error"})
    })
  }

  static userRegister(req, res, next){
    const role = 'customer'
    const { name, email, password, phone_number } = req.body
    if( name === '' || email === '' || phone_number === '' || password === ''){
      next({name: "Empty Column"})
    }
    const new_user = {
      name,
      email,
      password,
      phone_number,
      role
    }
    User.create(new_user)
    .then(user => {
      res.status(201).json({
        id: user.id,
        email: user.email
      })
    })
    .catch(err => {
      next({name: "Internal Server Error"})
    })
  }
}

module.exports = UserController