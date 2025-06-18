const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['Tablet', 'Capsule', 'Injection', 'Syrup', 'EarDrops' , 'EyeDrops' , 'cream' , 'soap'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: { type: String }, 
  updatedAt: { type: String }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category





