const {
  addItem,
  showCart,
  deleteItem,
  boughtCart,
} = require("../controllers/cart.controller");
const { isAuth, isNotAuth, checkRoles } = require("../middlewares");

const router = require("express").Router();

router.get("/", isAuth, showCart);
router.post("/addItem", isAuth, addItem);
router.post("/deleteItem", isAuth, deleteItem);
router.get("/bought", isAuth, boughtCart);

module.exports = router;
