const Product = require('../Models/product');
const { formatDate } = require('../middleware/formatDate');
const fs = require("fs");
const path = require("path");

const addProduct = async (req, res) => {
  const {productName, tradeNames, strength, packing,packInsertAvailable,therapeuticUse,productionCapacity,description,Price,category } = req.body;
  
  try {
   if (!productName || productName.trim().length === 0) {
      return res.status(400).json({ message: "Product name is required." });
    } 

    if (!Array.isArray(tradeNames)) {
     tradeNames = tradeNames ? [tradeNames] : [];
    }

    if (tradeNames.length === 0) {
      return res.status(400).json({ message: "At least one trade name is required." });
    }

    if (!strength || strength.trim().length === 0) {
      return res.status(400).json({ message: "Strength is required." });
    }

    if (!packing || packing.trim().length === 0) {
      return res.status(400).json({ message: "Packing information is required." });
    }

    if (!therapeuticUse || therapeuticUse.trim().length === 0) {
      return res.status(400).json({ message: "Therapeutic use is required." });
    }

    if (!productionCapacity || productionCapacity.trim().length === 0) {
      return res.status(400).json({ message: "Production capacity is required." });
    }

     if (!req.file) {
      return res.status(400).json({ message: "Product image is required." });
    }

    // Create imageUrl from the uploaded file
    const imageUrl = `/uploads/${req.file.filename}`;

    const product = new Product({
      productName,
      tradeNames,
      strength,
      packing,
      packInsertAvailable: packInsertAvailable ?? false,
      therapeuticUse,
      productionCapacity,
      imageUrl,
      description,
      Price,
      category,
      createdAt: formatDate(),
      updatedAt: formatDate(),
    });

    const savedProduct = await product.save();

    res.status(201).json({
      message: "Product added successfully.",
      product: savedProduct
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ************ get all products ************ //
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    // .populate('category');
    res.status(200).json({AllProducts:products});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ************ get product by id ************ //
const getProductById = async (req, res) => {
  try {
    const  id  = req.params.id;

    const product = await Product.findById(id)
    // .populate('category');

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
    const  id  = req.params.id;
    const updates = { ...req.body, updatedAt: formatDate()};

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
// const deleteProduct = async (req, res) => {
//   try {
//     const  id = req.params.id;

//     const deletedProduct = await Product.findByIdAndDelete(id);

//     if (!deletedProduct) {
//       return res.status(404).json({ message: 'Product not found.',});
//     }

//     res.status(200).json({message: 'Product deleted successfully.', DeletedProduct:deletedProduct,});

//        const productDetails = `[${new Date().toISOString()}] Deleted Products List:${JSON.stringify(deletedProduct, null, 2)}`;

//        const filepath = path.join(__dirname ," " , "logs" , "DeleteProductsData.txt");

//        fs.appendFileSync(filepath, productDetails, "utf8");
       

//   } catch (error){
//     res.status(500).json({message: error.message,});
//   }
// };

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({
      message: "Product deleted successfully.",
      DeletedProduct: deletedProduct,
    });

    // Format log entry
    const productDetails = `\n[${new Date().toISOString()}] Deleted Product:\n${JSON.stringify(
      deletedProduct,
      null,
      2
    )}\n`;

    // Correct filepath without unnecessary space
    const filePath = path.join(__dirname, "..", "logs", "DeleteProductsData.txt");

    // Ensure the "logs" folder exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Append product details to file
    fs.appendFileSync(filePath, productDetails, "utf8");

  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: error.message });
  }
};



module.exports = { addProduct , getAllProducts , updateProduct, deleteProduct , getProductById};
