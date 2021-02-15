const express = require('express')
const path = require('path')

const app = express()

const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport')

// middleware to get post request
app.use(express.json());
app.use(express.urlencoded({extended : true}));


// define views and public dir
const viewsDirectoryPath = path.join(__dirname, '../views')
const publicDirectoryPath = path.join(__dirname, '../public')


// set view & public dir
app.set('views',viewsDirectoryPath)
app.use(express.static(publicDirectoryPath))


// middlewares for form req
app.use(express.json())
app.use(express.urlencoded({ extended :false}))


// set up ejs engine
app.set('view engine', 'ejs')


// connect Express session middleware
app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: true,
}))

// passport config
require('../config/passport')(passport)

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Connect flash
app.use(flash());


// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error'); // passport
    next();
})

//routes
const userRouter = require('../routes/users')
app.use(userRouter)

const indexRouter = require('../routes/index')
app.use(indexRouter)


// Mongoose for db
mongoose.connect('mongodb://localhost/test', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => console.log("Connected to database successfully..."))
  .catch(() => console.log("Failed to connect to database..."));




// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})