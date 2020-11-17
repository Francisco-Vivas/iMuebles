const { create } = require("../models/Product.model");
const ProductModel = require("../models/Product.model");

module.exports = {
  async list(req, res) {
    const products = await ProductModel.find();
    if (!products.length)
      return res.render("products/index", {
        errorMessage: "Wow.. such empty! Try to add something ;)",
      });
    return res.render("products/index", { products });
  },

  showFormNew(req, res) {
    res.render("products/new");
  },

  async create(req, res) {
    const { name, description, quantity, price } = req.body;
    let imagesURL = req.file.path;

    await ProductModel.create({
      name,
      description,
      price,
      quantity,
      ownerID: req.user._id,
      imagesURL,
    });
    res.redirect("/products");
  },

  showDetails(req, res) {
    const { productId } = req.params;

    ProductModel.findById({ _id: productId })
      .then((product) => {
        if (!product)
          return res.render("products/detail", {
            errorMessage: "This product does not exist.",
          });
        if (!req.user || String(product.ownerID) !== String(req.user._id)) {
          product._id = null; // Check if is the owner of the product so he can edit it.
        }
        product.formatedPrice = `$${(product.price / 1000).toFixed(2)} USD`;
        return res.render("products/detail", product);
      })
      .catch(() =>
        res.render("products/detail", {
          errorMessage: "This product does not exist.",
        })
      );
  },

  async editProductView(req, res) {
    const { productId } = req.params;

    const product = await ProductModel.findById({ _id: productId });
    if (product) return res.render("products/edit", product);
    return res.render("products/edit", {
      errorMessage: "This product does not exist.",
    });
  },
  async editProduct(req, res) {
    const { name, description, quantity, price, category } = req.body;
    const { productId } = req.params;

    const { imagesURL } = await ProductModel.findById(productId);
    let updateObj;
    // Si ingresa imágen nueva
    if (req.file) {
      let newImage = req.file.path;
      if (imagesURL[0].includes("https://aqt.cl/wp-content")) {
        updateObj = {
          name,
          description,
          price,
          quantity,
          category,
          imagesURL: [newImage],
        };
      } else {
        updateObj = {
          name,
          description,
          price,
          quantity,
          category,
          $push: { imagesURL: newImage },
        };
      }
    } else {
      updateObj = {
        name,
        description,
        price,
        quantity,
        category,
      };
    }
    await ProductModel.findByIdAndUpdate(productId, updateObj, { new: true });

    res.redirect("/products");
  },
};
