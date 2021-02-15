const { User, registerValidation, loginValidation } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');



/**
 * @route GET /api/users/me
 * @description GET current logged in user
 * @type RequestHandler
 */

exports.me = async(req, res) => {
    try {
        let user = req.user;
        user = await await User.findOne( { _id : user._id}).select('-password'); // select user and exclude password property
        res.send(user).status(200)
    }   catch(err) {
        res.status(400).send(err)
    }
}


/**
 * @route POST /api/users/register
 * @description POST register req
 * @type RequestHandler
 */
exports.register = async(req, res) => {
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if(user) return res.status(400).send('User already registered');

    user = new User(_.pick(req.body, ['name', 'email','password']));
    
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    try {
        await user.save();
         
        const token = jwt.sign({ _id : user._id, isAdmin : user.isAdmin  }, process.env.JWT_KEY);
        res.header('x-auth-token' ,token).send(_.pick(user, ['_id', 'name', 'email', 'date']))
    }  catch(err) {
        res.status(400).send(err)
    }
}


/**
 * @route POST /api/users/login
 * @description POST login req
 * @type RequestHandler
 */
exports.login = async(req, res) => {
    const { error } = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email : req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid password');

    const token = jwt.sign({ _id : user._id, isAdmin : user.isAdmin}, process.env.JWT_KEY);
    res.header('x-auth-token' ,token).send(token) // set header in auth-token : <token> pair
}



