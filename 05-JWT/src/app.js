if(process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')

const app = express()



// Middleware to Handle Post request
app.use(express.json());
app.use(express.urlencoded({ extended : true }));



// connect to db
mongoose.connect(process.env.DATABASE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => console.log("Connected to database successfully..."))
  .catch((err) => console.log("Failed to connect to database", err));



// Import routes
const usersRouter  = require('../routes/users.js');
const postsRouter  = require('../routes/posts.js');


// Route middlewares
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

// port 
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})