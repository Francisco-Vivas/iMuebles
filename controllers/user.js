const express = require("express");
const { findByIdAndUpdate } = require("../models/User");
const router = express.Router();
const User = require("../models/User");

exports.profilePage = (req, res) => {
  res.render("profile", { user: req.user });
};

exports.rolAComprador = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { role: "COMPRADOR" });
  req.user.role = "COMPRADOR";
  req.user.isComprador = true;
  res.redirect("/");
};

exports.rolAVendedor = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { role: "VENDEDOR" });
  req.user.role = "VENDEDOR";
  req.user.isComprador = false;
  res.redirect("/");
};

// exports.usuarioPage = (req, res, next) => {
//   if(req.user.role == 'USUARIO')
//   return
//   res.redirect("/");
// };
