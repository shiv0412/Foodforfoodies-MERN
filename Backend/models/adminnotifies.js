const mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  notification: Number,
});

module.exports = mongoose.model("adminnotifies", userSchema);
