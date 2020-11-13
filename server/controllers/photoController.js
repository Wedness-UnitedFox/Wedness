
class PhotoController {
    static getPhotos(req,res,next){

        res.status(200).json({})
    }
    
    static getPhoto(req,res,next){

        res.status(200).json({})
    }
    
    static postPhoto(req,res,next){

        res.status(201).json(req.body)
    }

    static deletePhoto(req,res,next){

        res.status(200).json({msg:"success delete photos"})
    }

}

module.exports = PhotoController