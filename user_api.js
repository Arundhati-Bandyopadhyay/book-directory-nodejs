const express = require("express");
const User = require("./models/User_models");
const app = require("./app");
const sendToken = require("./utils/cookies");

exports.registerUser = async (req, res) => {
  try {
    const name = req.body.name;
    const idno = req.body.idno;
    const email = req.body.email;
    const password = req.body.password;

    const n_user = await User.create({
      name,
      idno,
      email,
      password,
    });
    sendToken(n_user, 201, res);
  } catch (e) {
    console.log(e);
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({
        message: "please enter you email and password",
      });
    }
    const n_user = await User.findOne({ email });
    if (!n_user) {
      res.status(401).json({
        message: "invalid login details(1)",
      });
    }
    const ispasswordmatch = await n_user.comparePassword(password);

    if (!ispasswordmatch) {
      res.status(401).json({
        message: "invalid login details",
      });
    }

    sendToken(n_user, 201, res);
  } catch (e) {
    console.log(e.stack);
  }
};


//logout
exports.logoutuser = async (req, res, next) => {

  res.cookie("token", null, {

      expires: new Date(Date.now()),
      httpOnly: true,
  });

  res.status(200).json({

      success: true,
      message: "Logged out successfully"
  });
}