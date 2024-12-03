const { floor } = require("lodash");
const mongoose = require("mongoose");

//define schema
const menuitemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique : true
  },
  Price: {
    type: Number,
    required: true,
  },
  available: {
    type: String,
    enum: ["yes", "no"],
    required: true,
  },
  rating: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5],
    default: 3
  },
  rated_people_number:{
    type:Number,
    required:true 
  }
});

//define the model using this schema
const menu= mongoose.model('menu',menuitemSchema);

//exporting the menu model
module.exports=menu;
