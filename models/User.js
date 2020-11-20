const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["ADMIN", "VENDEDOR", "COMPRADOR"],
      default: "COMPRADOR",
    },
    location: String,
    facebookID: String,
    googleID: String,
    microsoftID: String,
    isComprador: {
      type: Boolean,
      default: true,
    },
    isVendedor: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
