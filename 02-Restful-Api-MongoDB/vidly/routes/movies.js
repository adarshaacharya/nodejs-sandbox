
const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')

// importing movie model
const {Movie, validateMovie} = require('../models/movie')

const {Genres} = require('../models/genre')



// Get all genres in db
router.get('/api/movies',  async(req, res) => {
    try {
      const movies = await Movie.find().sort({name : 1})
  
      res.status(200).send(movies);
    } catch(err) {
      res.status(500).send(err)
    }
    
  });
  
  


// get movie by id
router.get('/api/movies/:id',  async(req, res) => {

    try {
        const id = req.params.id
        const movie = await Movie.findById(id)
    
        if(!movie) return res.status(404).send("The movie with given ID isn't found")
    
        console.log(movie)
        res.status(200).send(movie);
      } catch(err) {
        res.status(400).send(err.message)
      }
  });
  





  // Post new movie in database
 
router.post('/api/movies', async (req, res) => {

  try {
    const { error } = validateMovie(req.body)
    if (error) return res.status(400).send(error.details[0].message)
  
    const genre = await Genres.findById(req.body.genreId)
 
    if (!genre) return res.status(400).send('Invalid genre.')
  
    let movie = new Movie({ 
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    });
    console.log(movie)
    movie = await movie.save();
    
    res.send(movie);
  } catch(err) {
      res.send(err.message).status(400)
  }

});




router.put('/api/movies/:id', async (req, res) => {
 

    try {
        const genre = await Genres.findById(req.body.genreId)
 
      if (!genre) return res.status(400).send('Invalid genre.')

        const movie = await Movie.findById(req.params.id)

        if(!movie) return res.status(400).send("Movie of given id doesn't exits in database")
      
        movie.set(req.body) 

        const result = await movie.save()
        res.send(result).status(200)

    }   catch(err) {
        res.send(err).status(400)
    }


  });
  



  router.delete('/api/movies/:id', async(req, res) => {
      try {
        const movie = await Movie.findById(req.params.id)

        if(!movie) {
            res.status(404).send("Movie with given id doesn't exists")
            return;
        }

        const result = await Movie.findByIdAndDelete(req.params.id)

        res.send(result).status(400)
      } catch(err) {
        res.send(err).status(400)
      }
  })

  
module.exports = router;







