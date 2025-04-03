const express=require('express')
const fs=require('fs')
const Subscription = require('./../Models/Subscription')
const { fail } = require('assert')

exports.getAllSubscription=async(req,res)=>{
    try{
        const subscriptions=await Subscription.find()
        res.status(200).json({
            status:'success',
            data:{
                subscriptions:subscriptions
            }
        })
    }catch{
        res.status(404).json({
            status:'fail',
            data:{
                message:'No subscription found'
            }
        })
    }
}
exports.updateSubecription=async(req,res)=>{
    try{
        const id=req.params.id
        const updatedSubscription=await Subscription.findByIdAndUpdate(id,req.body,{new:true,
            runValidators:true})
        
        res.status(200).json({
            status:'success',
            data:{
                updatedSubscription:updatedSubscription
            }
        })

    }catch{
        res.status(404).json({
            status:'fail',
            data:{
                message:'No subscription found'
            }
        })
    }
}
exports.deleteSubscription=async(req,res)=>{
    try{
        const id=req.params.id
        await Subscription.findByIdAndDelete(id)
        res.status(204).json({
            status:'success',
            data:{
                message:'Subscription deleted successfully'
        }})

    }catch{
        res.status(404).json({
            status:fail,
            data:{
                message:'No subscription found'
            }
     })
    }
}
exports.addSubscription=async (req,res)=>{
    try{
        const subscription= await Subscription.create(req.body)
        res.status(201).json({  
            status:'success',
            data:{
                subscription:subscription
                }

        })

    }catch(error){
        response.status(400).json({
            "status": "failed",
            "Message": err
        })
    }
}
exports.getSubscriptionById=async(req,res)=>{
    try{
        const id=req.params.id
        const subscription=await Subscription.findById(id)
        res.status(204).json({
            status:'success',
            data:{
                subscription:subscription}})

    }catch{
        res.status(404).json({
            status:fail,
            data:{
                message:'No subscription found'
            }
     })
    }
}