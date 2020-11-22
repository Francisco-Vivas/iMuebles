const express = require("express");
const { findByIdAndUpdate } = require("../models/User");
const router = express.Router();
const User = require("../models/User");

function updateValue(value, defaultVal) {
  if (req.file) {
    pictureURL = req.file.path;
  } else {
    let defaultPic =
      "https://www.flaticon.com/svg/static/icons/svg/847/847969.svg";
    if (req.user.profilePage === defaultPic) {
      pictureURL = defaultPic;
    } else {
      pictureURL = req.user.pictureURL;
    }
  }
}

exports.profilePage = (req, res) => {
  res.render("profile", req.user);
};

exports.rolAComprador = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    role: "COMPRADOR",
    isComprador: true,
    isVendedor: false,
  });
  req.user.role = "COMPRADOR";
  req.user.isComprador = true;
  req.user.isVendedor = false;
  res.redirect("/");
};

exports.rolAVendedor = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    role: "VENDEDOR",
    isComprador: false,
    isVendedor: true,
  });
  req.user.role = "VENDEDOR";
  req.user.isComprador = false;
  req.user.isVendedor = true;
  res.redirect("/");
};

exports.updateData = async (req, res) => {
  const { username, email, userlastname } = req.body;

  let pictureURL;
  if (req.file) {
    pictureURL = req.file.path;
  } else {
    let defaultPic =
      "https://www.flaticon.com/svg/static/icons/svg/847/847969.svg";
    if (req.user.profilePage === defaultPic) {
      pictureURL = defaultPic;
    } else {
      pictureURL = req.user.pictureURL;
    }
  }

  await User.findByIdAndUpdate(req.user._id, {
    username,
    email,
    userlastname,
    pictureURL,
  });

  req.user.username = username;
  req.user.email = email;
  req.user.userlastname = userlastname;
  req.user.pictureURL = pictureURL;

  res.render("profile", {
    ...req.user._doc,
    message: "Tus datos se han actualizado satisfactoriamente.",
  });
};
