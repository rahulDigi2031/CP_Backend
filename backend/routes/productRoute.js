const express = require('express');
const ProductRoute = express.Router();
const { authorizePermissions } = require('../middleware/authorizePermissions.js');
const { authenticateUser } = require('../middleware/authenticateUser.js');
const { addProduct, updateProduct, deleteProduct, getProductById, getAllProducts } = require('../Controller/ProductController.js');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) =>{
        const suffix = Date.now()
        cb(null, suffix + " " + file.originalname)
    }
});

const upload = multer({storage})


// ---------- Public Routes ----------
ProductRoute.get('/product/:id', getProductById);
ProductRoute.get('/products', getAllProducts);

// ---------- Protected Routes ----------
ProductRoute.post('/add', authenticateUser, authorizePermissions('admin') , upload.single('imageUrl') , addProduct);
ProductRoute.put('/products/:id', authenticateUser, authorizePermissions('admin'), updateProduct);
ProductRoute.delete('/products/:id', authenticateUser, authorizePermissions('admin'), deleteProduct);

module.exports = ProductRoute;
