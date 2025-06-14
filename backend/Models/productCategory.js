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
  createdAt: { type: String }, // formatted string
  updatedAt: { type: String }
});

module.exports = mongoose.model('Category', categorySchema);





