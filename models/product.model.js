const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    categorie: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    colors: { type: [String] },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    description: {
      type: String,
    },
    stock: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;
