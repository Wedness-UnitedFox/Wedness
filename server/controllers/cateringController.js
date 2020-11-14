const { Catering, User } = require('../models/index')
class CateringController {
    
    static postCatering(req,res,next){ 
        req.body.UserId = req.userData.id
        Catering.create(req.body)
        .then(catering => {
            res.status(201).json(catering)
        })
        .catch(err => next(err))
    }

    static getCaterings(req,res,next){ 
        Catering.findAll({
            // include:[User]
        })
        .then(caterings => {
            res.status(200).json(caterings)
        })
        .catch(err => next(err))
    } 
    
    static getCatering(req,res,next){ 
        Catering.findByPk(req.params.id, {
            include:[User]
        })
        .then(catering => {
            if(catering) res.status(200).json(catering)
            else next({name:'Not Found'})
        })
        .catch(err => next(err))
    } 

    static putCatering(req,res,next){ 
        Catering.update(req.body, {
            where:{
                id:req.params.id
            }
        })
        .then(result =>{
            if(result) res.status(200).json({msg:'Edit Successfully'})
        })
        .catch(err => next(err))
    }

    static deleteCatering(req,res,next){ 
        Catering.destroy({
            where: {
                id:req.params.id
            }
        })
        .then(result=>{
            if(result) res.status(200).json({msg:'Deleted Successfully'})
        })
        .catch(err=> next(err))
    }

}

module.exports = CateringController