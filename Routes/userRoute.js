const express=require('express')
const userRouter=express.Router()
const authController=require('./../Controllers/authController')
userRouter
    .route('/signup')
    .post(authController.signup)
    
userRouter
    .route('/login')
    .post(authController.login)
userRouter
    .route('/getUserId')
    .get(authController.getUserId)

userRouter
    .route('/Points/:id')
    .get(authController.getPoints)
    .put(authController.addPoints)

userRouter
    .post('/payment',authController.getCheckoutSession1)
    .get('/verify/:id',authController.verifyPayment)


module.exports=userRouter