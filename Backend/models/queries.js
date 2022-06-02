const mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  phone: Number,
  subject: String,
  message: String,
  date: String,
  queryid: String,
});

module.exports = mongoose.model("queries", userSchema);
