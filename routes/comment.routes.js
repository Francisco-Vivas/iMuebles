const router = require("express").Router();
const {
  createComment,
  listPosts,
} = require("../controllers/comment.controller");
const { isAuth, checkRoles } = require("../middlewares");

router.get("/", isAuth, checkRoles(["COMPRADOR", "ADMIN"]), listPosts);
router.post(
  "/create",
  isAuth,
  checkRoles(["COMPRADOR", "ADMIN"]),
  createComment
);

module.exports = router;
