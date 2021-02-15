// route to handle the authntication request (valid email // password) during the sign in 

const express = require('express')
const router = express.Router()

const { User} = require('../models/user')

const bcrypt = require('bcrypt')
const Joi = require('@hapi/joi')
var jwt = require('jsonwebtoken')


// for env variable
const config = require('config')

router.post('/api/auth', async(req,res) => {
    const {value, error} = validateUser(req.body)
 
    if(error) return res.status(400).send(error.details[0].message);
    
    try {

        let user =  await User.findOne({email : req.body.email}) 
        if(!user) return res.send("Email isn't registered, Invalid email or password").status(400)

        const match = await bcrypt.compare(req.body.password, user.password)
        
        if(!match) return res.status(400).send('Inavlid email or password')
 
        const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));

        res.send(token)
 
    } catch (error) {
        res.status(404).send(error.message)
    }

});




function validateUser(user) {
    const schema = Joi.object({
        email : Joi.string().required().min(5).max(30).email(),
        password : Joi.string().required().min(5).max(255)
    });
  
    return schema.validate(user);
  }
  


module.exports  = router