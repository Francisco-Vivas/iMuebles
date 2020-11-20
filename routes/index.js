const express = require("express");
const router = express.Router();
const { sendMensajito } = require("../controllers/nodemailerController");
const productModel = require("../models/Product.model");

/* GET home page */
router.get("/", async (req, res, next) => {
  let categoryViewSillas = await productModel
    .find({ category: ["Sillas"] })
    .limit(5);
  let categoryViewEsc = await productModel
    .find({ category: ["Escritorios"] })
    .limit(5);
  let categoryViewSof = await productModel
    .find({ category: ["Sofás"] })
    .limit(5);
  res.render("index", { categoryViewSillas, categoryViewEsc, categoryViewSof });
});

router.post("/send-email", sendMensajito);

module.exports = router;
