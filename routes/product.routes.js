const {
  list,
  showFormNew,
  create,
  showMyProducts,
  showDetails,
  editProductView,
  editProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { fileUploader } = require("../configs/cloudinary.configs");
const { isAuth, isNotAuth, checkRoles } = require("../middlewares");

const router = require("express").Router();

router.get("/", list);
router.get("/new", isAuth, checkRoles(["VENDEDOR", "ADMIN"]), showFormNew);
router.post(
  "/new",
  fileUploader.single("imagesURL"),
  isAuth,
  checkRoles(["VENDEDOR", "ADMIN"]),
  create
);

router.get(
  "/myProducts",
  isAuth,
  checkRoles(["VENDEDOR", "ADMIN"]),
  showMyProducts
);

router.get("/:productId", showDetails);

router.get(
  "/:productId/edit",
  isAuth,
  checkRoles(["VENDEDOR", "ADMIN"]),
  editProductView
);

router.get(
  "/:productId/delete",
  isAuth,
  checkRoles(["VENDEDOR", "ADMIN"]),
  deleteProduct
);

router.post(
  "/:productId/edit",
  fileUploader.single("imagesURL"),
  isAuth,
  checkRoles(["VENDEDOR", "ADMIN"]),
  editProduct
);

module.exports = router;
