const mongoose = require("mongoose");

//define the pesrson schema
const personschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["Chef", "Waiter", "Owner", "Customer"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
  }
});

//create person model
const Person= mongoose.model('Person',personschema);
module.exports= Person;
