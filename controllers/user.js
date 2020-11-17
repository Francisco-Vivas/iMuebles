
const express = require ('express')
const router = express.Router();

exports.privatePage = (req, res) => {
  res.render("private", req.user)
}
exports.compradorPage = (req, res) => {
  res.render("comprador")
}
exports.vendedorPage = (req, res) => {
  res.render("vendedor")
}
exports.usuarioPage = (req, res) => {
  res.render("usuario")
}