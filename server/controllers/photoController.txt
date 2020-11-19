const { Photo } = require('../models/index')

class PhotoController {
    static async getPhotos(req,res,next){

        Photo.findAll()
        .then(photos => {
            res.status(200).json(photos)
        })
        .catch(err => next(err))
    }
    
    static getPhoto(req,res,next){
        Photo.findByPk(req.params.id, {
            where: {
                vendor_id: req.body.vendor_id,
                vendor_type: req.body.vendor_type
            }
        })
        .then(photo => {
            res.status(200).json(photo)
        })
        .catch(err => next(err))
    }
    
    static postPhoto(req,res,next){ 
        //dari vendor_id => services_id
        Photo.create(req.body)
        .then(photo => {
            res.status(201).json(photo)
        })
        .catch(err => next(err))
    }

    static deletePhoto(req,res,next){
        Photo.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.status(200).json({msg:"Succeed in deleting photo"})
        })
        .catch(err => next(err))
    }

}

module.exports = PhotoController