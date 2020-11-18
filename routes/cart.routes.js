const {
  addItem,
  showCart,
  deleteItem,
} = require("../controllers/cart.controller");
const { isAuth, isNotAuth, checkRoles } = require("../middlewares");

const router = require("express").Router();

router.get("/", isAuth, showCart);
router.post("/addItem", isAuth, addItem);
router.post("/deleteItem", isAuth, deleteItem);

module.exports = router;
