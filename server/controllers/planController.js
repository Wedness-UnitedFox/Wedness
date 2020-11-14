// const { Checkout: Checkout  } = require("../models")
const e = require("express");
const { Checkout, Venue, Catering, Organizer  } = require("../models")

class CheckoutController { 
    static postCheckout(req,res,next){  // input => VendorId(services), vendor_type, subtotal
        req.body.UserId = req.userData.id
        Checkout.create(req.body)
            .then(result=>{
                res.status(201).json(result) 
            })
            .catch(err=>{
                console.log(err);
                next(err)
            }) 
    }

    // static getCheckouts(req,res,next){    
    //     Checkout.findAll({ 
    //         include:[Venue]
    //     })
    //         .then(result=>{ 
    //             res.status(200).json(result)
    //         })
    //         .catch(err=>{
    //             console.log(err);
    //             next(err)
    //         })
    // } 

    static async getCheckouts(req,res,next){   
        try {
            let plans = await Checkout.findAll()   
            for(const plan of plans){
                let vendor
                if(plan.vendor_type === 'venue'){
                    console.log("found venue")
                    vendor = await Venue.findByPk(plan.VendorId)
                }else if(plan.vendor_type === 'organizer'){
                    console.log("found Organizer")
                    vendor = await Organizer.findByPk(plan.VendorId)
                }else {
                    console.log("found catering")
                    vendor = await Catering.findByPk(plan.VendorId)
                }
                if(await vendor) { 
                    plan.dataValues.Vendor = await vendor
                }
            } 
            console.log(plans)
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
        Checkout.destroy({
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