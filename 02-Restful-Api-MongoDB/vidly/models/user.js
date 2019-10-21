const mongoose = require('mongoose')

const Joi = require('@hapi/joi')
const PasswordComplexity = require('joi-password-complexity'); // → Joi object that validates password complexity

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
    }

}) 


const User = mongoose.model('User', userSchema)


// generate JWT when sign in
userSchema.methods.generateAuthToken = function() {

    const token = jwt.sign({_id : this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'))

    return token;
}




function validateUser(user) {
    const schema = Joi.object({
        name : Joi.string().required().min(5).max(30),
        email : Joi.string().required().min(5).max(30).email(),
        password : Joi.string().required().min(5).max(255)
    });
  
    return schema.validate(user);
  }
  


module.exports.User = User
module.exports.validateUser = validateUser