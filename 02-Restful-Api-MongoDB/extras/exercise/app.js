// getting-started.js
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercises", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to database successfully..."))
  .catch(() => console.log("Failed to connect to database..."));


  
const courseSchema = new mongoose.Schema({
  tags: Array,
  date: { type: Date, default: Date.now },
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model("Course", courseSchema);



async function getPublishedCourses() {
    const courses =  await Course.find({isPublished : true, tags : 'backend'})
    .select({name : true, author :true})
    .sort({name : 1});

    return courses;
}
getPublishedCourses();



async function getPublishedFrontEndandBackEndCourses() {
  const courses = await Course.find({isPublished : true, tags : { $in : ['frontend', 'backend']} })
                              .sort({price : -1})
                               .select({name : 1, author : 1, price :1});
        
    return courses;

}
getPublishedFrontEndandBackEndCourses();



async function coursesGreaterThanFifteen() {
  const courses =  await Course.find({ isPublished: true })
                                .or([
                                        { price: { $gte: 15 } }, 
                                        {name : /.*by.*/i}
                                     ])
                                .sort({price : -1})
                                 .select({name : 1, author :1 , price : 1})

    return courses
}

async function main() {
  const courses = await coursesGreaterThanFifteen();
  console.log(courses);
}
main();






async function updateCourse(id) {
    const course = await Course.findById(id)

    if(!course) return;

    course.set({
        isPublished : true,
        name : 'Another name'
    })

    const result = await course.save()
    console.log(result)
}

updateCourse('5a68fdf95db93f6477053ddd');






async function deleteCourse(id) {
    try {
        const result =  await Course.deleteOne({_id : id})
        console.log(result)
    }   catch(err) {
        console.log(err)
    }

}

deleteCourse('5a68fde3f09ad7646ddec17e')