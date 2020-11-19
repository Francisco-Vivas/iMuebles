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
router.post("/addItem", isAuth, addItem);
router.post("/deleteItem", isAuth, deleteItem);
router.post("/bought", isAuth, sendFactura, boughtCart);

module.exports = router;
