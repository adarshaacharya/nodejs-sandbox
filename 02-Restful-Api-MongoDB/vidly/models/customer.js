
const mongoose = require('mongoose')

const Joi = require('@hapi/joi')


// define Customer class
const customerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 50
    },
    phone : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 50
    },
    isGold : {
        type : Boolean,
        default : false
    }
})


const Customer = mongoose.model('Customer', customerSchema)



// validation using Joe
function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(50)
            .required(),
        
        phone : Joi.string()
                  .required()
                  .min(3)
                  .max(50),

        isGold : Joi.boolean()
    });

  return schema.validate(customer);
    
}



module.exports.Customer = Customer
module.exports.validate = validateCustomer  