//Database
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const imageModel = require("./models/products");
//
const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const cors = require("cors");
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://shivom:Shiv@123@cluster0.8r0og.mongodb.net/tutorial?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("database connected");
  });

// storage engine

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});
app.use("/profile", express.static("upload/images"));

//POST API TO ADD PRODUCT

app.post("/upload", upload.single("profile"), jsonParser, (req, res) => {
  const imgurl = `http://localhost:4000/profile/${req.file.filename}`;
  const data = new imageModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    subcategory: req.body.subcategory,
    image: imgurl,
  });
  data.save();
});

function errHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.json({
      success: 0,
      message: err.message,
    });
  }
}
app.use(errHandler);

// app.get("/getdata", function (req, res) {
//   res.json({
//     success: 1,
//     profile_url: `http://localhost:4000/profile/${filename}`,
//   });
// });
app.get("/getproduct", function (req, res) {
  imageModel.find().then((data) => res.status(200).json(data));
});

app.listen(4000, () => {
  console.log("server up and running");
});
