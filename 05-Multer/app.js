const express = require("express");
const path = require("path");
var multer = require("multer");
const ejs = require("ejs");

// Set Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/uploads/");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// set Storage Engine
var upload = multer({
  storage: storage,
  limits: { filesize: 1000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
});

// Check fle type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpeg|png|gif/;

  //check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error : Images only");
  }
}

const app = express();

// post req
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// define views and public dir
const viewsDirectoryPath = path.join(__dirname, "./views");
const publicDirectoryPath = path.join(__dirname, "./public");

// set view and public dir
app.set("views", viewsDirectoryPath);
app.use(express.static(publicDirectoryPath));

// ejs engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/upload", upload.single("avatar"), (req, res) => {
  try {
    console.log(req.file);
    res.send("test");
  } catch (err) {
    res.render("index.ejs", {
      msg: err
    });
  }
});

const port = 5500;
app.listen(port, () => {
  console.log("Port is running in ", port);
});
