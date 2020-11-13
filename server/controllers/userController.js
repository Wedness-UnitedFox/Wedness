class UserController{ 
    static postLogin(req,res,next){
        next({name:"Wrong Email or Password"}) 
    }

    static postRegister(req,res,next){
        next({name:"Wrong Email or Password"}) 
    }

}

module.exports = UserController