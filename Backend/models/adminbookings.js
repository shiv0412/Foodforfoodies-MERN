const mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  email: String,
  name: String,
  phone: Number,
  persons: Number,
  ocassion: String,
  date: String,
  bookingid: String,
  status: String,
  bookingdate: String,
});

module.exports = mongoose.model("adminbookings", userSchema);
