const express = require("express");
const router = express.Router();

//controllers
const {
  compradorPage,
  vendedorPage,
  usuarioPage,
  profilePage,
} = require("../controllers/user");

/* Middlewares */
const { isAuth, isNotAuth, checkRoles } = require("../middlewares");

//roles//

router.get("/profile", isAuth, profilePage);

router.get(
  "/comprador",
  isAuth,
  checkRoles(["COMPRADOR", "ADMIN"]),
  compradorPage
);
router.get(
  "/vendedor",
  isAuth,
  checkRoles(["VENDEDOR", "ADMIN"]),
  vendedorPage
);
router.get("/usuario", usuarioPage);

module.exports = router;
