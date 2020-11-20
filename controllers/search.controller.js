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
const itemsPerPage = 9;

exports.searchBar = async (req, res) => {
  const { searchProductBasic } = req.query;
  let { pageNum } = req.query;
  pageNum = Number(pageNum) ? parseInt(pageNum) : 1;

  let products = await ProductModel.find({
    $and: [
      {
        name: {
          $regex: diacriticSensitiveRegexV2(searchProductBasic),
          $options: "i",
        },
        quantity: {
          $gt: 0,
        },
      },
    ],
  })
    .skip((pageNum - 1) * itemsPerPage)
    .limit(itemsPerPage);

  products.map((ele) => {
    ele.formatedPrice = `$${(ele.price / 100).toFixed(2)} USD`;
    ele.image = ele.imagesURL[0];
  });

  const query = `?searchProductBasic=${searchProductBasic
    .split(" ")
    .join("+")}`;

  const n = products.length < 9 ? null : pageNum + 1;
  const p = pageNum === 1 ? null : pageNum - 1;

  res.render("search/", {
    products,
    n,
    p,
    query,
    searchString: searchProductBasic,
  });
};

exports.advanceSearch = async (req, res) => {
  const {
    searchProductAdvance: names,
    category: section,
    minPrice: minP,
    maxPrice: maxP,
  } = req.query;
  let { pageNum } = req.query;

  const query = `?searchProductAdvance=${names
    .split(" ")
    .join("+")}&minPrice=${minP}&maxPrice=${maxP}&category=${section
    .split(" ")
    .join("+")}`;

  pageNum = Number(pageNum) ? parseInt(pageNum) : 1;

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
        quantity: {
          $gt: 0,
        },
      },
    ],
  })
    .skip((pageNum - 1) * itemsPerPage)
    .limit(itemsPerPage);

  products.map((ele) => {
    ele.formatedPrice = `$${(ele.price / 100).toFixed(2)} USD`;
    ele.image = ele.imagesURL[0];
  });

  const n = products.length < 9 ? null : pageNum + 1;
  const p = pageNum === 1 ? null : pageNum - 1;

  const nameSearch = names ? ` | Palabras Claves: ${names}` : "";
  const priceMinSearch = minP ? ` | Valor Mínimo: ${minP} ` : "";
  const priceMaxSearch = maxP ? `| Valor Máximo: ${maxP} ` : "";
  const categorySearch = section ? `\| Categoría: ${category} ` : "";

  const searchString =
    nameSearch + priceMinSearch + priceMaxSearch + categorySearch;

  res.render("search/", { products, n, p, query, searchString });
};
