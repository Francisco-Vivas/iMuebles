const CommentModel = require("../models/Comment.model");

exports.listPosts = async (req, res) => {
  const comments = await CommentModel.find({ authorId: req.user._id }).populate(
    "productId"
  );
  console.log(comments);
  return res.render("comments/", { comments });
};

exports.createComment = async (req, res) => {
  const { content, idProduct } = req.body;

  if (!content) {
    return res.render(`products/${idProduct}`, {
      errorMessage: "Tu comentario no puede estar vacío.",
    });
  }

  await CommentModel.create({
    content,
    authorId: req.user._id,
    productId: idProduct,
  });

  return res.redirect(`/products/${idProduct}`);
};
