const express = require("express");
const router = express.Router();

const Person = require("./../models/person");
//For normally fetching all datas of any person
router.get("", async (req, res) => {
  try {
    const response = await Person.find();
    console.log("Data of all persond fetched successfully");
    res.status(200).json(response);
  } catch {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Create using POST method at the collection where persons data is stored
router.post("", async (req, res) => {
  try {
    const newPerson = new Person(req.body);

    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Read using GET method at the collection where persons data is stored
router.get("/:work", async (req, res) => {
  try {
    const worktype = req.params.work;
    if (
      worktype === "Chef" ||
      worktype === "Owner" ||
      worktype === "Waiter" ||
      worktype === "Customer"
    ) {
      const persons = await Person.find({ work: worktype });
      console.log("data fetched successfully");
      res.status(200).json(persons);
    } else {
      console.log("Worktype not available");
      res.status(404).json({ error: "Worktype is not available" });
    }
  } catch {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Update operation using PUT method
router.put("/:id", async (req, res) => {
  try {
    const update_id = req.params.id;
    const update = req.body;

    const response = await Person.findByIdAndUpdate(update_id, update, {
      new: true, // for giving the new updated data
      runValidators: true, //run mongoose validation
    });

    if (!response) {
      console.log("No data found with this id");
      res.status(404).json({ error: "No data found with this id" });
    } 
    else{console.log("data updated");
      res.status(200).json(response);}
    
  } catch {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE operation using delete method
router.delete("/:id", async (req, res) => {
  try {
    const delete_id = req.params.id;
    const response = await Person.findByIdAndDelete(delete_id);

    if (!response) {
      console.log("No data found with this id");
      res.status(404).json({ error: "No data found with this id" });
    } else {
      console.log("data deleted");
      res.status(200).json(response);
    }
  } catch {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
