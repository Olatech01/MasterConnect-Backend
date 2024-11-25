const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    }
});

const fileFilter = (req, file, cb) => {
    // Accept images only
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).fields([
    { name: 'passport', maxCount: 1 }, 
    { name: 'governmentID', maxCount: 1 },
    { name: 'collegeID', maxCount: 1 },
    { name: 'certificates', maxCount: 1 } 
]);

module.exports = upload;
