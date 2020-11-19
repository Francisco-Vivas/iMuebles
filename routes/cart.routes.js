const {
  addItem,
  showCart,
  deleteItem,
  boughtCart,
} = require("../controllers/cart.controller");
const { sendFactura } = require("../controllers/nodemailerController");
const { isAuth, isNotAuth, checkRoles } = require("../middlewares");

const router = require("express").Router();

router.get("/", isAuth, showCart);

router.post("/addItem", isAuth, checkRoles(["COMPRADOR", "ADMIN"]), addItem);
router.post(
  "/deleteItem",
  isAuth,
  checkRoles(["COMPRADOR", "ADMIN"]),
  deleteItem
);
router.post(
  "/bought",
  isAuth,
  checkRoles(["COMPRADOR", "ADMIN"]),
  sendFactura,
  boughtCart
);

module.exports = router;
