
const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.render('index.ejs', {
        title : 'Home Page'
    })
  })

  

router.post('/about', (req, res) => {
  res.send(req.body)
})


router.get('/contact', (req, res) => {
    res.render('contact', {
        title : 'Contact Page'
    })
})


module.exports = router