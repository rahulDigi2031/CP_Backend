const express = require('express');
const Productroute = express.Router();

const {createProduct,getProductById,updateProduct, deleteProduct,getAllProducts} = require('../controllers/productController');

const { authorizePermissions } = require('../middleware/authorizePermissions');
const { authenticateUser } = require('../middleware/authenticateUser');


// ---------- Public Routes ----------
Productroute.get('/products/:id', getProductById);
Productroute.get('/products', getAllProducts);

// ---------- Protected Routes ----------
Productroute.post('/add', authenticateUser, authorizePermissions('admin'), createProduct);
Productroute.put('/products/:id', authenticateUser, authorizePermissions('admin'), updateProduct);
Productroute.delete('/products/:id', authenticateUser, authorizePermissions('admin'), deleteProduct);

module.exports = Productroute;
