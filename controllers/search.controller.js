const ProductModel = require("../models/Product.model");

exports.searchBar = async (req, res) => {
  console.log(
    "============================ searchBar ========================================="
  );
  const { product } = req.body;
  const searchWords = product.split(" ").join("|");

  const products = await ProductModel.find({
    $or: [
      {
        name: {
          $regex: searchWords,
          $options: "i",
        },
      },
      {
        category: {
          $regex: searchWords,
          $options: "i",
        },
      },
    ],
  });
  console.log("products", products);
  res.redirect("/products");
};
