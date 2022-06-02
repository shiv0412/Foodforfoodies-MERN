const mongoose = require("mongoose");
let dataSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  category: String,
  subcategory: String,
  image: String,
});

module.exports = mongoose.model("products", dataSchema);
