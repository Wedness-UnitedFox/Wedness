const { Checkout: Plan  } = require("../models")

class CheckoutController { 
    static postPlan(req,res,next){ 
        req.body.UserId = req.userData.id
        Plan.create(req.body)
            .then(plan=>{
                res.status(201).json(plan)
            })
            .catch(err=>next(err))
    }

    static getPlans(req,res,next){  
        Plan.findAll()
            .then(Plans=>{
                res.status(200).json(Plans)
            })
            .catch(err=>next(err))
    } 

    static getPlan(req,res,next){ 
        Plan.findByPk(req.params.id)
            .then(Plan=>{
                if (Plan) res.status(200).json(Plan)
                else next({name:'Not Found'})
            })
            .catch(err=>next(err))
    } 
 
    static deletePlan(req,res,next){ 
        Plan.destroy({
            where:{
                id:req.params.id
            } 
        }).then(result=>{
            if(result){
                res.status(200).json({msg:'Deleted Successfully'})
            }
        }).catch(err=> next(err))
    } 
}

module.exports = CheckoutController