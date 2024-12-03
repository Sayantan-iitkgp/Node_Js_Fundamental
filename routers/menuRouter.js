const express=require('express');
const router= express.Router();

const menu=require('./../models/menu');
//GET method for menu of the hotel
router.get("", async (req, res) => {
    try {
      const hotel_menu = await menu.find();
      console.log("Hotel menu fetched");
      res.status(200).json(hotel_menu);
    } catch {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  //Post method on hotel menu
router.post("", async (req, res) => {
    try {
      const newmenu = new menu(req.body);
      const result = await newmenu.save();
      console.log("new menu item is saved");
      res.status(200).json(result);
      
    } catch {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  //exporting menu router
  module.exports=router;