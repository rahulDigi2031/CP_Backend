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

// const handleMulterError = (err, req, res, next) => {
//     if (err instanceof multer.MulterError) {
//         if (err.code === 'LIMIT_FILE_SIZE') {
//             return res.status(400).json({ message: 'File size too large. Maximum size is 5MB.' });
//         }
//         return res.status(400).json({ message: err.message });
//     }
//     next(err);
// };

// ---------- Public Routes ----------
ProductRoute.get('/product/:id', getProductById);
ProductRoute.get('/products', getAllProducts);

// ---------- Protected Routes ----------
ProductRoute.post('/add', 
    authenticateUser, 
    authorizePermissions('admin' , 'product_manager'),
    upload.single('image'),
    addProduct
);
ProductRoute.patch('/edit/:id', authenticateUser, authorizePermissions('admin' , 'product_manager'), updateProduct);
ProductRoute.delete('/delete/:id', authenticateUser, authorizePermissions('admin' , 'product_manager'), deleteProduct);

module.exports = ProductRoute;
