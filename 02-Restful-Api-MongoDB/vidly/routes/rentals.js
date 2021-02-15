const {Rental, validateRental} = require('../models/rental')

const {Movie} = require('../models/movie')

const {Customer} = require('../models/customer')

const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.get('/api/rentals', async (req, res) => {
    try {
        const rentals = await Rental.find().sort('-dateOut');
        res.send(rentals)
    } catch(err) {
    res.send(err).status(400)
  }
});
 
router.post('/api/rentals', async (req, res) => {

  const { value, error } = validateRental(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  } 

  try {
     const customer = await Customer.findById(req.body.customerId)

    if (!customer) {
        return res.status(400).send('Invalid customer.')
    }
  
    const movie = await Movie.findById(req.body.movieId)

    if (!movie) {
        return res.status(400).send('Invalid movie.')
    }
  
    if (movie.numberInStock === 0) {
        return res.status(400).send('Movie not in stock.')
    }
  
    let rental = new Rental({ 
      customer: {
        _id: customer._id,
        name: customer.name, 
        phone: customer.phone
      },
      movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate
      }
    })


    rental = await rental.save();
  
    movie.numberInStock--;
    movie.save();
    
    res.send(rental)

  } catch(err) {
      res.send(err).status(400)
  }
  
});







router.get('/:id', async (req, res) => {

    try {
        const rental = await Rental.findById(req.params.id)

        if (!rental) return res.status(404).send('The rental with the given ID was not found.')
      
        res.send(rental)
    }   catch(err) {
        res.send(err).status(400)
    }

});






module.exports = router; 