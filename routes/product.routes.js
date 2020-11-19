const {
  list,
  showFormNew,
  create,
  showMyProducts,
  showDetails,
  editProductView,
  editProduct,
} = require("../controllers/product.controller");
const fileUploader = require("../configs/cloudinary.configs");
const { isAuth, isNotAuth, checkRoles } = require("../middlewares");

const router = require("express").Router();

router.get("/", list);
router.get("/new", checkRoles(["VENDEDOR", "ADMIN"]), showFormNew);
router.post("/new", fileUploader.single("imagesURL"), create);
router.get("/myProducts", isAuth, showMyProducts);
router.get("/:productId", showDetails);
router.get("/:productId/edit", checkRoles(["VENDEDOR", "ADMIN"]), editProductView);
router.post("/:productId/edit", fileUploader.single("imagesURL"), editProduct);

module.exports = router;
