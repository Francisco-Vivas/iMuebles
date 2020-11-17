const express = require("express");
const router = express.Router();

exports.profilePage = (req, res) => {
  res.render("profile", req.user);
};
exports.compradorPage = (req, res) => {
  res.render("comprador");
};
exports.vendedorPage = (req, res) => {
  res.render("vendedor");
};
exports.usuarioPage = (req, res) => {
  res.render("usuario");
};
