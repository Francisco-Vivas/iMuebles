const ProductModel = require("../models/Product.model");
const User = require("../models/User");

/* carritoDeCompras 
$push = User/idUser/addcarrito/productid
res.redirect('/carrito') */
module.exports = {
  async showCart(req, res) {
    const user = await User.findById(req.user._id);
    console.log("Populate");
    console.log(user.populate("carritoDeCompras._id"));
    const productid = user.carritoDeCompras;
    console.log(user.populate("productId"));

    res.render("cart/", user);
  },

  async addItem(req, res) {
    const { productId, quantity } = req.body;
    const product = await ProductModel.findById(productId);
    if (!product || product.quantity < 1) {
      return res.render("products/detail", {
        errorMessage: "No hay unidades disponibles :(.",
      });
    }

    product.quantity -= quantity;
    await ProductModel.findByIdAndUpdate(productId, {
      quantity: product.quantity,
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: { carritoDeCompras: { productId, quantity } },
    });
    res.redirect("/cart");
  },
};
