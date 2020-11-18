const mercadopago = require("mercadopago");
const CartModel = require("../models/Cart.model");
const ProductModel = require("../models/Product.model");
const User = require("../models/User");

module.exports = {
  async createNewCart() {
    const newCart = await CartModel.create({});
    return newCart._id;
  },

  async showCart(req, res) {
    const cart = await CartModel.findById(req.user.cartId).populate(
      "productId"
    );
    const cartItems = cart.productId.map((productId, indx) => {
      return {
        productId,
        quantity: cart.quantity[indx],
        subtotal: `$${
          cart.quantity[indx] * Number(productId.price / 100).toFixed(2)
        } USD`,
        indx,
      };
    });

    const preference = {
      items: cart.productId.map((ele, idx) => {
        return {
          title: ele.name,
          unit_price: ele.price ? Number(ele.price / 100) : 0,
          quantity: cart.quantity[idx],
          currency_id: "USD",
        };
      }),
    };

    const response = await mercadopago.preferences.create(preference);
    const preferenceId = response.body.id;
    // mercadopago.preferences
    //   .create(preference)
    //   .then(function (response) {
    //     global.id = response.body.id;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    res.render("cart/index", { cartItems, preferenceId });
  },

  async addItem(req, res) {
    const { productId: searchId, quantity } = req.body;
    const product = await ProductModel.findById(searchId);
    /* Check product quantity */
    if (!product || product.quantity < 1) {
      return res.render("products/detail", {
        errorMessage: "No hay unidades disponibles :(.",
      });
    }

    const cart = await CartModel.findById(req.user.cartId);

    const user = await User.findById(req.user._id);

    /* UPDATE CART VALUES ==========================*/
    let isInTheCart = cart.productId.indexOf(searchId) >= 0 ? true : false;
    if (isInTheCart) {
      const modifiedIndex = cart.productId.indexOf(searchId);

      cart.quantity[modifiedIndex] += Number(quantity);
      await CartModel.findByIdAndUpdate(req.user.cartId, {
        ...cart,
      });
    } else {
      await CartModel.findByIdAndUpdate(req.user.cartId, {
        $push: { productId: searchId, quantity },
      });
    }

    /* UPDATE PRODUCT QUANTITIES ===================*/
    product.quantity -= Number(quantity);
    await ProductModel.findByIdAndUpdate(searchId, product);

    res.redirect("/cart");
  },

  async deleteItem(req, res) {
    const { indx } = req.body;
    const cart = await CartModel.findById(req.user.cartId);

    cart.productId.splice(indx, 1);
    cart.quantity.splice(indx, 1);

    await CartModel.findByIdAndUpdate(req.user.cartId, {
      productId: cart.productId,
      quantity: cart.quantity,
    });
    res.redirect("/cart");
  },

  boughtCart(req, res) {
    res.render("cart/boughtCart");
  },
};
