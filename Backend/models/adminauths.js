const mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  password: String,
  uniqueid: String,
});

module.exports = mongoose.model("adminauths", userSchema);
