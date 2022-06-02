const mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  phone: Number,
  address: String,
  password: String,
  uniquekey: String,
  deliveryboyid: String,
});

module.exports = mongoose.model("dpersonsignups", userSchema);
