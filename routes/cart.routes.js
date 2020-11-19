const {
  addItem,
  showCart,
  deleteItem,
  boughtCart,
} = require("../controllers/cart.controller");
const { isAuth, isNotAuth, checkRoles } = require("../middlewares");

const router = require("express").Router();

router.get("/", isAuth, showCart);
router.post("/addItem", checkRoles(["VENDEDOR", "ADMIN"]), isAuth, addItem);
router.post("/deleteItem", checkRoles(["VENDEDOR", "ADMIN"]), isAuth, deleteItem);
router.post("/bought", isAuth, boughtCart);

module.exports = router;
