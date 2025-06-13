const User = require('../Models/User');

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Auth check failed', error: error.message });
  }
};

module.exports = { isAdmin };
