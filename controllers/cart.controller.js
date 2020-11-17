const ProductModel = require("../models/Product.model");
const User = require("../models/User");

/* carritoDeCompras 
$push = User/idUser/addcarrito/productid
res.redirect('/carrito') */
module.exports = {
  async showCart(req, res) {
    const user = await User.findById(req.user._id);
    console.log("Populate============================================= ");
    console.log(user.populate("carritoDeCompras.0.productId"));
    console.log(user.populate("productId"));

    res.render("cart/", user);
  },

  async addItem(req, res) {
    const { productId, quantity } = req.body;
    const product = await ProductModel.findById(productId);

    /* Check product quantity */
    if (!product || product.quantity < 1) {
      return res.render("products/detail", {
        errorMessage: "No hay unidades disponibles :(.",
      });
    }

    const user = await User.findById(req.user._id);
    /* Update quantity if it's already in the cart */
    let isInTheCart = false;
    if (user.carritoDeCompras) {
      user.carritoDeCompras.map((ele) => {
        if (String(ele.productId) === String(productId)) {
          ele.quantity += Number(quantity);
          isInTheCart = true;
        }
      });
    }

    /* Push to the cart if the value isn't there*/
    if (isInTheCart) {
      await User.findByIdAndUpdate(req.user._id, {
        carritoDeCompras: user.carritoDeCompras,
      });
    } else {
      await User.findByIdAndUpdate(req.user._id, {
        $push: { carritoDeCompras: { productId, quantity } },
      });
    }

    /* Update Product Values */
    product.quantity -= quantity;
    await ProductModel.findByIdAndUpdate(productId, {
      quantity: product.quantity,
    });

    res.redirect("/cart");
  },
};
