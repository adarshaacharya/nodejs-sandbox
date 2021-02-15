const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const config = require('config')

const mongoose = require('mongoose')

const { User, validateUser} = require('../models/user')

const _ = require('lodash');
const bcrypt = require('bcrypt');

const auth = require('../middleware/auth')


// get current logged in user
router.get('/api/users/me', auth, async(req, res) => {
    
    const user = await User.findById(req.user._id).select('-password')
    res.send(user)
})



router.post('/api/users', async(req,res) => {
    const {value, error} = validateUser(req.body)
 
    if(error) return res.status(400).send(error)


   let user =  await User.findOne({email : req.body.email}) 
   if(user) return res.send('user already registered').status(400)

    try {
         user = new User({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        })

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)

        user.password = hash;

        const result = await user.save()
        console.log(user)

        const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
        res.header('x-auth-token',token).send(_.pick(result, ['_id', 'name', 'email'])).send(200)

    } catch (error) {
        res.send(404).send(error.message)
    }

})










module.exports  = router