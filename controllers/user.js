const express = require("express");
const { findByIdAndUpdate } = require("../models/User");
const router = express.Router();
const User = require('../models/User')

exports.profilePage = (req, res) => {
  res.render("profile", {user: req.user});
};

exports.compradorPage1 = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {role: 'COMPRADOR'})
  res.redirect("/user/comprador1");
};


exports.vendedorPage1 = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {role: 'VENDEDOR'}) 
  res.redirect("/user/vendedor1");
  
};

exports.compradorPage = (req, res) => {
  res.render("roles/comprador", {user: req.user});
};

exports.vendedorPage = (req, res) => {
  res.render("roles/vendedor", {user: req.user});
};



// exports.usuarioPage = (req, res, next) => {
//   if(req.user.role == 'USUARIO')
//   return 
//   res.redirect("/");
// };
