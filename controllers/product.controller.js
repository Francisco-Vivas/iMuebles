const { create } = require("../models/Product.model");
const ProductModel = require("../models/Product.model")

module.exports = {
  async list(req, res){
    const products = await ProductModel.find();
    console.log()
    if (!products.length) return res.render('products/index', { errorMessage: 'Wow.. such empty! Try to add something ;)' })
    return res.render('products/index', { products })
  },
  async create(req, res){
    const { name, description, quantity, price} = req.body
  },
}