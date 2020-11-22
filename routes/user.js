const express = require("express");
const { profilePicture } = require("../configs/cloudinary.configs");
const router = express.Router();

//controllers
const {
  profilePage,
  rolAComprador,
  rolAVendedor,
  updateData,
} = require("../controllers/user");

/* Middlewares */
const { isAuth } = require("../middlewares");

//roles//

router.get("/profile", isAuth, profilePage);
router.post(
  "/profile",
  isAuth,
  profilePicture.single("pictureInputURL"),
  updateData
);

//patch sirve para cambiar o parchar

router.post("/checkcomprador", isAuth, rolAComprador);
router.post("/checkvendedor", isAuth, rolAVendedor);

module.exports = router;
