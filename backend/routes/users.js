const express = require('express');
const AuthRoute = express.Router();
const { getAllUsers, getUserById, deleteUserById , Signup } = require('../Controller/UserController');
const { isAdmin } = require('../middleware/Authorization');

// Admin-only routes
AuthRoute.get('/users', isAdmin, getAllUsers);
AuthRoute.get('/users/:id', isAdmin, getUserById);
AuthRoute.delete('/users/:id', isAdmin, deleteUserById);

/* GET users listing. */
AuthRoute.post('/signup' , Signup)

// Login Route

// AuthRoute.post('/login')

module.exports = AuthRoute;
