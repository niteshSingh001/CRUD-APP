const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

router.post("/register", async (req, res) => {
  const { name, email, age, mobile, work, add, desc } = req.body;
  if (!name || !email || !age || !mobile || !work || !add || !desc) {
    res.status(422).json("plz fill the data");
  }
  try {
    const preuser = await users.findOne({ email: email });
    console.log(preuser);

    if (preuser) {
      res.status(422).json("This user is already present");
    } else {
      const adduser = new users({ name, email, age, mobile, work, add, desc });
      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }
  } catch (error) {
    res.status(422).json(error);
  }
});

router.get("/getdata", async (req, res) => {
  try {
    const userdata = await users.find();
    res.status(201).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(422).json(error);
    console.log("error");
  }
});

router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const userindividual = await users.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    res.status(422).json(error);
  }
});

//update user data

router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateduser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updateduser);
    res.status(201).json(updateduser);
  } catch (error) {
    res.status(422).json(error);
  }
});

// delete user data

router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteuser = await users.findByIdAndDelete({ _id: id });
    console.log(deleteuser);
    res.status(201).json(deleteuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
