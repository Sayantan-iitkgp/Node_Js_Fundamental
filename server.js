require('dotenv').config();
const express = require("express");
const app = express();
const db = require("./db");
const PersonRouter = require("./routers/personRouter.js");
const menuRouter = require("./routers/menuRouter.js");

//using body-parser for dirctly parsing and extracting data from incoming http request
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body

app.get("/", function (req, res) {
  res.send("Hello , How are you ?");
});

//All person routers
app.use("/person",PersonRouter);
//All menu routers
app.use("/menu",menuRouter);

var PORT= process.env.Port || 3000 ;
app.listen(PORT, () => {
  console.log("listening on port 3000");
});
