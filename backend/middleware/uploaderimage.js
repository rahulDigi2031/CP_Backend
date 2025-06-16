const multer = require('multer');

const storage = multer.memoryStorage(); // keeps file in memory

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const isValid = allowedTypes.test(file.mimetype);
    isValid ? cb(null, true) : cb(new Error('Only image files are allowed.'));
  },
});

module.exports = upload;
