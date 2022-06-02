const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  phone: Number,
  password: String,
  uniquekey: String,
  tokens: [
    {
      token: String,
    },
  ],
});
//Token generation

// userSchema.methods.generateAuthToken = async function () {
//   try {
//     let token = jwt.sign({ _id: this._id }, "MYNAMEISSHIVOMIAMDOINGMCA");
//     this.tokens = this.tokens.concat({ token: token });
//     await this.save();
//     return token;
//   } catch (err) {
//     console.log(err);
//   }
// };

module.exports = mongoose.model("authentications", userSchema);
