const express = require('express');
const ProductRoute = express.Router();
const { authorizePermissions } = require('../middleware/authorizePermissions.js');
const { authenticateUser } = require('../middleware/authenticateUser.js');
const { addProduct, updateProduct, deleteProduct, getProductById, getAllProducts } = require('../Controller/ProductController.js');

const multer = require('multer');
const path = require('path');


// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Configure multer
const upload = multer({storage});

// ---------- Public Routes ----------

ProductRoute.get('/singleproduct/:id', getProductById);
ProductRoute.get('/getall', getAllProducts);

// ---------- Protected Routes ----------

ProductRoute.post("/add",authenticateUser,authorizePermissions("admin", "productManager"), addProduct);

ProductRoute.put("/update/:id",authenticateUser,authorizePermissions("admin", "productManager"),updateProduct);

ProductRoute.delete("/delete/:id",authenticateUser,authorizePermissions("admin", "productManager"),deleteProduct);

module.exports = ProductRoute;
