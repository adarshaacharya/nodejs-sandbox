const express = require('express')
const router = express.Router()

const {checkAuthenticated, checkNotAuthenticated} = require('../config/auth')

router.get('/', checkNotAuthenticated, (req, res) => {
 res.render('index')
})

router.get('/dashboard', checkAuthenticated, (req, res) => {
    res.render('dashboard', {
        name : req.user.name
    })
})
   
   

module.exports = router