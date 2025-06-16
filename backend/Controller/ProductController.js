const Product = require('../Models/product');
const { formatDate } = require('../middleware/formatDate');
const fs = require('fs');
const path = require('path');

const addProduct = async (req, res) => {
  const {productName, tradeNames, strength, packing,packInsertAvailable,therapeuticUse,productionCapacity, imageUrl,description,category } = req.body;

  try {
    // if (!productName || productName.trim().length === 0) {
    //   return res.status(400).json({ message: "Product name is required." });
    // }

    if (!Array.isArray(tradeNames)) {
  tradeNames = tradeNames ? [tradeNames] : [];
}

// if (tradeNames.length === 0) {
//   return res.status(400).json({ message: "At least one trade name is required." });
// }

//     if (!strength || strength.trim().length === 0) {
//       return res.status(400).json({ message: "Strength is required." });
//     }

//     if (!packing || packing.trim().length === 0) {
//       return res.status(400).json({ message: "Packing information is required." });
//     }

//     if (!therapeuticUse || therapeuticUse.trim().length === 0) {
//       return res.status(400).json({ message: "Therapeutic use is required." });
//     }

//     if (!productionCapacity || productionCapacity.trim().length === 0) {
//       return res.status(400).json({ message: "Production capacity is required." });
//     }

//      if (!req.file) {
//       return res.status(400).json({ message: "Product image is required." });
//     }

//     const urlRegex = /^(http|https):\/\/[^ "]+$/;
//     if (!urlRegex.test(imageUrl)) {
//       return res.status(400).json({ message: "Invalid image URL format." });
//     }

//     if (!description || description.trim().length === 0) {
//       return res.status(400).json({ message: "Description is required." });
//     }

//     if (!category || category.trim().length === 0) {
//       return res.status(400).json({ message: "Category ID is required." });
//     }

    const uniqueName = Date.now() + '-' + req.file.originalname;
    const imagePath = path.join(__dirname, '..', 'uploads', uniqueName);
    fs.writeFileSync(imagePath, req.file.buffer);
    const imageUrl = `/uploads/${uniqueName}`;

    const product = new Product({ productName,tradeNames, strength, packing, packInsertAvailable: packInsertAvailable ?? false,therapeuticUse,productionCapacity,
      imageUrl,
      description,
      category,
      createdAt: formatDate(),
      updatedAt: formatDate(),
    });

    const savedProduct = await product.save();

    res.status(201).json({message: "Product added successfully.", product: savedProduct});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ************ get all products ************ //
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ************ get product by id ************ //
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate('category');

    if (!product) {
      return res.status(404).json({success: false, message: 'Product not found.'});
    }

    res.status(200).json({data: product,});

  } catch (error) {
     res.status(500).json({message: error.message,});
  }
};

// ************ update product ************ //
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body, updatedAt: formatDate() };

    const requiredFields = [
      'productName', 'tradeNames', 'strength', 'packing',
      'therapeuticUse', 'productionCapacity', 'imageUrl',
      'description', 'category'
    ];

    for (let field of requiredFields) {
      if (!updates[field]) {
        return res.status(400).json({message: `${field} is required.` });
      }
    }

    // Optional field fallback
    if (updates.packInsertAvailable === undefined) {
      updates.packInsertAvailable = false;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({message: "Product not found." });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      data: updatedProduct
    });

  } catch (error) {
    res.status(500).json({message: error.message });
  }
};

// *************** delete product *************** //
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found.',});
    }

    res.status(200).json({message: 'Product deleted successfully.',data: deletedProduct,});

  } catch (error) {res.status(500).json({message: error.message,});
  }
};


module.exports = { addProduct , getAllProducts , updateProduct, deleteProduct , getProductById};
