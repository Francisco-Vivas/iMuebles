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
    mercadoPagoId: {
      type: Number,
      default: 0,
    },
    buy_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Cart", cartSchema);
