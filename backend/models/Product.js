const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ["macrame", "resin", "clay", "candle", "tote"],
    },
    // emoji: { type: String, default: '🌸' },
    image: { type: String, default: "" },
    badge: { type: String, default: "" },
    inStock: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
