const mongoose = require("mongoose");
const Joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required : true,
  },

  password: { 
    type: String, 
    hide: true,
    required : true,
    minlength : 5,
    maxlength : 250 
}
});

const User = mongoose.model('User', userSchema)


function validateUser(user) {
    const schema = Joi.object({
        name : Joi.string().required().min(5).max(250),
        email : Joi.string().required().min(5).max(250).email(),
        password : Joi.string().required().min(5).max(255)
    })
    return schema.validate(user);
}

module.exports.User = User
module.exports.validateUser = validateUser