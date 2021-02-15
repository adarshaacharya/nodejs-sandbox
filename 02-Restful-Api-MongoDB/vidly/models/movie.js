
const mongoose = require('mongoose')

const Joi = require('@hapi/joi')

const {genreSchema} = require('./genre')

const movieSchema = new mongoose.Schema({
    title : {
        type : String,
         required : true,
         trim: true, 
          minlength : 5,
         maxlength : 50
    }, 
    genre : {
       type :  genreSchema,
       required : true
    },
    numberInStock : {
        type : Number,
        required : true,
        min : 0,
        max : 255
    },
    dailyRentalRate : {
        type : Number,
        required : true,
        min : 0,
        max : 255
    }
})


const Movie = mongoose.model('Movie', movieSchema)




//validate using Joi

function validateMovie(movie) {
    const schema = Joi.object({
      title: Joi.string()
               .min(3)
               .max(50)
              .required(),
      
      genreId : Joi.string()
                    .required(),
                    
      numberInStock : Joi.number()
                      .required(),
                       
      dailyRentalRate : Joi.number()
                      .required()
    });
  
    return schema.validate(movie);
  }
  

module.exports.Movie = Movie
module.exports.validateMovie = validateMovie