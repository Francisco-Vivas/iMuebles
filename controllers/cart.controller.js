const mercadopago = require("../configs/mercadopago");
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

    let totalPrice = 0;
    const cartItems = cart.productId.map((productId, indx) => {
      let subtotalValue =
        cart.quantity[indx] * Number(productId.price / 100).toFixed(2);
      totalPrice += subtotalValue;
      return {
        productId,
        quantity: cart.quantity[indx],
        subtotal: `$${(subtotalValue / 100).toFixed(2)} USD`,
        indx,
      };
    });

    if (!cartItems.length)
      return res.render("cart/index", {
        errorMessage: "Aún no tienes nada en tu carrito. Intenta añadir algo.",
      });

    const preference = {
      items: cart.productId.map((ele, idx) => {
        return {
          id: ele._id,
          title: ele.name,
          description: ele.description,
          unit_price: Number(ele.price / 100),
          quantity: cart.quantity[idx],
          currency_id: "USD",
        };
      }),
    };
    const response = await mercadopago.preferences.create(preference);
    const preferenceId = response.body.id;

    res.render("cart/index", {
      cartItems,
      preferenceId,
      totalPrice: `$${(totalPrice / 100).toFixed(2)} USD`,
    });
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
    const isInTheCart = cart.productId.indexOf(searchId) >= 0 ? true : false;
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
    console.log(indx);
    console.log(cart.productId);
    console.log(cart.productId[indx]);
    const product = await ProductModel.findById(cart.productId[indx]);

    product.quantity += Number(cart.quantity[indx]);
    product.save();

    cart.productId.splice(indx, 1);
    cart.quantity.splice(indx, 1);

    await CartModel.findByIdAndUpdate(req.user.cartId, {
      productId: cart.productId,
      quantity: cart.quantity,
    });
    res.redirect("/cart");
  },

  async boughtCart(req, res) {
    // Almacenar el Id de MercadoPago { data.id, fecha y userId }
    // TODO: Crear un nuevo carro y almacenar el nuevo valor del cartId en el usuario ( sesión y dB )
    console.log(
      "FINALIZANDO COMPRA ==============================================================="
    );
    // Save date in the cart
    const cart = await CartModel.findById(req.user.cartId);
    cart.buy_date = new Date();
    cart.markModified("date");
    await cart.save();

    // !Enviar aquí correo de confirmación de productos.

    // New user cart
    const { _id: newCartId } = await CartModel.create({});
    const user = await User.findById(req.user._id);
    user.cartId = newCartId;
    req.user.cartId = newCartId;
    await user.save();

    res.render("cart/boughtCart");
  },
};