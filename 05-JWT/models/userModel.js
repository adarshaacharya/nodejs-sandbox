const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 50
    },
    email : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 255,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 1024,
    },
    isAdmin : {
        type : Boolean
    },
    date : {
        type : Date,
        default : Date.now
    }
}); 



const User = mongoose.model('User', userSchema)


function registerValidation(user) {
    const schema = Joi.object({
        name : Joi.string().required().min(5).max(255),
        email : Joi.string().required().min(5).max(255).email(),
        password : Joi.string().required().min(5).max(255)
    });
  
    return schema.validate(user);
}

function loginValidation(user) {
    const schema = Joi.object({
        email : Joi.string().required().min(5).max(255).email(),
        password : Joi.string().required().min(5).max(255)
    });
  
    return schema.validate(user);
  }
  
  


module.exports.User = User
module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation