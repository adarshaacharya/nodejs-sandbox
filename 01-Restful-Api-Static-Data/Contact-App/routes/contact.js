const express = require('express')
const router = express.Router()

const Joi = require('@hapi/joi');

// data
const contacts = require('../src/utils/data')

//  Get all contact list
router.get('/api/contacts', (req, res) => {
    if(contacts.length == 0) {
        res.status(400).json({message : "No contacts found."})
        return;
    }
    res.json(contacts)
})


// Get single contact
router.get('/api/contacts/:id', (req, res) => {
    const contactID = parseInt(req.params.id)

    const isFound = contacts.find((contact) => {
        return contact.id === contactID
    })
    
    if(!isFound) {
        res.status(404).json({msg : 'Contact not found'})
        return;
    } 
    res.status(200).send(isFound)
}) 



// Post - Store contact

router.post('/api/contacts', (req, res) => {

    const { error, value } = checkValidation(req.body);

    if(error) {
        res.status(404).json({message : error.details[0].message})
        return;
    }

    const contact = {
        id: contacts.length +1,
        firs_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        website: req.body.website
    }

    contacts.push(contact)
    res.status(200).send(contact)

})





// PUT - Update Contact
router.put('/api/contacts/:id', (req, res) => {
    const contactID = parseInt(req.params.id)

    let isFound = contacts.find((contact) => {
        return contact.id === contactID
    })

    if(!isFound) {
        res.status(400).json({msg : 'Contact not found'})
        return;
    }   

    const {value, error} = checkValidation(req.body)

    if(error) {
        res.status(404).json({message : error.details[0].message})
        return;
    }

    const body = req.body
    const index = contacts.indexOf(isFound)
    const keys = Object.keys(body)
   
    keys.forEach((key) => {
        isFound[key] = body[key]
    })

    contacts[index] = isFound

    res.status(200).send(contacts[index])
})



// DELETE - Deleting the contact
router.delete('/api/contacts/:id', (req, res) => {
    const contactID = parseInt(req.params.id)

    let isFound = contacts.find((contact) => {
        return contact.id === contactID
    })

    if(!isFound) {
        res.status(400).json({msg : 'Contact not found'})
        return;
    }
    
    const index = contacts.indexOf(isFound)
    contacts.splice(index, 1)
    res.status(200).json({ message : `${isFound.first_name} ${isFound.last_name} contact has been deleted`})
})














function checkValidation(contact) {

    const schema = Joi.object({
        first_name: Joi.string()
            .max(30)
            .required(),

        last_name: Joi.string()
            .max(30)
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),

        website : Joi.string()
                .uri()
                .min(10)
                .max(30)
                .required(),
    })

    return { error, value } = schema.validate(contact);

}



module.exports = router