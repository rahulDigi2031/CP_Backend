const { formatDate } = require("../middleware/formatDate");
const User = require("../Models/User");
const bcrypt = require("bcrypt");

const Signup = async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  try {
    // Validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ message: "Name is required." });
    }

    if (!email || email.trim().length === 0) {
      return res.status(400).json({ message: "Email is required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    if (!password || password.trim().length === 0) {
      return res.status(400).json({ message: "Password is required." });
    }

    if (!phone || phone.trim().length === 0) {
      return res.status(400).json({ message: "Phone is required." });
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Phone number must be 10 digits." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Create and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role: role === 'admin' ? 'admin' : 'user' ,// only allow 'admin' if explicitly passed,
      createdAt: formatDate(),
      updatedAt: formatDate(),
    });

    const savedUser = await user.save();

    res.status(201).json({ message: "User created successfully", user: savedUser });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// ****************ADMIN CONTROLLER FOR USER MANAGEMENT************************

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get user by ID (admin only)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user by ID (admin only)
const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { Signup , getAllUsers , deleteUserById , getUserById};
