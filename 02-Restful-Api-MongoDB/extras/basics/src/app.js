const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [5, "Too few name"],
    max: 20
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    lowercase : true
  },
  author: String,
  tags: {
      type : Array,
      validate : {
          validator : function(v) { return v.length >0 && v},
          message : 'A course should have at least one tag'
      }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    min : 10,
    max : 200,
    required: function() {
      return this.isPublished;
    }
  }
});

// course class with the defined schema
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  // creating obj and constructor
  const course = new Course({
    name: "Mongo DB Course",
    category : 'WEB',
    author: "Aadarsha Acharya",
    tags: ['mongodb', 'database', 'nosql'],
    isPublished: true,
    price: 20
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
}

createCourse();
















async function getCourse() {
  await Course.find({ author: "Aadarshx" }, function(err, course) {
    if (err) return handleError(err);

    console.log(course);
  }).select({ name: true, author: true, isPublished: true });
}

// getCourse()
