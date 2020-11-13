const { User } = require('../models/index')
const { signToken } = require('../helpers/jwt')

class UserController {
  static userLogin(req, res, next){
    const { email, password } = req.body
    if(email === '' || password === ''){
      res.status(400).json({
          name: "Bad Request",
          message: "Please input email and/or password"
      })
  }
    User.findOne({where: {
      email: email
    }})
    .then(user => {
      if(!user){
        res.status(404).json({
          name: 'Unauthorized',
          message: 'Wrong email or password!'
      })}
      else{
        const access_token = signToken({id: user.id, email: user.email, role: user.role})
        res.status(200).json({access_token}) 
      }
    })
    .catch(err => {
      res.status(500).json({
        name: "Internal Server Error",
        message: err.message
      })
    })
  }

  static userRegister(req, res, next){
    const role = 'customer'
    const { name, email, password, phone_number } = req.body
    User.create({
      name,
      email,
      password,
      phone_number,
      role
    })
    .then(user => {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name: user.name
      })
    })
    .catch(err => {
      res.status(500).json({
        name: "Internal Server Error",
        message: err.message
      })
    })
  }
}

module.exports = UserController