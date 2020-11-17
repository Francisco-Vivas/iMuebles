const { addItem, showCart } = require("../controllers/cart.controller");
const { isAuth, isNotAuth, checkRoles } = require("../middlewares");

const router = require("express").Router();

router.get("/", isAuth, showCart);
router.post("/addItem", isAuth, addItem);

module.exports = router;
