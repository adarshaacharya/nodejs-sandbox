// express
const express = require('express');
const app = express();

// middleware to get post request
app.use(express.json());
app.use(express.urlencoded({extended : true}));


// setting env variable
const config = require('config')
if (!config.get('jwtPrivateKey')) {
  console.log('FATAL ERROR : JWT Private Key Not defined')

  process.exit(1)
}


// Mongoose for db
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/vidly", {
  useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to database successfully..."))
  .catch(() => console.log("Failed to connect to database..."));


 
// routers
const genresRouter = require('../routes/genres');
app.use(genresRouter);

const homeRouter = require('../routes/home')
app.use(homeRouter)

const customerRouter = require('../routes/customers')
app.use(customerRouter)

const movieRouter = require('../routes/movies')
app.use(movieRouter)

const rentalRouter = require('../routes/rentals')
app.use(rentalRouter)

const userRouter = require('../routes/users')
app.use(userRouter)

const authRouter = require('../routes/auth')
app.use(authRouter)

// port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));