const express = require("express");
const router = express.Router();

//controllers
const {
  compradorPage,
  vendedorPage,
  usuarioPage,
  vendedorPage1,
  compradorPage1,
  profilePage,
} = require("../controllers/user");

/* Middlewares */
const { isAuth, isNotAuth, checkRoles } = require("../middlewares");

//roles//

router.get("/profile", isAuth, profilePage);

//patch sirve para cambiar o parchar

router.post(
  "/checkcomprador",
  isAuth,
  compradorPage1
);

router.get(
  "/comprador1",
  isAuth,
  compradorPage
);

router.post(
  "/checkvendedor",
  // isAuth,
  vendedorPage1
);

router.get(
  "/vendedor1",
  isAuth,
  vendedorPage
);

// router.get("/usuario", usuarioPage);

module.exports = router;
