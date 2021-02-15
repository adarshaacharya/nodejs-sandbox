const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const {Genres, validateGenre} = require('../models/genre')

// importing middleware
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

// Get all genres in db
router.get('/api/genres', async(req, res) => {
  try {
    const genres = await Genres.find().sort({name : 1})

    res.status(200).send(genres);
  } catch(err) {
    res.status(500).send(err)
  }
  
});



// get genre by id
router.get('/api/genres/:id', async(req, res) => {

  try {
    const id = req.params.id
    const genre = await Genres.findById(id)

    if(!genre) return res.status(404).send("The genre with given ID isn't found")

    console.log(genre)
    res.status(200).send(genres);
  } catch(err) {
    res.status(400).send(err.message)
  }

});





// post request
router.post('/api/genres', auth, async(req, res) => {

  const { value, error } = validateGenre(req.body); 
  if (error)  return res.status(400).send(error.details[0].message)

  try {

  const genre = new Genres({  // Genre = model name
    name: req.body.name
  });

    const result = await genre.save()

    res.status(200).send(result)
  } catch(err) {
    res.send(err.message).status(400)
  }
  
});





// update
router.put('/api/genres/:id', auth, async(req, res) => {

  const { value, error } = validateGenre(req.body); 
  if (error) {
    return res.status(400).send(error.details[0].message);
  } 

  try {
    const id = req.params.id
    const genre = await Genres.findById(id); // returns the whole obj by finding its id

    if(!genre) return res.status(404).send("The genre with given ID isn't found")

    genre.set(req.body); // change the property of obj as defined in req body

    const result = await genre.save()
    res.send(result).status(200)
   
  } catch(err) {
    res.send(err.message).status(400)
  }

});






// delete genres (only admin) can delete
router.delete('/api/genres/:id',[auth, admin], async(req, res) => {

  try {
    const id = req.params.id
    const genre = await Genres.findOneAndDelete({_id : id})

    if(!genre) return res.status(404).send("The genre with given ID isn't found")

    res.send(genre).status(200)

  } catch(err) {
    res.send(err.message).status(400)
  }

});



module.exports = router;