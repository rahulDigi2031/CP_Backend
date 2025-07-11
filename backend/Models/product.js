const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true, unique: true },
  tradeNames: { type: [String], required: true },
  strength: { type: String, required: true },
  packing: { type: String, required: true },
  packInsertAvailable: {type: Boolean, default: false, required: true},
  therapeuticUse: { type: String, required: true },
  productionCapacity: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  Price:{type:Number ,required: true},
  category: { type: String,required: true},
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product
