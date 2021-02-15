
const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')

const {Customer, validate} = require('../models/customer')

// get all customers
router.get('/api/customers', async(req, res) => {

    try {
        const customers = await Customer.find()
        res.send(customers).status(200)
    }   catch(err) {
        res.send(err.message).status(500)
    }

})



//  get customer by id
router.get('/api/customers/:id', async(req, res) => {

    try {
        const customer =  await Customer.findById(req.params.id)

        if(!customer) return res.status(400).send("Customer of given id doesn't exits in database")
        
        res.send(customer).status(200)
    
    }catch (error) {
        res.status(500).send(error);
    }

})



//enter data to db
router.post('/api/customers', async(req, res) => {

    const {value, error} = validate(req.body)

    if(error) {
        console.log(error)
        return res.status(400).send(error.details[0].message)
        
    }

    try {
 
        const customer = new Customer({
            name : req.body.name,
            phone : req.body.phone,
            isGold : req.body.isGold
        }) 

        const result = await customer.save()

        res.send(result).status(200)
    } catch(err) {
        res.send(err.message).status(500)
    }
})


// edit data from db
router.put('/api/customers/:id', async(req, res) => {

    const {value, error} = validate(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message)
    }

    try {
        const customer = await Customer.findById(req.params.id)

        if(!customer) return res.status(400).send("Customer of given id doesn't exits in database")
      
        customer.set(req.body) 

        const result = await customer.save()
        res.send(result).status(200)

    }   catch(err) {
        res.send(err).status(400)
    }

})



// delete data from db
router.delete('/api/customers/:id', async(req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id)

        if(!customer) return res.json({ msg : "Cannot find customer of given id in database"})

        res.json(`${customer.name} data has been deleted successfully`).status(200)
    }   catch(err) {
        res.send(err.message).status(500)
    }
})




module.exports = router