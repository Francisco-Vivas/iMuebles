const router = require("express").Router();
const {
  createComment,
  listPosts,
} = require("../controllers/comment.controller");
const { isAuth } = require("../middlewares");

router.get("/", isAuth, listPosts);
router.post("/create", isAuth, createComment);

module.exports = router;
