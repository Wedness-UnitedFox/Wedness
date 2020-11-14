const { Venue } = require("../models")

class VenueController { 
    static postVenue(req,res,next){ 
        // console.log(req.body,"POST<<<<<<<<<<<<<<<<<" );
        req.body.UserId = req.userData.id
        Venue.create(req.body)
            .then(venue=>{
                res.status(201).json(venue)
            })
            .catch(err=>next(err))
    }

    static getVenues(req,res,next){  
        Venue.findAll()
            .then(venues=>{
                res.status(200).json(venues)
            })
            .catch(err=>next(err))
    } 

    static getVenue(req,res,next){ 
        Venue.findByPk(req.params.id)
            .then(venue=>{
                if (venue) res.status(200).json(venue)
                else next({name:'Not Found'})
            })
            .catch(err=>next(err))
    } 

    static putVenue(req,res,next){ 
        console.log(req.body, req.params.id);
        Venue.update(req.body, {
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

    static deleteVenue(req,res,next){ 
        Venue.destroy({
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

module.exports = VenueController