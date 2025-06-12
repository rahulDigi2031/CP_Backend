const Product = require('../models/Product'); // adjust path as necessary

const addProduct = async (req, res) => {
  try {
    const { name, description, category,image, price, brand, inStock } = req.body;
    // Validation (you can enhance this further)
    if (!name || !description || !category || !image || price == null || !brand || inStock == null) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Create a new product instance
    const product = new Product({ name, description,category, price, brand, inStock, });

    // Save to database
    const savedProduct = await product.save();

    // Success response
    res.status(201).json({success: true,data: savedProduct,});
  } catch (error) {
    // Error response
    res.status(500).json({success: false, message: error.message,});
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // product ID from URL
    const updates = req.body;  // fields to update

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required',
      });
    }

    // Find and update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true } // `new: true` returns the updated doc
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required',
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({ success: true, message: 'Product deleted successfully', data: deletedProduct,});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {addProduct , updateProduct , deleteProduct};
