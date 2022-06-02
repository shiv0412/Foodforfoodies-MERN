const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
app.use(require("./router/auth"));

app.use(cors());
mongoose
  .connect(
    "mongodb+srv://shivom:Shiv@123@cluster0.8r0og.mongodb.net/tutorial?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("database connected");
  })
  .catch(() => console.log(`not connected to database`));

app.listen(5001);
