class VenueController {
    
    static postVenue(req,res,next){ 
        res.status(201).json(req.body)
        // next({})
    }

    static getVenues(req,res,next){ 
        // res.send("oke")
        next()
    } 
    static getVenue(req,res,next){ 
        next()
    } 

    static putVenue(req,res,next){ 
        next()
    }

    static deleteVenue(req,res,next){ 
        next()
    }

}

module.exports = VenueController