const express = require('express');
const AuthRoute = express.Router();

const {getAllUsers, getUserById, deleteUserById, Signup, Login, ChangePassword, updateUserById, grantProductAccess} = require('../Controller/UserController.js');

const { authorizePermissions } = require('../middleware/authorizePermissions.js');
const { authenticateUser } = require('../middleware/authenticateUser.js');

// ---------- Public Routes ----------
AuthRoute.post('/signup', Signup);
AuthRoute.post('/login', Login);

// ---------- Protected Routes ----------
AuthRoute.put('/change-password', authenticateUser, ChangePassword);

// ---------- Admin-Only (Add Role Check if needed) ----------
AuthRoute.get('/users', authenticateUser,authorizePermissions('admin'), getAllUsers);
AuthRoute.get('/users/:id', authenticateUser,authorizePermissions('admin'), getUserById);
AuthRoute.delete('/delete/:id', authenticateUser,authorizePermissions('admin'), deleteUserById);
AuthRoute.patch('/edit/:id' , authenticateUser, updateUserById)


// ------------Admin gives access to another user for product add----------------
AuthRoute.post("/grant-access/:id",authenticateUser,authorizePermissions("admin"),grantProductAccess);

module.exports = AuthRoute;
