const express = require('express')
const path = require('path')


const app = express()


// Middleware to handle POST/PUT req
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// Define paths of views and public directory
const viewsDirectoryPath = path.join(__dirname, '../views')
const publicDirectoryPath = path.join(__dirname,'../public')


// Setup views and public directory
app.set('views', viewsDirectoryPath)
app.use(express.static(publicDirectoryPath))

// Setup EJS engine
app.set('view engine', 'ejs')

// Define path for route folder
const userRouter = require('../routes/user')
app.use(userRouter)


// Custom Middlewares
const logger = require('./middleware/logger')
app.use(logger)



const hostname = 'localhost'
const port = 9000 || process.env.PORT

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
