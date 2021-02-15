
const express = require('express')
const router = express.Router()


//Home page
router.get("/", (req, res) => {
    res.send("Hello world");
  });
  
  
  
  module.exports = router