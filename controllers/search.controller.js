const ProductModel = require("../models/Product.model");
function diacriticSensitiveRegexV2(string = "") {
  return new RegExp(
    string
      .split(" ")
      .join("|")
      .replace(/a|á|à|ä/g, "[a,á,à,ä]")
      .replace(/e|é|ë/g, "[e,é,ë]")
      .replace(/i|í|ï/g, "[i,í,ï]")
      .replace(/o|ó|ö|ò/g, "[o,ó,ö,ò]")
      .replace(/u|ü|ú|ù/g, "[u,ü,ú,ù]")
  );
}

exports.searchBar = async (req, res) => {
  const { searchProductBasic } = req.query;

  let products = await ProductModel.find({
    name: {
      $regex: diacriticSensitiveRegexV2(searchProductBasic),
      $options: "i",
    },
  });
  products.map((ele) => {
    ele.formatedPrice = `$${(ele.price / 100).toFixed(2)} USD`;
    ele.image = ele.imagesURL[0];
  });
  res.render("search/", { products, searchString: searchProductBasic });
};

exports.advanceSearch = async (req, res) => {
  const {
    searchProductAdvance: names,
    category: section,
    minPrice: minP,
    maxPrice: maxP,
  } = req.query;

  const searchProductAdvance = names
    ? {
        $regex: diacriticSensitiveRegexV2(names),
        $options: "i",
      }
    : { $ne: false };
  const category = section ? section : { $ne: "" };
  const minPrice = minP ? parseInt(minP.split(".").join("")) : 1;
  const maxPrice = maxP
    ? parseInt(maxP.split(".").join(""))
    : 999999999999999999999999;

  let products = await ProductModel.find({
    $or: [
      {
        name: searchProductAdvance,
        category: category,
        price: {
          $gte: minPrice,
          $lte: maxPrice,
        },
      },
    ],
  });
  products.map((ele) => {
    ele.formatedPrice = `$${(ele.price / 100).toFixed(2)} USD`;
    ele.image = ele.imagesURL[0];
  });

  const nameSearch = names ? ` | Palabras Claves: ${names}` : "";
  const priceMinSearch = minP ? ` | Valor Mínimo: ${minP} ` : "";
  const priceMaxSearch = maxP ? `| Valor Máximo: ${maxP} ` : "";
  const categorySearch = section ? `\| Categoría: ${category} ` : "";

  const searchString =
    nameSearch + priceMinSearch + priceMaxSearch + categorySearch;

  res.render("search/", { products, searchString });
};
