const jwt = require("jsonwebtoken");
const cors = require("cors");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Users = require("../models/authentications");
const Orders = require("../models/orders");
const Adminorders = require("../models/adminorders");
const Adminauths = require("../models/adminauths");
const Bookingtables = require("../models/bookingtables");
const Queries = require("../models/queries");
const Ordertrash = require("../models/adminordertrashs");
const Adminbooking = require("../models/adminbookings");
const Bookingtrash = require("../models/bookingtrashs");
const Adminnotify = require("../models/adminnotifies");
const Dpersonsignup = require("../models/deliveryboyrsignups");
const Orderforall = require("../models/allfoodorders");
const Deliveryboydata = require("../models/deliveryboyorders");
const generateUniqueId = require("generate-unique-id");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const e = require("cors");
router.use(cors());

//**********Database Connection *****************/

mongoose
  .connect(
    "mongodb+srv://shivom:Shiv@123@cluster0.8r0og.mongodb.net/tutorial?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("database connected");
  })
  .catch(() => console.log(`not connected to database`));

//**************Order Placeing ***************/

router.post("/insertorder", function (req, res) {
  const {
    username,
    cust_name,
    cust_phone,
    address,
    order_details,
    total_price,
    status,
    payment,
  } = req.body;

  const bookingid = generateUniqueId({
    length: 8,
    useLetters: false,
  });

  if (
    !username ||
    !cust_name ||
    !cust_name ||
    !address ||
    !order_details ||
    !total_price ||
    !status ||
    !payment
  ) {
    return res.status(422).json({ error: "Plz fill all input fields" });
  }
  const num = cust_phone.toString().length;
  if (num < 10) {
    return res.status(428).json({ error: "number not match the format" });
  }

  Users.findOne({ name: username }).then((user) => {
    if (user) {
      const data = new Orders({
        _id: new mongoose.Types.ObjectId(),
        username: username,
        cust_name: cust_name,
        cust_phone: cust_phone,
        address: address,
        order_details: order_details,
        total_price: total_price,
        status: status,
        payment: payment,
        date: new Date(),
        orderno: bookingid,
        dpname: "",
        dpphone: 0,
      });
      data
        .save()
        .then((result) => {
          res.status(201).json(result);
        })
        .catch((error) => console.log(error));

      const datatwo = new Adminorders({
        _id: new mongoose.Types.ObjectId(),
        username: username,
        cust_name: cust_name,
        cust_phone: cust_phone,
        address: address,
        order_details: order_details,
        total_price: total_price,
        status: status,
        payment: payment,
        date: new Date(),
        orderno: bookingid,
        dpname: "",
        dpphone: 0,
        dpid: "",
      });
      datatwo.save();

      const datathree = new Orderforall({
        _id: new mongoose.Types.ObjectId(),
        username: username,
        cust_name: cust_name,
        cust_phone: cust_phone,
        address: address,
        order_details: order_details,
        total_price: total_price,
        status: status,
        payment: payment,
        date: new Date(),
        orderno: bookingid,
      });
      datathree.save();

      const notify = new Adminnotify({
        _id: new mongoose.Types.ObjectId(),
        notification: 1,
      });
      notify.save();
    } else {
      return res.status(423).json({ error: "Username not exists" });
    }
  });
});

//***************Profile Page Route**********************

router.post("/profile", async (req, res) => {
  const key = req.body.uniquekey;
  const userLogin = await Users.findOne({ uniquekey: key });
  if (userLogin) {
    res.json(userLogin);
  } else {
    res.status(400).json({ message: "user not logged in" });
  }
});

//*****************User Get Order Details Router ******************/

router.post("/userorders", async (req, res) => {
  const username = req.body.username;
  const userLogin = await Orders.find({ username: username });
  if (userLogin) {
    res.json(userLogin);
  } else {
    res.status(400).json({ message: "user not logged in" });
  }
});

/*********** User get bookings details route ********/
router.post("/userbookings", async (req, res) => {
  const username = req.body.username;
  const userLogin = await Bookingtables.find({ username: username });
  if (userLogin) {
    res.json(userLogin);
  } else {
    res.status(400).json({ message: "user not logged in" });
  }
});

//************Logout Route***********************

router.put("/logout", function (req, res) {
  Users.updateOne(
    { uniquekey: req.body.uniquekey },
    {
      $set: {
        uniquekey: " ",
      },
    }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => console.log(error));
});

/**********Table Booking  ****************************************/

router.post("/bookingtables", function (req, res) {
  const { username, email, name, phone, persons, ocassion, date } = req.body;
  const bookingid = generateUniqueId({
    length: 8,
    useLetters: false,
  });
  if (
    !username ||
    !name ||
    !email ||
    !phone ||
    !persons ||
    !ocassion ||
    !date
  ) {
    return res.status(422).json({ error: "Plz fill all input fields" });
  }
  const num = phone.toString().length;
  if (num < 10) {
    return res.status(428).json({ error: "number not match the format" });
  }
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(validRegex)) {
    console.log("Invalid Email");
    return res.status(451).json({ error: "Email not in proper format" });
  }

  Users.findOne({ name: username }).then((user) => {
    let order = 1001;
    if (user) {
      const data = new Bookingtables({
        _id: new mongoose.Types.ObjectId(),
        username: username,
        email: email,
        name: name,
        phone: phone,
        persons: persons,
        ocassion: ocassion,
        date: date,
        bookingid: bookingid,
        status: "Pending",
        bookingdate: new Date(),
      });
      data
        .save()
        .then((result) => {
          res.status(201).json(result);
        })
        .catch((error) => console.log(error));

      const datatwo = new Adminbooking({
        _id: new mongoose.Types.ObjectId(),
        username: username,
        email: email,
        name: name,
        phone: phone,
        persons: persons,
        ocassion: ocassion,
        date: date,
        bookingid: bookingid,
        status: "Pending",
        bookingdate: new Date(),
      });
      datatwo.save();

      const notify = new Adminnotify({
        _id: new mongoose.Types.ObjectId(),
        notification: 2,
      });
      notify.save();
    } else {
      return res.status(423).json({ error: "Username not exists" });
    }
  });
});

//******Deleting User Order data****/

router.post("/deleteuserorder", async (req, res) => {
  const key = req.body._id;

  Orders.deleteOne({ _id: key })
    .then(() => {
      res.status(500).json();
    })
    .catch((err) => {
      console.log(err);
    });
});

//******Deleting User Booking data****/

router.post("/deleteuserbooking", async (req, res) => {
  const key = req.body._id;

  Bookingtables.deleteOne({ _id: key })
    .then(() => {
      res.status(500).json();
    })
    .catch((err) => {
      console.log(err);
    });
});
/********************Contact us ***********************************/
router.post("/contacts", function (req, res) {
  const { name, email, subject, phone, message } = req.body;
  const id = generateUniqueId({
    length: 8,
    useLetters: false,
  });
  if (!name || !email || !phone || !subject || !message) {
    return res.status(422).json({ error: "Plz fill all input fields" });
  }
  const num = phone.toString().length;
  if (num < 10) {
    return res.status(428).json({ error: "number not match the format" });
  }
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(validRegex)) {
    console.log("Invalid Email");
    return res.status(451).json({ error: "Email not in proper format" });
  }
  const notify = new Adminnotify({
    _id: new mongoose.Types.ObjectId(),
    notification: 3,
  });
  notify.save();

  const data = new Queries({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    email: email,
    phone: phone,
    subject: subject,
    message: message,
    date: new Date(),
    queryid: id,
  });
  data
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => console.log(error));
});

//******************User Registration Route************************

router.post("/register", (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(422).json({ error: "Plz fill all input fields" });
  }
  const num = phone.toString().length;
  if (num < 10) {
    return res.status(428).json({ error: "number not match the format" });
  }
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(validRegex)) {
    console.log("Invalid Email");
    return res.status(451).json({ error: "Email not in proper format" });
  }
  Users.findOne({ name: name })
    .then((usernameExists) => {
      if (usernameExists) {
        return res.status(424).json({ error: "username already Exist" });
      }
      Users.findOne({ email: email })
        .then((userExist) => {
          if (userExist) {
            return res.status(423).json({ error: "Email already Exist" });
          }
          const user = new Users({
            _id: new mongoose.Types.ObjectId(),
            name: name,
            email: email,
            phone: phone,
            password: password,
            uniquekey: "",
          });
          user.save().then(() =>
            res
              .status(201)
              .json({ message: "User Register Successfully" })
              .catch((err) =>
                res.status(500).json({ error: "Failed To Register" })
              )
          );
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//*****************User Login Route***********************

router.post("/signin", async (req, res) => {
  try {
    // let token;
    const { email, password, uniquekey } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email or Password Can Not Blank" });
    }
    const userLogin = await Users.findOne({ email: email });

    if (userLogin) {
      const isMatch = userLogin.password == password;
      // token = await userLogin.generateAuthToken();
      // console.log(token);
      if (isMatch) {
        //NEW CODE
        Users.updateOne(
          { email: userLogin.email },
          {
            $set: {
              uniquekey: uniquekey,
              //email: req.body.email,
              // address: req.body.address,
            },
          }
        )
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((error) => console.log(error));
        //NEW CODE ENDS
        res.json({ message: "User Logged In Successfully" });
      } else {
        return res.status(401).json({ message: "Invalid Credentials" });
      }
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

//*****************Admin Login Route***********************

router.post("/adminlogin", async (req, res) => {
  try {
    const { email, password, uniquekey } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email or Password Can Not Blank" });
    }
    const userLogin = await Adminauths.findOne({ email: email });

    if (userLogin) {
      const isMatch = userLogin.password == password;

      if (isMatch) {
        //NEW CODE
        Adminauths.updateOne(
          { email: userLogin.email },
          {
            $set: {
              uniqueid: uniquekey,
            },
          }
        )
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((error) => console.log(error));
        //NEW CODE ENDS

        res.json({ message: "User Logged In Successfully" });
      } else {
        return res.status(401).json({ message: "Invalid Credentials" });
      }
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

/*********Admin Profile Data Route *********/
router.post("/adminprofile", async (req, res) => {
  const key = req.body.uniquekey;
  const userLogin = await Adminauths.findOne({ uniqueid: key });

  if (userLogin) {
    res.json(userLogin);
  } else {
    res.status(400).json({ message: "user not logged in" });
  }
});

/*************Admin Logout Route **********/
router.put("/adminlogout", function (req, res) {
  Adminauths.updateOne(
    { uniqueid: req.body.uniquekey },
    {
      $set: {
        uniqueid: " ",
      },
    }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => console.log(error));
});

/********** Admins Ordering Route */

router.get("/adminorder", function (req, res) {
  Adminorders.find().then((data) => res.status(200).json(data));
});

/*************Completed Orders  ******/
router.get("/trashdata", function (req, res) {
  Ordertrash.find().then((data) => res.status(200).json(data));
});
/*************Completed Bookings  ******/
router.get("/bookingtrashdata", function (req, res) {
  Bookingtrash.find().then((data) => res.status(200).json(data));
});
/********** Admins Query Route */

router.get("/userquery", function (req, res) {
  Queries.find().then((data) => res.status(200).json(data));
});

/***********Admin Bookings Route ********************/
router.get("/adminbookings", function (req, res) {
  Adminbooking.find().then((data) => res.status(200).json(data));
});

/***********Admin Notofications Route ********************/

router.get("/adminnotify", function (req, res) {
  Adminnotify.find().then((data) => res.status(200).json(data));
});

/******Admin Clear Notification Route ********************/
router.post("/deletenotofication", async (req, res) => {
  const key = req.body.value;

  Adminnotify.deleteMany({ notification: key })
    .then(() => {
      res.status(500).json();
    })
    .catch((err) => {
      console.log(err);
    });
});

/***********Admin Update Order Route  **************/
router.put("/updatestatus", function (req, res) {
  Orders.updateOne(
    { orderno: req.body.orderno },
    {
      $set: {
        status: req.body.status,
      },
    }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => console.log(error));

  Adminorders.updateOne(
    { orderno: req.body.orderno },
    {
      $set: {
        status: req.body.status,
      },
    }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => console.log(error));

  Deliveryboydata.updateOne(
    { orderno: req.body.orderno },
    {
      $set: {
        status: req.body.status,
      },
    }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => console.log(error));
});

//**********Admin Update Booking Status *********/

router.put("/updatebookingstatus", function (req, res) {
  Bookingtables.updateOne(
    { bookingid: req.body.bookingid },
    {
      $set: {
        status: req.body.status,
      },
    }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => console.log(error));

  Adminbooking.updateOne(
    { bookingid: req.body.bookingid },
    {
      $set: {
        status: req.body.status,
      },
    }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => console.log(error));
});

//******Adding order data to Admin order database ****/

router.post("/addtotrash", async (req, res) => {
  const key = req.body._id;
  const order = await Adminorders.findOne({ _id: key });

  if (order) {
    const data = new Ordertrash({
      _id: new mongoose.Types.ObjectId(),
      username: order.username,
      cust_name: order.cust_name,
      cust_phone: order.cust_phone,
      address: order.address,
      order_details: order.order_details,
      total_price: order.total_price,
      status: order.status,
      payment: order.payment,
      date: order.date,
      orderno: order.orderno,
    });
    data.save();
  } else {
    res.status(400).json();
  }
  Adminorders.deleteOne({ _id: key })
    .then(() => {
      res.status(500).json();
    })
    .catch((err) => {
      console.log(err);
    });
});

//******Deleting order data from Admin trash order database ****/

router.post("/deleteadminorder", async (req, res) => {
  const key = req.body._id;

  Ordertrash.deleteOne({ _id: key })
    .then(() => {
      res.status(500).json();
    })
    .catch((err) => {
      console.log(err);
    });
});

//******Adding booking data to Admin booking database ****/

router.post("/addbookingtotrash", async (req, res) => {
  const key = req.body._id;
  const booking = await Adminbooking.findOne({ _id: key });

  if (booking) {
    const data = new Bookingtrash({
      _id: new mongoose.Types.ObjectId(),
      username: booking.username,
      email: booking.email,
      name: booking.name,
      phone: booking.phone,
      persons: booking.persons,
      ocassion: booking.ocassion,
      date: booking.date,
      bookingid: booking.bookingid,
      status: booking.status,
      bookingdate: booking.bookingdate,
    });
    data.save();
  } else {
    res.status(400).json();
  }
  Adminbooking.deleteOne({ _id: key })
    .then(() => {
      res.status(500).json();
    })
    .catch((err) => {
      console.log(err);
    });
});

//******Deleting Booking data from Admin trash booking database ****/

router.post("/deleteadminbooking", async (req, res) => {
  const key = req.body._id;

  Bookingtrash.deleteOne({ _id: key })
    .then(() => {
      res.status(500).json();
    })
    .catch((err) => {
      console.log(err);
    });
});

//******Deleting Query data from Admin database ****/

router.post("/deletequery", async (req, res) => {
  const key = req.body._id;

  Queries.deleteOne({ _id: key })
    .then(() => {
      res.status(500).json();
    })
    .catch((err) => {
      console.log(err);
    });
});

//**************Register Delivery Person ***************/

router.post("/registerdboy", (req, res) => {
  console.log("Api called");
  const { name, email, phone, address, password } = req.body;

  const dpersonid = generateUniqueId({
    length: 4,
    useLetters: false,
  });

  if (!name || !email || !phone || !address || !password) {
    return res.status(422).json({ error: "Plz fill all input fields" });
  }

  const num = phone.toString().length;
  if (num < 10) {
    return res.status(428).json({ error: "number not match the format" });
  }

  Dpersonsignup.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(423).json({ error: "Email already Exist" });
      }
      const user = new Dpersonsignup({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        email: email,
        phone: phone,
        password: password,
        address: address,
        uniquekey: "",
        deliveryboyid: name + dpersonid,
      });
      user.save().then(() =>
        res
          .status(201)
          .json(user)
          .catch((err) => res.status(500).json({ error: "Failed To Register" }))
      );
    })
    .catch((err) => {
      console.log(err);
    });
});

//*****************Delivery Person Login Route***********************

router.post("/deliverypersonlogin", async (req, res) => {
  try {
    const { email, password, uniquekey } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email or Password Can Not Blank" });
    }
    const userLogin = await Dpersonsignup.findOne({ email: email });

    if (userLogin) {
      const isMatch = userLogin.password == password;

      if (isMatch) {
        //NEW CODE
        Dpersonsignup.updateOne(
          { email: userLogin.email },
          {
            $set: {
              uniquekey: uniquekey,
            },
          }
        )
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((error) => console.log(error));
        //NEW CODE ENDS

        res.json({ message: "User Logged In Successfully" });
      } else {
        return res.status(401).json({ message: "Invalid Credentials" });
      }
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

/*********Delivery Boy Home Data Route *********/
router.post("/deliveryboyhome", async (req, res) => {
  const key = req.body.uniquekey;
  const userLogin = await Dpersonsignup.findOne({ uniquekey: key });

  if (userLogin) {
    res.json(userLogin);
  } else {
    res.status(400).json({ message: "user not logged in" });
  }
});

/*************Delivery Person Logout Route **********/

router.put("/dpersonlogout", function (req, res) {
  Dpersonsignup.updateOne(
    { uniquekey: req.body.uniquekey },
    {
      $set: {
        uniquekey: " ",
      },
    }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => console.log(error));
});

/***********Delivery Boy All Order Route ********************/

router.get("/allorderdatadelivery", function (req, res) {
  Orderforall.find().then((data) => res.status(200).json(data));
});

router.get("/activeorderdatadelivery", function (req, res) {
  Deliveryboydata.find().then((data) => res.status(200).json(data));
});

//**************Add Delivery Person Order Data ***************/

router.post("/addtodeliveryboy", async (req, res) => {
  console.log("Delivery boy data ");
  const { orderno, name, email, phone, address, deliveryboyid } = req.body;
  const orderdata = await Orders.findOne({ orderno: orderno });

  const data = new Deliveryboydata({
    _id: new mongoose.Types.ObjectId(),
    username: orderdata.username,
    cust_name: orderdata.cust_name,
    cust_phone: orderdata.cust_phone,
    address: orderdata.address,
    order_details: orderdata.order_details,
    total_price: orderdata.total_price,
    status: orderdata.status,
    payment: orderdata.payment,
    date: orderdata.date,
    orderno: orderdata.orderno,
    d_email: email,
    d_phone: phone,
    d_name: name,
    d_address: address,
    deliveryboyid: deliveryboyid,
  });
  data.save();

  Orders.updateOne(
    { orderno: orderno },
    {
      $set: {
        dpname: name,
        dpphone: phone,
      },
    }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => console.log(error));

  Adminorders.updateOne(
    { orderno: orderno },
    {
      $set: {
        dpname: name,
        dpphone: phone,
        dpid: deliveryboyid,
      },
    }
  )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => console.log(error));

  Orderforall.deleteOne({ orderno: orderno })
    .then(() => {
      res.status(500).json();
    })
    .catch((err) => {
      console.log(err);
    });
});

/*****Export Auth ***************/

module.exports = router;
