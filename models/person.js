const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
});
// Adding some salt in password and via using hasing (from bcrypt) making it much more stronger
personschema.pre('save', async function(next){
  const User = this;

  if (!User.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const finalpassword = await bcrypt.hash(User.password, salt);
    User.password = finalpassword;
    return next();
  } catch(err) {
    return next(err);
  }
});
//password checking
personschema.methods.comparePassword = async function (pwd) {
  try {
    // Use the document's password field
    const isMatch = await bcrypt.compare(pwd, this.password);
    return isMatch; // Return true if passwords match, false otherwise
  } catch (err) {
    // Handle errors properly
    throw err;
  }
};

//create person model
const Person = mongoose.model("Person", personschema);
module.exports = Person;
