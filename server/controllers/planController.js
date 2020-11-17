// const { Checkout: Checkout  } = require("../models")
const { Checkout, Venue, Catering, Organizer, User, sequelize } = require("../models")
const { Op } = require('sequelize')

class CheckoutController { 
    static postCheckout(req,res,next){  // input => VendorId(services), vendor_type, subtotal
        req.body.UserId = req.userData.id
        Checkout.create(req.body)
            .then(result=>{
                res.status(201).json(result) 
            })
            .catch(err=>{
                // console.log(err);
                next(err)
            }) 
    }

    static async getCheckouts(req,res,next){   
        try {
            let plans = await Checkout.findAll({
                where: {
                    isPaid: false
                }
            })   
            for(const plan of plans){
                let vendor
                if(plan.vendor_type === 'venue'){
                    // console.log("found venue")
                    vendor = await Venue.findByPk(plan.VendorId)
                }else if(plan.vendor_type === 'organizer'){
                    // console.log("found Organizer")
                    vendor = await Organizer.findByPk(plan.VendorId)
                }else {
                    // console.log("found catering")
                    vendor = await Catering.findByPk(plan.VendorId)
                }
                if(await vendor) { 
                    plan.dataValues.Vendor = await vendor
                        
                }
            } 
            // console.log(plans)
            await res.status(200).json(plans)

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static getCheckout(req,res,next){ 
        Checkout.findByPk(req.params.id)
            .then(result=>{
                if (result) res.status(200).json(result)
                else next({name:'Not Found'})
            })
            .catch(err=>next(err))
    } 
 
    static deleteCheckout(req,res,next){ 
        console.log("deleting");
        Checkout.destroy({
            where:{
                id:req.params.id
            } 
        }).then(result=>{
            if(result){
                res.status(200).json({msg:'Deleted Successfully'})
            }else{
                next({name:"Not Found"})
            }
        }).catch(err=>  
            next(err)
            )
    }

    // static async getCheckoutForVendor2(req, res, next){
    //     const caterings = await Catering.findAll({where: {UserId: req.userData.id}})
    //     const venues = await Venue.findAll({where: {UserId: req.userData.id}})
    //     const organizers = await Organizer.findAll({where: {UserId: req.userData.id}})
        
    //     // console.log({caterings, venues, organizers}, "from vendor")

    //     const checkouts = await Checkout.findAll({
    //         include: [             
    //             {
    //                 model: User,
    //                 attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
    //             },
    //             {
    //                 model: Venue,
    //                 where: {
                    
    //                     UserId: req.userData.id  
                                         
    //                 },
    //                 attributes: {
    //                     exclude: ["id", "description", "address", "email", "phone_number", "price", "type", "capacity", "service_type", "UserId"]},
    //                 required: false
    //             },
    //             {
    //                 model: Catering,
    //                 where: {
    //                     UserId: req.userData.id                   
    //                 },
    //                 required: false
    //             },
    //             {
    //                 model: Organizer,
    //                 where: {
    //                     UserId: req.userData.id                   
    //                 },
    //                 required: false
    //             }
    //         ]
    //     })
        // include: [
            // {
            // model: Photo,
            // where: {
            //     [Op.and]: [
            //         { vendor_id: req.params.id }, 
            //         { vendor_type: 'venue' }
            //     ],                   
            // },
            // required: false
        // }, 
        // {
        //     model: User,
        //     attributes: {exclude: ['password']},
        // }]
        // console.log(checkouts, "from here")
    //     let result = []
    //     for(const checkout of checkouts){
    //         if(checkout.vendor_type === 'venue'){
    //             // console.log("found venue")
    //             for(const venue of venues){
    //                 if(checkout.VendorId === venue.id || !checkout.isApproved){
    //                     result.push(checkout)
    //                 }
    //             }                
    //         }else if(checkout.vendor_type === 'organizer'){
    //             // console.log("found Organizer")
    //             for(const organizer of organizers){
    //                 if(checkout.VendorId === organizer.id || !checkout.isApproved){
    //                     result.push(checkout)
    //                 }
    //             }                
    //         }else {
    //             // console.log(checkout, "found catering")
    //             for(const catering of caterings){
    //                 if(checkout.VendorId === catering.id || !checkout.isApproved){
    //                     console.log("found")
    //                     result.push(checkout)
    //                 }
    //             }
    //         }
    //     }
    //     // console.log(result, "from getCheckoutforVendor")
    //     res.status(200).json(result)
    // }



    static async getCheckoutForVendor(req, res, next){
        const caterings = await Catering.findAll({where: {UserId: req.userData.id}})
        const venues = await Venue.findAll({where: {UserId: req.userData.id}})
        const organizers = await Organizer.findAll({where: {UserId: req.userData.id}})
         
        const checkouts = await Checkout.findAll({include:[
            {
                model: User,
                attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
            },
        ]})
        
        let result = []
        for(const checkout of checkouts){
            if(checkout.vendor_type === 'venue'){ 
                for(const venue of venues){
                    if(checkout.VendorId === venue.id || !checkout.isApproved){
                        checkout.dataValues.Service_name = venue.name
                        result.push(checkout)
                    }
                }                
            }else if(checkout.vendor_type === 'organizer'){
                for(const organizer of organizers){
                    if(checkout.VendorId === organizer.id || !checkout.isApproved){
                        checkout.dataValues.Service_name = organizer.name
                        result.push(checkout)
                    }
                }                
            }else {
                for(const catering of caterings){
                    if(checkout.VendorId === catering.id || !checkout.isApproved){
                        checkout.dataValues.Service_name = catering.name
                        result.push(checkout)
                    }
                }
            }
        } 

        // console.log(result, "from getCheckoutforVendor")
        res.status(200).json(result)
    }

    static approveCheckoutForVendor(req, res, next){
        Checkout.update({isApproved: true}, {
            where: {
                id: req.params.id
            }
        })
        .then(result =>{
            if(result) res.status(200).json({msg:'Vendor has approved this'})
        })
        .catch(err => next(err))
    }

    static async payCheckoutForCustomer(req, res, next){
        // console.log('masuk static fungsi')
        const t = await sequelize.transaction()
        try {
            const userCheckouts = await User.findByPk(req.userData.id, {
                include: [Checkout],
            })
            for( const plan of userCheckouts.Checkouts ) {
                await plan.update({
                        isPaid: true
                    },{
                        transaction: t
                    })
            }; 
            t.afterCommit(() => {
                res.status(200).json({ message: 'Checkout completed' })
            })
            await t.commit()
        }
        catch (err) {
            next(err)
            await t.rollback()
        }
    }
}

module.exports = CheckoutController