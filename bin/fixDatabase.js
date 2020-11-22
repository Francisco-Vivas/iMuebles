const { createNewCart } = require("../controllers/cart.controller");
const User = require("../models/User");

module.exports = async (req, res) => {
  let users = await User.find({});

  for (let user of users) {
    user.userlastname = user.userlastname || user.username.split(" ")[1] || " ";
    user.cardId = user.cardId || (await createNewCart());
    user.pictureURL =
      user.pictureURL ||
      "https://www.flaticon.com/svg/static/icons/svg/847/847969.svg";
    user.isComprador = user.isComprador || true;
    user.isVendedor = user.isVendedor || false;

    await User.findByIdAndUpdate(user._id, user);
  }

  res.redirect("/");
};
