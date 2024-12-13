require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db");
const PersonRouter = require("./routers/personRouter.js");
const menuRouter = require("./routers/menuRouter.js");
const passport = require("./auth.js");
const bodyParser = require("body-parser");
const {
  generate_token,
  verify_normal_token,
  verify_owner_token,
} = require("./JwtAuth.js");
const Person = require("./models/person.js");
const req = require("express/lib/request.js");
app.use(bodyParser.json()); //req.body

//We are currenly using JWT authentication so passport-local authentication method is not used
app.use(passport.initialize());

const auth_middleaware = passport.authenticate("local", { session: false });
//Home page Router
app.get("/Home", function (req, res) {
  res.send("Hello , How are you ?");
});
//Sign-up Router
app.post("/signup", async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    const response = await newPerson.save();
    console.log("data saved");
    const payload = {
      Id: newPerson.id,
      Usename: newPerson.username,
    };
    const token = generate_token(payload);
    res.status(200).json({ response, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
//login router
app.post("/login", async (req, res) => {
  try {
    const User_credential = req.body;
    const Username = User_credential.username;
    const Password = User_credential.password;
    const User = await Person.findOne({ username: Username });
    if (!User) {
      console.log("No user exists with this username");
      res.status(401).json({ message: "No user exists with this username" });
    } else {
      const Password_match = await User.comparePassword(Password);
      if (Password_match) {
        const payload = {
          Id: User.id,
          Username: User.username,
        };
        const token = generate_token(payload);
        console.log("User has logged in sucessfully");
        res.status(200).json({ Token: token });
      } else {
        console.log("password not matched");
        res.status(401).json({ message: "password not matched" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
//Profile page Router
app.get("/profile", verify_normal_token, async (req, res) => {
  try {
    const User = req.user;
    console.log("User profile fetched successfully");
    res.status(200).json(User);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
//All person routers
app.use("/person", verify_owner_token, PersonRouter);
//All menu routers
app.use("/menu", verify_normal_token, menuRouter);

var PORT = process.env.Port || 3000;
app.listen(PORT, () => {
  console.log("listening on port 3000");
});
