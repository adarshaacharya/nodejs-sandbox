const express = require('express')
const app = express();

// POST and PUT request middleware
app.use(express.json())
app.use(express.urlencoded({extended : true}));

// Routers
const homeRouter = require('../routes/home')
app.use(homeRouter);

const contactRouter = require('../routes/contact')
app.use(contactRouter);

//Custom middlewares
const logger = require('./middleware/logger')
app.use(logger);









const hostname = 'localhost';
const port = 3001;

app.listen(port, hostname, () => {

  console.log(`Server running at http://${hostname}:${port}/`);

});