const express = require("express");
const router = express.Router();
const { sendMensajito } = require("../controllers/nodemailerController");
const productModel = require("../models/Product.model");

/* GET home page */
router.get("/", async (req, res, next) => {
  let categoryViewSillas = await productModel.find({ category: ["Sillas"] });
  let categoryViewEsc = await productModel.find({ category: ["Escritorios"] });
  let categoryViewSof = await productModel.find({ category: ["Sofás"] });
  console.log(categoryViewSillas);
  res.render("index", { categoryViewSillas, categoryViewEsc, categoryViewSof });
});

router.post("/send-email", sendMensajito);

module.exports = router;
