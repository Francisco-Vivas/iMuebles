const ProductModel = require("../models/Product.model");
const mercadopago = require("../configs/mercadopago");
const CommentModel = require("../models/Comment.model");
const { modelName } = require("../models/Product.model");
const itemsPerPage = 9;

exports.list = async (req, res) => {
  let { pageNum } = req.query;
  pageNum = Number(pageNum) ? parseInt(pageNum) : 1;

  let products = await ProductModel.find({
    quantity: {
      $gt: 0,
    },
  })
    .skip((pageNum - 1) * itemsPerPage)
    .limit(itemsPerPage);

  if (!products.length)
    return res.render("products/index", {
      errorMessage: "Wow.. such empty! Prueba añadiendo algo nuevo ;)",
    });
  products.map((ele) => {
    ele.formatedPrice = `$${(ele.price / 100).toFixed(2)} USD`;
    ele.image = ele.imagesURL[0];
  });

  const n = products.length < 9 ? null : pageNum + 1;
  const p = pageNum === 1 ? null : pageNum - 1;

  return res.render("products/index", { products, n, p });
};

exports.showFormNew = (req, res) => {
  res.render("products/new");
};

exports.create = async (req, res) => {
  const { name, description, quantity, price, category } = req.body;

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
      if (!product) {
        return res.render("products/detail", {
          errorMessage: "Este producto no existe.",
        });
      }

      let canEdit;
      if (!req.user || String(product.ownerID) !== String(req.user._id)) {
        canEdit = false;
      } else {
        canEdit = true;
      }
      const formatedPrice = `$${(product.price / 100).toFixed(2)} USD`;
      const image = product.imagesURL[0];
      const images = product.imagesURL.splice(1);
      const isVendedor = req.user ? req.user.isVendedor : false;
      const isComprador = req.user ? req.user.isComprador : true;

      CommentModel.find({ productId: productId })
        .populate("authorId")
        .then((comments) => {
          const editObject = {
            ...product._doc,
            comments,
            formatedPrice,
            image,
            images,
            canEdit,
            isVendedor,
            isComprador,
          };

          return res.render("products/detail", editObject);
        });
    })
    .catch(() =>
      res.render("products/detail", {
        errorMessage: "Este producto no existe.",
      })
    );
};

exports.editProductView = async (req, res) => {
  const { productId } = req.params;

  const product = await ProductModel.findById({ _id: productId });
  const image = product.imagesURL[0];
  const images = product.imagesURL.splice(1);
  if (product) {
    return res.render("products/edit", { ...product._doc, image, images });
  }

  return res.render("products/edit", {
    errorMessage: "Este producto no existe.",
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
  let modalDialog;
  if (req.user.productJustDeleted) {
    req.user.productJustDeleted = false;
    modalDialog = true;
  }

  let products = await ProductModel.find({ ownerID: req.user._id });
  if (!products)
    return res.render("products/myProducts", {
      errorMessage: "No tienes productos aún :(",
    });
  products.map((ele) => (ele.price = Number(ele.price / 100).toFixed(2)));

  return res.render("products/myProducts", { products, modalDialog });
};

exports.deleteProduct = async (req, res) => {
  const { productId } = req.params;
  await ProductModel.findByIdAndDelete(productId);
  req.user.productJustDeleted = true;
  res.redirect("/products/myProducts");
};
