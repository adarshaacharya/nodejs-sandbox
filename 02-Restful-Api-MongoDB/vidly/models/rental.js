
const mongoose = require('mongoose')

const Joi = require('@hapi/joi')


const rentalSchema = new mongoose.Schema({
    customer : { // only selecting properties that we need so create new schema
        type : new mongoose.Schema({
            name : {
            type : String,
            required : true,
            minlength : 5,
            maxlength : 50
        },

        isGold : {
            type : Boolean,
            default : false
        },

        phone : {
            type : String,
            required : true,
            minlength : 5,
            maxlength : 50
        }
        }),
         required : true
    },

    movie : {
        type : new mongoose.Schema({
            title : {
                type : String,
                 required : true,
                 trim: true, 
                  minlength : 5,
                 maxlength : 50
            }, 
            dailyRentalRate : {
                type : Number,
                required : true,
                min : 0,
                max : 255
            }
        }),
        required : true
    },
    dateOut: { 
        type: Date, 
        required: true,
        default: Date.now
      },
      dateReturned: { 
        type: Date
      },
      rentalFee: { 
        type: Number, 
        min: 0
      }
})
 


const Rental = mongoose.model('Rental', rentalSchema)




function validateRental(rental) {
    const schema = {
      customerId: Joi.string().required(),
      movieId: Joi.string().required()
    };
  
    return Joi.validate(rental, schema);
  }
  
  module.exports.Rental = Rental; 
 module.exports.validateRental = validateRental;