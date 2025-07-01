const authorizePermissions = (...allowedRoles) => {
  // console.log(allowedRoles[0]);
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: You do not have permission to perform this action. This operation is restricted to ${allowedRoles} only`,
      });
    }
    next();
  };
};

module.exports = {authorizePermissions};
