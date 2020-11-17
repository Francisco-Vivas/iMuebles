const productController = require("../controllers/product.controller");
const fileUploader = require("../configs/cloudinary.configs");

const router = require("express").Router();

router.get("/", productController.list);
router.get("/new", productController.showFormNew);
router.post("/new", fileUploader.single("imagesURL"), productController.create);
router.get("/:productId", productController.showDetails);
router.get("/:productId/edit", productController.editProductView);
router.post(
  "/:productId/edit",
  fileUploader.single("imagesURL"),
  productController.editProduct
);

module.exports = router;
