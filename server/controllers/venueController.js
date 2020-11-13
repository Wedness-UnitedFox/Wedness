const Venue = require("../models/venue")

class VenueController {

    static getVenues(req,res,next){ 
        Venue.findAll()
        .then(data => {
            // console.log(data)
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    } 
    static getVenue(req,res,next){ 
        next()
    } 
    static postVenue(req,res,next){ 
        res.status(201).json(req.body)
        // next({})
    }
    static putVenue(req,res,next){ 
        next()
    }

    static deleteVenue(req,res,next){ 
        next()
    }

}

module.exports = VenueController