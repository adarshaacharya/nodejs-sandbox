
const express = require('express')
const router = express.Router()

// Input validation
const Joi = require("@hapi/joi");

// data
const courses = require('../src/data')


// View all courses
router.get("/api/courses", (req, res) => {
    if(!courses) {
        res.status(404).json({ message: 'No courses found.'})
        return
    }
    res.send(courses);
});



// Read the courses array by course id
router.get("/api/courses/:id", (req, res) => {
  let courseID = parseInt(req.params.id);

  const isFound = courses.find((course) => {
    return course.id === courseID;
 })

  if (!isFound) {
    res.status(404).json({message : "The course with given ID isn't found"});
  } else {
    res.status(200).send(isFound);
  }
});




// Create the new course object and add to courses array
router.post("/api/courses", (req, res) => {

    const {error, value} = validateCourse(req.body)
  
     console.log(value)
     console.log(error)

  if (error) {
    res.status(400).json({ error : error.details[0].message})
    return;
  } 

    const course = {
      id: courses.length + 1,
      name: value.name
    };

    courses.push(course);
    res.send(course);
  
});




// Update Course

/*
    Look up the course
    If not existing, return 404

    Validate 
    If not valid, return 400 - bad request

    Update course 
    Return the updated course

*/
router.put('/api/courses/:id', (req, res) => {

    const couseID = parseInt(req.params.id)

    //returns the data of the course obj if exists
    const isFound = courses.find((course) => {
       return course.id === couseID;
    })

    if(isFound) {
   
        const {error, value} = validateCourse(req.body)

        if(error) {
            res.status(400).json({ error : error.details[0].message})
            return;
        }

        const body = req.body
        isFound.name = body.name  //JSON body = request body 
        res.status(200).json(isFound)

    }   else {
        res.status(400).json({error : "Course doesn't exists"})
    }

})




//Delete Course
router.delete('/api/courses/:id',(req, res) => {

    // Look up the course
    const courseID = parseInt(req.params.id)
    const isFound = courses.find((course) => {
        return course.id === courseID
    })
    
    // Not existing, return 404
    if(!isFound) {
        res.status(400).json({error : "Course doesn't exists"})
        return;
    }

    // Delete
    const index = courses.indexOf(isFound)
    console.log(index)
    courses.splice(index, 1)

    // Return the same course
    res.json({message : `${isFound.name} has been deleted`})
})



// Validate using Joi
function validateCourse(result) {
         const schema = Joi.object({
            name: Joi.string()
              .min(3)
              .max(30)
              .required()
          });
        
        return { error, value } = schema.validate(result);
}




module.exports = router;