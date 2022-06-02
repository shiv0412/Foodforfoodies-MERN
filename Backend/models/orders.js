const mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  cust_name: String,
  cust_phone: Number,
  address: String,
  order_details: String,
  total_price: String,
  status: String,
  payment: String,
  date: String,
  orderno: String,
  dpname: String,
  dpphone: Number,
});

module.exports = mongoose.model("orders", userSchema);
