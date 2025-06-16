const express = require('express');
const AuthRoute = express.Router();

const {getAllUsers, getUserById, deleteUserById, Signup, Login, ChangePassword} = require('../Controller/UserController.js');

const { authorizePermissions } = require('../middleware/authorizePermissions.js');
const { authenticateUser } = require('../middleware/authenticateUser.js');

// ---------- Publi Routes ----------
AuthRoute.post('/signup', Signup);
AuthRoute.post('/login', Login);

// ---------- Protected Routes ----------
AuthRoute.put('/change-password', authenticateUser, ChangePassword);

// ---------- Admin-Only (Add Role Check if needed) ----------
AuthRoute.get('/users', authenticateUser,authorizePermissions('admin'), getAllUsers);
AuthRoute.get('/users/:id', authenticateUser,authorizePermissions('admin'), getUserById);
AuthRoute.delete('/users/:id', authenticateUser,authorizePermissions('admin'), deleteUserById);

module.exports = AuthRoute;
