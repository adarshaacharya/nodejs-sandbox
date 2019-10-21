
const Joi = require('@hapi/joi')

const mongoose = require('mongoose');

// schema and model creation
const genreSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true,
    min : [5, 'Too few letters'],
    max : 30
  }
})
  
const Genres = mongoose.model('Genres', genreSchema)



//validate using Joi
function validateGenre(genre) {
    const schema = Joi.object({
      name: Joi.string()
               .min(3)
              .required()
    });
  
    return schema.validate(genre);
  }
  
  
  
module.exports.genreSchema = genreSchema 
module.exports.Genres = Genres
module.exports.validateGenre = validateGenre