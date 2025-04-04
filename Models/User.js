const mongoose=require('mongoose')
const validator = require('validator')
const bcrypt= require('bcryptjs')
const userSchema=mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please tell us your name!']
      },
      lastname: {
        type: String,
        },

      email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
      },
      photo: String,
      role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
      },
      points:{
        type:Number,
        default:0
      },
      password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
      },
      passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
          
          validator: function(el) {
            return el === this.password;
          },
          message: 'Passwords are not the same!'
        }
      },
      passwordChangedAt: Date,
      passwordResetToken: String,
      passwordResetExpires: Date,
      active: {
        type: Boolean,
        default: true,
        select: false
      }})

    userSchema.pre('save',async function(next){
      if(!this.isModified('password'))return next
      this.password=await bcrypt.hash(this.password,12)
      this.passwordConfirm=undefined
      next()


    })
    userSchema.methods.correctPassword=function(candidatePassword,userPassword){
      return bcrypt.compare(candidatePassword,userPassword)
    }
    const User = mongoose.model('User', userSchema);
    module.exports = User;