const User = require("../models/UserModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  RegisterUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User Already exists, please try to login" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.log("Error registering the user", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  Login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: user._id }, process.env.SECRET);
      res.cookie("token", token);
      res.json({ token });
    } catch (error) {
      console.log("Error logging in", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
