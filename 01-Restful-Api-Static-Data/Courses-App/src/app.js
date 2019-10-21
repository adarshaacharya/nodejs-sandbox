const express = require("express");
const app = express();

// Middleware to handle POST/PUT req
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(express.static('../public'))


// Custom Middlewares
const logger = require('./middleware/logger')
app.use(logger)

const auth = require('./middleware/auth.js.js.js')
app.use(auth)


// router
const courseRouter = require('../routes/courses')
app.use(courseRouter)


//home 
const homeRouter = require('../routes/home')
app.use(homeRouter)

const hostname = 'localhost'
const port = 5000 || process.env.PORT

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
