const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const passport = require('passport');

const {User, validateUser} = require('../models/user')


const {checkAuthenticated, checkNotAuthenticated} = require('../config/auth')


router.get('/users/register', checkNotAuthenticated, (req, res) => {
   res.render('register.ejs')
})


router.post('/users/register', checkNotAuthenticated, async(req, res) => {
   
   let errors = [];
   const {value, error} = validateUser(req.body)
   
   if(error) {
      console.log(error.details[0].message)
      errors.push(error.details[0].message)
   }

   if(errors.length > 0) {
      res.render('register', {
         errors : errors,
         name : req.body.name,
         email : req.body.email,
         password  : req.body.password
      })
   }  else {
      const user = await User.findOne({email : req.body.email})

      // check if user exists
      if(user) {
         errors.push('The given email already exists. Try new email');
         res.render('register', {
            errors : errors,
            name : req.body.name,
            email : req.body.email,
            password  : req.body.password
         })
      }  else {

         try {
            const user = new User({
               name : req.body.name,
               email : req.body.email,
               password  : req.body.password 
            })
   
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(user.password, salt)
            user.password = hashedPassword;
            await user.save();
            
            await req.flash('success_msg', "You're now registered and can login")

            res.redirect('/users/login');
   
         } catch(err) {
            console.log(err)
            res.redirect('/users/register')
         }
      }
   } 
})


router.get('/users/login',checkNotAuthenticated, (req, res) => {
   res.render('login.ejs')
})


// Login
router.post('/users/login',checkNotAuthenticated , (req, res, next) => {
   passport.authenticate('local', {
     successRedirect: '/dashboard',
     failureRedirect: '/users/login',
     failureFlash: true // show failure msg using message : error 
   })(req, res, next);
 });





 // logout
 router.get('/users/logout', (req, res) => {
    req.logOut()
    req.flash('success_msg', ' Successfully logged out')
    res.redirect('/users/login')
 })



module.exports = router

