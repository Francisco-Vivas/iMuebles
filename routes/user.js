const express = require("express");
const router = express.Router();

//controllers
const {
  profilePage,
  rolAComprador,
  rolAVendedor,
  updateData,
} = require("../controllers/user");

/* Middlewares */
const { isAuth, isNotAuth, checkRoles } = require("../middlewares");

//roles//

router.get("/profile", isAuth, profilePage);
router.post("/profile", isAuth, updateData);

//patch sirve para cambiar o parchar

router.post("/checkcomprador", isAuth, rolAComprador);
router.post("/checkvendedor", isAuth, rolAVendedor);

module.exports = router;
