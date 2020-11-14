const { Organizer, User } = require('../models')

class OrganizerController {
    
    static postOrganizer(req,res,next){ 
        req.body.UserId = req.userData.id
        Organizer.create(req.body)
            .then(data=>{
                res.status(201).json(data)
            })
            .catch(err=>next(err))
    }

    static getOrganizers(req,res,next){ 
        Organizer.findAll({
            // include:[User]
        })
            .then(data=>{
                res.status(200).json(data)
            })
            .catch(err=>next(err))
    } 
    
    static getOrganizer(req,res,next){ 
        Organizer.findByPk(req.params.id, {
            include:[User]
        })
            .then(data=>{
                if (data) res.status(200).json(data)
                else next({name:'Not Found'})
            })
            .catch(err=>next(err))
    } 

    static putOrganizer(req,res,next){ 
        Organizer.update(req.body, {
            where:{
                id:req.params.id
            }
        }).then(result=>{
            if(result){
                res.status(200).json({msg:'Edit Successfully'})
            }
        }).catch(err=> {
            next(err)})
    }

    static deleteOrganizer(req,res,next){ 
        Organizer.destroy({
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

module.exports = OrganizerController