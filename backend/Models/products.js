// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true ,unique:true},
//   description: { type: String },
//   price: { type: Number, required: true },
//   category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
//   brand: { type: String },
//   images:[{type:String}],
//   inStock: { type: Number, default: 0 },
//   ratings: { type: Number, default: 0 },
//   reviews: [{
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     comment: String,
//     rating: Number,
//     createdAt: { type: Date, default: Date.now }
//   }],
// }, { timestamps: true });

// module.exports = mongoose.model('Product', productSchema);
