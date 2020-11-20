const ProductModel = require("../models/Product.model");
const mercadopago = require("../configs/mercadopago");
const CommentModel = require("../models/Comment.model");

exports.list = async (req, res) => {
  let products = await ProductModel.find();
  if (!products.length)
    return res.render("products/index", {
      errorMessage: "Wow.. such empty! Try to add something ;)",
    });
  products.map((ele) => {
    ele.formatedPrice = `$${(ele.price / 100).toFixed(2)} USD`;
    ele.image = ele.imagesURL[0];
  });

  return res.render("products/index", { products });
};

exports.showFormNew = (req, res) => {
  res.render("products/new");
};

exports.create = async (req, res) => {
  const { name, description, quantity, price, category } = req.body;
  console.log(price);
  let newProduct;
  if (req.file) {
    newProduct = {
      name,
      description,
      price: parseInt(price.split(".").join("")),
      quantity,
      category,
      ownerID: req.user._id,
      imagesURL: req.file.path,
    };
  } else {
    newProduct = {
      name,
      description,
      price: parseInt(price.split(".").join("")),
      quantity,
      category,
      ownerID: req.user._id,
    };
  }

  await ProductModel.create(newProduct);
  res.redirect("/products");
};

exports.showDetails = (req, res) => {
  const { productId } = req.params;

  ProductModel.findById({ _id: productId })
    .then((product) => {
      if (!product)
        return res.render("products/detail", {
          errorMessage: "This product does not exist.",
        });
      if (!req.user || String(product.ownerID) !== String(req.user._id)) {
        product.canEdit = false;
      } else {
        product.canEdit = true;
      }
      product.formatedPrice = `$${(product.price / 100).toFixed(2)} USD`;

      CommentModel.find({ productId: productId })
        .populate("authorId")
        .then((comments) => {
          console.log(comments);
          return res.render("products/detail", { ...product._doc, comments });
        });
    })
    .catch(() =>
      res.render("products/detail", {
        errorMessage: "This product does not exist.",
      })
    );
};

exports.editProductView = async (req, res) => {
  const { productId } = req.params;

  const product = await ProductModel.findById({ _id: productId });
  if (product) return res.render("products/edit", product);
  return res.render("products/edit", {
    errorMessage: "This product does not exist.",
  });
};

exports.editProduct = async (req, res) => {
  const { name, description, quantity, price, category } = req.body;
  const { productId } = req.params;

  const { imagesURL } = await ProductModel.findById(productId);
  let updateObj;
  // Si ingresa imagen nueva
  if (req.file) {
    let newImage = req.file.path;
    if (imagesURL[0].includes("https://aqt.cl/wp-content")) {
      updateObj = {
        name,
        description,
        price: parseInt(price.split(".").join("")),
        quantity,
        category,
        imagesURL: [newImage],
      };
    } else {
      updateObj = {
        name,
        description,
        price: parseInt(price.split(".").join("")),
        quantity,
        category,
        $push: { imagesURL: newImage },
      };
    }
  } else {
    updateObj = {
      name,
      description,
      price: parseInt(price.split(".").join("")),
      quantity,
      category,
    };
  }
  await ProductModel.findByIdAndUpdate(productId, updateObj, { new: true });

  res.redirect("/products");
};

exports.showMyProducts = async (req, res) => {
  let products = await ProductModel.find({ ownerID: req.user._id });
  if (!products)
    return res.render("products/myProducts", {
      errorMessage: "No tienes productos aún :(",
    });
  products.map((ele) => (ele.price = Number(ele.price / 100).toFixed(2)));
  return res.render("products/myProducts", { products });
};
