exports.searchBar = (req, res) => {
  console.log("searchBar ===============================");
  const { product } = req.body;
  const searchWords = product.split(" ");
  console.log(searchWords, product);
  res.redirect("/products");
};
