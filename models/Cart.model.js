const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    productId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    quantity: [Number],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Cart", cartSchema);
