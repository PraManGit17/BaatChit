import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};


export const Usersignup = async (req, res) => {

  const { name, email, password, mobile } = req.body;

  try {
    const userexists = User.findOne({ $or: [{ email }, { mobile }] });

    if (userexists) {
      return res.status(400).json({
        message: "User Already Exists!! Go To Login"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword
    })

    res.status(201).json({
      message: "User Registered Sucessfully",
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const Userlogin = async (req, res) => {

  const { email, mobile, password } = req.body;

  try {

    const user = User.findOne({ $or: [{ email }, { mobile }] });

    if (!user) {
      return res.status(400).json({
        message: "User Not Found!! Go To SignUp"
      })
    }

    const cmppassword = await bcrypt.compare(password, user.password);

    if (!cmppassword) {
      return res.status(400).json({
        message: "Invalid Credentials"
      })
    }

    return res.status(200).json({
      message: "User Logged In Sucessfully",
      token: generateToken(user._id),
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
